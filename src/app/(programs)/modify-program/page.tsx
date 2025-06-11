"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, Upload, UploadCloud, X } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/hooks/use-toast";
import { Clubs, Programs } from "@/types/types";
import { useRouter } from "next/navigation";

interface FileWithPreview {
  file: File;
  preview: string;
}

// Schema for add program validation
const formSchema = z.object({
  clubId: z
    .number({ invalid_type_error: "Club id must be provided" })
    .min(1, "Club id must be provided"),
  programId: z.number().min(2, "Program name must be provided"),
  description: z.string().min(2, "Description is required"),
  startDate: z.string().optional(),
});

export default function ModifyProgram() {
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [allPrograms, setAllPrograms] = useState<Programs[]>([]);
  const [programs, setPrograms] = useState<Programs[]>([]);
  const [isModifying, setIsModifying] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<FileWithPreview | null>(
    null
  );
  const [uploadedVideo, setUploadedVideo] = useState<FileWithPreview | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(
    null
  );
  const [selectedProgramData, setSelectedProgramData] =
    useState<Programs | null>(null);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubId: 0,
      programId: 0,
      description: "",
      startDate: "",
    },
  });

  // Image dropzone
  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setUploadedImage({ file, preview });
    }
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  // Video dropzone
  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setUploadedVideo({ file, preview });
    }
  }, []);

  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDragActive,
  } = useDropzone({
    onDrop: onVideoDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    maxFiles: 1,
  });

  // File dropzone
  const onFileDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setUploadedFile({ file, preview });
    }
  }, []);

  const {
    getRootProps: getFileRootProps,
    getInputProps: getFileInputProps,
    isDragActive: isFileDragActive,
  } = useDropzone({
    onDrop: onFileDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
  });

  // Upload file to Supabase
  const uploadFileToSupabase = async (
    file: File,
    bucket: string
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsModifying(true);

    try {
      let imageUrl = "";
      let videoUrl = "";
      let fileUrl = "";

      // Upload image if present
      if (uploadedImage) {
        const url = await uploadFileToSupabase(
          uploadedImage.file,
          "program-images"
        );
        if (url) imageUrl = url;
      }

      // Upload video if present
      if (uploadedVideo) {
        const url = await uploadFileToSupabase(
          uploadedVideo.file,
          "program-videos"
        );
        if (url) videoUrl = url;
      }

      // Upload file if present
      if (uploadedFile) {
        const url = await uploadFileToSupabase(
          uploadedFile.file,
          "program-files"
        );
        if (url) fileUrl = url;
      }

      // Prepare form data with file URLs
      const finalData = {
        program_id: selectedProgramData?.programId,
        description: values.description,
        start_date: values.startDate,
        program_picture_url: imageUrl || selectedProgramData?.programImage,
        program_video_url: videoUrl || selectedProgramData?.programVideo,
        program_file_url: fileUrl || selectedProgramData?.programFile,
      };

      // Submit program data
      const response = await fetch("/api/programs/modify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Failed to modify program");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Program modified successfully!",
          variant: "success",
        });

        startTransition(() => {
          router.refresh();
          // Reset form and files
          form.reset();
          setUploadedImage(null);
          setUploadedVideo(null);
          setUploadedFile(null);
        });
      } else {
        throw new Error(result.message || "Failed to modify program");
      }
    } catch (error) {
      console.error("Error modifying program:", error);
      toast({
        title: "Error",
        description: "Failed to modify program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsModifying(false);
    }
  };

  // Remove uploaded files
  const removeImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview);
      setUploadedImage(null);
    }
  };

  const removeVideo = () => {
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo.preview);
      setUploadedVideo(null);
    }
  };

  const removeFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
      setUploadedFile(null);
    }
  };

  // Fetch clubs
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/clubs/get-clubs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const json = await response.json();
          if (json.success) {
            setClubs(json.data);
          }
        } else {
          console.error("Failed to fetch clubs");
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/programs/get");
        const json = await res.json();
        if (json.success) {
          setAllPrograms(json.programs);
          setPrograms(json.programs);
        }
      } catch (err) {
        console.error("Error fetching programs:", err);
      }
    };

    fetchClubs();
    fetchPrograms();
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage.preview);
      if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
      if (uploadedFile) URL.revokeObjectURL(uploadedFile.preview);
    };
  }, [uploadedImage, uploadedVideo, uploadedFile]);

  const clubId = form.watch("clubId");
  const programId = form.watch("programId");

  useEffect(() => {
    const filteredPrograms = allPrograms.filter((p) => p.clubId === clubId);
    form.setValue("programId", 0);
    setPrograms(filteredPrograms);
  }, [clubId, allPrograms]);

  useEffect(() => {
    const selected = programs.find(
      (program) => program.programId === programId
    );
    setSelectedProgramData(selected || null);

    if (selected) {
      form.setValue("description", selected.description || "");
      form.setValue("startDate", selected.startDate || "");
      // Add any other fields that need to be populated
    }
  }, [programId, programs, form]);

  const router = useRouter();

  return (
    <>
      <header className="flex items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="cursor-pointer">
            <ChevronLeft
              onClick={() => {
                router.back();
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Modify Program</h1>
        </div>
      </header>

      <div className="flex justify-center mb-5 px-4">
        <div className="w-full max-w-2xl space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="clubId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Club</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a club" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem
                            value={club.clubId!.toString()}
                            key={club.clubId}
                          >
                            {club.clubName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="programId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <Select
                      disabled={!clubId}
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {programs.map((p) => (
                          <SelectItem
                            key={p.programId}
                            value={p.programId!.toString()}
                          >
                            {p.programEnglishName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter program description"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Upload */}
                <div>
                  <span>Program Picture</span>
                  <div
                    className="min-h-[120px] flex items-center justify-center resize-none rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer relative"
                    {...getImageRootProps()}
                  >
                    <input {...getImageInputProps()} />

                    {uploadedImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={uploadedImage.preview || "/placeholder.svg"}
                          alt="Upload preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : selectedProgramData?.programImage ? (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <img
                          src={selectedProgramData.programImage}
                          alt="Current program image"
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud className="h-8 w-8 text-gray-400" />
                        <span className="text-muted-foreground text-sm mt-2">
                          {isImageDragActive
                            ? "Drop image here"
                            : "Drag image to upload"}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          JPG, PNG, GIF, WEBP
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span>Program Video</span>
                  <div
                    className="min-h-[120px] flex items-center justify-center resize-none rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer relative"
                    {...getVideoRootProps()}
                  >
                    <input {...getVideoInputProps()} />

                    {uploadedVideo ? (
                      <div className="relative w-full h-full">
                        <video
                          src={uploadedVideo.preview}
                          className="w-full h-full object-cover rounded-md"
                          controls
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVideo();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : selectedProgramData?.programVideo ? (
                      <a
                        href={selectedProgramData.programVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <UploadCloud className="h-6 w-6" />
                        <span>View Current Video</span>
                      </a>
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud className="h-8 w-8 text-gray-400" />
                        <span className="text-muted-foreground text-sm mt-2">
                          {isVideoDragActive
                            ? "Drop video here"
                            : "Drag video to upload"}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          MP4, MOV, AVI, WEBM
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <span>Program File</span>
                <div
                  className="min-h-[120px] flex items-center justify-center resize-none rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer relative"
                  {...getFileRootProps()}
                >
                  <input {...getFileInputProps()} />

                  {uploadedFile ? (
                    <div className="flex items-center space-x-2">
                      <UploadCloud className="h-6 w-6 text-blue-600" />
                      <span className="text-blue-600">
                        {uploadedFile.file.name}
                      </span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : selectedProgramData?.programFile ? (
                    <a
                      href={selectedProgramData.programFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <UploadCloud className="h-6 w-6" />
                      <span>View File</span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="h-8 w-8 text-gray-400" />
                      <span className="text-muted-foreground text-sm mt-2">
                        {isFileDragActive
                          ? "Drop file here"
                          : "Drag file to upload"}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PDF, CSV, XLS, XLSX
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isModifying}
                  className="min-w-[120px]"
                >
                  {isModifying ? "Modifying..." : "Modify Program"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
