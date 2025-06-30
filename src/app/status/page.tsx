"use client";
import PageHeader from "@/components/page-header";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Clubs, Programs } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingSkeleton from "./components/loadingSkeleton";
import CustomLoader from "@/components/CustomLoader";

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
  const [fetchingData, setFetchingData] = useState<boolean>(true);

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
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const [clubsRes, programsRes] = await Promise.all([
          fetch("/api/clubs/get-clubs", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch("/api/programs/get", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!programsRes.ok || !clubsRes.ok) {
          console.log("Cannot fetch club and programs");
        }

        const [clubData, programData] = await Promise.all([
          clubsRes.json().then((data) => data.data),
          programsRes.json().then((data) => data.data),
        ]);

        setClubs(clubData);
        setPrograms(programData);
        setAllPrograms(programData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
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

      const result = await response.json();

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404 ||
        response.status === 500
      ) {
        throw new Error(result.error);
      }

      if (response.ok) {
        if (result.success) {
          toast({
            title: "Success",
            description: "Successfully updated program status",
            variant: "success",
          });

          form.reset();
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader pageTitle="Modify Program Status" />
      {fetchingData ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex justify-center">
          <div className="w-full px-4 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                                ? clubs.find((c) => c.clubId === clubId)
                                    ?.clubName
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
                  <Button disabled={isSubmitting}>
                    {isSubmitting ? (
                      <CustomLoader className="w-6 h-6 border-white" />
                    ) : (
                      "Update status"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
