"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Clubs, Programs } from "@/types/types";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  clubId: z.number({ invalid_type_error: "Club is required" }).min(1),
  programId: z.number({ invalid_type_error: "Program is required" }).min(1),
});

export default function DeleteProgram() {
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [allPrograms, setAllPrograms] = useState<Programs[]>([]);
  const [programs, setPrograms] = useState<Programs[]>([]);
  const [selectedProgramData, setSelectedProgramData] =
    useState<Programs | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubId: 0,
      programId: 0,
    },
  });

  const clubId = form.watch("clubId");
  const programId = form.watch("programId");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/programs/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create program");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Program deleted successfully!",
          variant: "success",
        });

        const updatedPrograms = programs.filter(
          (p) => p.programId !== values.programId
        );
        setPrograms(updatedPrograms);

        // Reset form
        form.reset({ clubId: 0, programId: 0 });
        setSelectedProgramData(null);
      }
    } catch (error: any) {
      console.error("Error deleting program:", error);
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/programs/get");
        const json = await res.json();
        if (json.success) {
          setAllPrograms(json.programs);
          setPrograms(json.programs);
        }
        console.log(json.programs);
      } catch (err) {
        console.error("Error fetching programs:", err);
      }
    };

    const fetchClubs = async () => {
      try {
        const res = await fetch("/api/clubs/get-clubs");
        const json = await res.json();
        if (json.success) setClubs(json.data);
      } catch (err) {
        console.error("Error fetching clubs:", err);
      }
    };

    fetchPrograms();
    fetchClubs();
  }, []);

  useEffect(() => {
    const filteredPrograms = allPrograms.filter((p) => p.clubId === clubId);
    form.setValue("programId", 0);
    setPrograms(filteredPrograms);
  }, [clubId, allPrograms]);

  useEffect(() => {
    const selected = programs.find((p) => p.programId === programId);
    setSelectedProgramData(selected || null);
  }, [programId, programs]);

  return (
    <>
      <header className="flex items-center py-6 px-4 sm:px-6 lg:px-8">
        <ChevronLeft
          className="cursor-pointer mr-4"
          onClick={() => {
            router.back();
          }}
        />
        <h1 className="text-2xl font-bold text-primary">Delete Program</h1>
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
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a club" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem
                            key={club.clubId}
                            value={club.clubId!.toString()}
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

              <div>
                <Label>Description</Label>
                <Textarea
                  disabled
                  value={selectedProgramData?.description || ""}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  disabled
                  value={selectedProgramData?.startDate || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Program Picture</Label>
                  <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed rounded">
                    {selectedProgramData?.programImage && (
                      <img
                        src={selectedProgramData.programImage}
                        alt="Program Image"
                        className="w-full h-full object-contain rounded-md"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label>Program Video</Label>
                  <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed rounded">
                    {selectedProgramData?.programVideo && (
                      <video
                        src={selectedProgramData.programVideo}
                        controls
                        className="w-full h-full object-contain rounded-md"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label>Program File</Label>
                <div className="min-h-[80px] flex items-center justify-center border-2 border-dashed rounded">
                  {selectedProgramData?.programFile && (
                    <a
                      href={selectedProgramData.programFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 underline"
                    >
                      <UploadCloud className="h-6 w-6" />
                      <span>View File</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="destructive"
                >
                  {isSubmitting ? "Deleting..." : "Delete Program"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
