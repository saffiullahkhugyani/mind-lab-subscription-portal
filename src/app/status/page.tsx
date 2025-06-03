"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clubs, Programs } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  clubId: z.number(),
  programId: z.number(),
  programStatus: z.string(),
});

const programStatus = ["Activate", "Deactivate"];

export default function Status() {
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [allPrograms, setAllPrograms] = useState<Programs[]>([]);
  const [programs, setPrograms] = useState<Programs[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubId: 0,
      programId: 0,
      programStatus: "",
    },
  });

  const clubId = form.watch("clubId");
  const programId = form.watch("programId");

  useEffect(() => {
    // Fetching clubs
    const fetchClubs = async () => {
      try {
        const res = await fetch("/api/clubs/get-clubs");
        const json = await res.json();
        if (json.success) setClubs(json.result.data);
      } catch (err) {
        console.error("Error fetching clubs:", err);
      }
    };

    // Fetching programs
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

    fetchClubs();
    fetchPrograms();
  }, []);

  useEffect(() => {
    setPrograms(allPrograms.filter((program) => program.clubId === clubId));
  }, [clubId]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/status/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update program status");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Successfully update program status. Please try again.",
          variant: "success",
        });

        form.reset();
      } else {
        throw new Error(result.message || "Failed to update program status");
      }
    } catch (error) {
      console.error("Error updating program status:", error);
      toast({
        title: "Error",
        description: "Failed to update program status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="flex items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="cursor-pointer">
            <ChevronLeft />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Modify Program Status{" "}
          </h1>
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
                          <SelectValue placeholder="Select a club">
                            {" "}
                            {field.value
                              ? clubs.find((c) => c.clubId === clubId)?.clubName
                              : "Please select a club"}
                          </SelectValue>
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
                          <SelectValue placeholder="Select a program">
                            {field.value
                              ? programs.find((p) => p.clubId === clubId)
                                  ?.programEnglishName
                              : "Please select a program"}
                          </SelectValue>
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
                name="programStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={!clubId}
                      onValueChange={(val) => field.onChange(val)}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {programStatus.map((p, index) => (
                          <SelectItem key={index + 1} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center pt-4">
                <Button>
                  {isSubmitting ? "Updating..." : "Update status"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
