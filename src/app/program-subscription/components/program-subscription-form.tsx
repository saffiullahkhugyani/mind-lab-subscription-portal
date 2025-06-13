"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import ProgramInfoPanel from "./program-info";
import { Separator } from "@/components/ui/separator";
import { Clubs, Programs } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { ProgramSubscriptionModel } from "@/types/custom-types";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { PriceConfirmation } from "./price-comparision";
import { useRouter } from "next/navigation";

interface ProgramSubscriptionFormProps {
  fetchedClubs: Clubs[] | null;
  fetchedPrograms: Programs[] | null;
  fetchedProgramSubscription: ProgramSubscriptionModel[] | null;
}

// Form Schema
const subscriptionFormSchema = z.object({
  clubId: z.number().min(1, "Club name is required"),
  programId: z.number().min(1, "Program name is required"),
  subscriptionType: z.enum(["normal", "promotion", "special price"]),
  plan1Month: z.coerce.number().min(1, "Price required"),
  plan3Month: z.coerce.number().min(1, "Price required"),
  plan12Month: z.coerce.number().min(1, "Price required"),
  effectiveFrom: z.date({ required_error: "Start date required" }),
  effectiveTo: z.date({ required_error: "End date required" }),
});

// type for form schema
type FormValues = z.infer<typeof subscriptionFormSchema>;

const ProgramSubscriptionForm = ({
  fetchedClubs,
  fetchedPrograms,
  fetchedProgramSubscription,
}: ProgramSubscriptionFormProps) => {
  // hooks
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [allPrograms, setAllPrograms] = useState<Programs[]>([]);
  const [programs, setPrograms] = useState<Programs[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [subscriptionPrograms, setSubscriptionPrograms] = useState<
    ProgramSubscriptionModel[]
  >([]);
  const [filteredSubscriptionPrograms, setFilteredSubscriptionPrograms] =
    useState<ProgramSubscriptionModel[]>([]);
  const [discountPercentages, setDiscountPercentages] = useState({
    plan1Month: 0,
    plan3Month: 0,
    plan12Month: 0,
  });
  const [normalPrices, setNormalPrices] = useState({
    plan1Month: 0,
    plan3Month: 0,
    plan12Month: 0,
  });
  const [newPrice, setNewPrice] = useState({
    plan1Month: 0,
    plan3Month: 0,
    plan12Month: 0,
  });

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      clubId: 0,
      programId: 0,
      subscriptionType: "normal",
      plan1Month: 0,
      plan3Month: 0,
      plan12Month: 0,
      effectiveFrom: undefined,
      effectiveTo: undefined,
    },
  });

  const handleSubmitWithConfirmation = (data: FormValues) => {
    const overlaps = subscriptionPrograms.some((item) => {
      const sameSubscription =
        item.clubId === data.clubId &&
        item.programId === data.programId &&
        item.subscriptionType === data.subscriptionType;

      if (!sameSubscription) return false;

      const itemStart = new Date(item.effectiveFrom!);
      const itemEnd = new Date(item.effectiveTo!);
      const newStart = new Date(data.effectiveFrom);
      const newEnd = new Date(data.effectiveTo);

      const dateOverlap = newStart <= itemEnd && newEnd >= itemStart;

      return dateOverlap;
    });

    if (overlaps) {
      toast({
        title: "Already exists",
        description: `${data.subscriptionType}  already exisits for the program `,
        variant: "warning",
      });
      return;
    }

    if (data.subscriptionType === "normal") {
      onSubmit(data);
    } else {
      setShowPriceComparison(true);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Add your logic here for handling price plans
    const finalData = {
      club_id: data.clubId,
      program_id: data.programId,
      subscription_type: data.subscriptionType,
      plan_1_month: data.plan1Month,
      plan_3_month: data.plan3Month,
      plan_12_month: data.plan12Month,
      effective_from: data.effectiveFrom.toLocaleDateString(),
      effective_to: data.effectiveTo.toLocaleDateString(),
    };

    try {
      const response = await fetch("/api/program-subscription/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Failed to add program subscription");
      } else {
        startTransition(() => {
          router.refresh();
        });
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Successfully added program subscription.",
          variant: "success",
        });

        form.reset();
      } else {
        throw new Error(result.error || "Failed to add program subscription");
      }
    } catch (error) {
      // console.error("Error adding program subscription:", error);
      toast({
        title: "Error",
        description: "Failed to add program subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onModify = async (data: FormValues) => {
    setIsModifying(true);

    const filetedProgram = subscriptionPrograms.find(
      (item) =>
        item.clubId === data.clubId &&
        item.programId === data.programId &&
        item.subscriptionType === data.subscriptionType
    );

    const finalData = {
      id: filetedProgram?.subcriptionId,
      club_id: data.clubId,
      program_id: data.programId,
      subscription_type: data.subscriptionType,
      plan_1_month: data.plan1Month,
      plan_3_month: data.plan3Month,
      plan_12_month: data.plan12Month,
      effective_from: data.effectiveFrom,
      effective_to: data.effectiveTo,
    };

    try {
      const response = await fetch("/api/program-subscription/modify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Failed to modify program, try again later");
      } else {
        startTransition(() => {
          console.log("here");
          router.refresh();
        });
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Program Modify",
          description: "Successfully modified the program subscription",
          variant: "success",
        });
        form.reset();
      } else {
        throw new Error(
          result.error || "Failed to modify program subscription"
        );
      }
    } catch (err) {
      // console.error("Error adding program subscription:", error);
      toast({
        title: "Error",
        description: "Failed modify program subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsModifying(false);
    }
  };

  // watching form fields for changes
  const clubId = form.watch("clubId");
  const programId = form.watch("programId");
  const subscriptionType = form.watch("subscriptionType");
  const plan1Month = form.watch("plan1Month");
  const plan3Month = form.watch("plan3Month");
  const plan12Month = form.watch("plan12Month");

  useEffect(() => {
    setClubs(fetchedClubs!);
    setPrograms(fetchedPrograms!);
    setAllPrograms(fetchedPrograms!);
    setSubscriptionPrograms(fetchedProgramSubscription!);

    // // Fetching clubs
    // const fetchClubs = async () => {
    //   try {
    //     const res = await fetch("/api/clubs/get-clubs");
    //     const json = await res.json();
    //     if (json.success) setClubs(json.result.data);
    //   } catch (err) {
    //     console.error("Error fetching clubs:", err);
    //   }
    // };
    // // Fetching programs
    // const fetchPrograms = async () => {
    //   try {
    //     const res = await fetch("/api/programs/get");
    //     const json = await res.json();
    //     if (json.success) {
    //       setAllPrograms(json.programs);
    //       setPrograms(json.programs);
    //     }
    //     console.log(json.programs);
    //   } catch (err) {
    //     console.error("Error fetching programs:", err);
    //   }
    // };
    // //fetching subscription data
    // const fetchSubscriptionData = async () => {
    //   try {
    //     const res = await fetch("/api/program-subscription/get");
    //     const json = await res.json();
    //     console.log(json);
    //     if (json.success) {
    //       setSubscriptionPrograms(json.data);
    //     }
    //   } catch (error) {}
    // };
    // fetchSubscriptionData();
    // fetchClubs();
    // fetchPrograms();
  }, [fetchedClubs, fetchedPrograms, fetchedProgramSubscription]);

  // hook for setting the programs after selection of club
  useEffect(() => {
    setPrograms(allPrograms.filter((program) => program.clubId === clubId));
  }, [clubId]);

  // hook for setting the selection of the program subscription
  useEffect(() => {
    // Find normal subscription prices for comparison
    const findNormalPrices = () => {
      if (clubId && programId) {
        const filteredSubPrograms = subscriptionPrograms.filter(
          (item) => item.clubId === clubId && item.programId === programId
        );

        setFilteredSubscriptionPrograms(filteredSubPrograms);

        const normalSubscription = subscriptionPrograms.find(
          (sub) =>
            sub.clubId === clubId &&
            sub.programId === programId &&
            sub.subscriptionType === "normal"
        );

        if (normalSubscription) {
          setNormalPrices({
            plan1Month: normalSubscription.planOneMonth!,
            plan3Month: normalSubscription.planThreeMonth!,
            plan12Month: normalSubscription.planTweleveMonth!,
          });
        }
      }
    };

    findNormalPrices();
  }, [clubId, programId, subscriptionType, subscriptionPrograms]);

  useEffect(() => {
    if (
      subscriptionType === "special price" ||
      subscriptionType === "promotion"
    ) {
      const calculateDiscount = (newPrice: number, normalPrice: number) => {
        if (!newPrice || normalPrice === 0) return 0;
        const newPriceNum = newPrice;
        return Math.round(((normalPrice - newPriceNum) / normalPrice) * 100);
      };

      setDiscountPercentages({
        plan1Month: calculateDiscount(plan1Month, normalPrices.plan1Month),
        plan3Month: calculateDiscount(plan3Month, normalPrices.plan3Month),
        plan12Month: calculateDiscount(plan12Month, normalPrices.plan12Month),
      });

      setNewPrice({
        plan1Month: plan1Month,
        plan3Month: plan3Month,
        plan12Month: plan12Month,
      });
    } else {
      setDiscountPercentages({
        plan1Month: 0,
        plan3Month: 0,
        plan12Month: 0,
      });
    }
  }, [subscriptionType, plan1Month, plan3Month, plan12Month, normalPrices]);

  return (
    <>
      {/* Header Section*/}
      <header className="flex items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="cursor-pointer">
            <ChevronLeft
              onClick={() => {
                // router.back();
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Add/Modify Program Subscription
          </h1>
        </div>
      </header>

      {/*Main content section*/}
      <div className="flex justify-center mb-5 px-4">
        {/*Form section*/}
        <div className="w-full max-w-2xl space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitWithConfirmation)}
              className="gap-6 space-y-2 p-4"
            >
              <FormField
                control={form.control}
                name="clubId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Club Name</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a club">
                            {field.value
                              ? clubs.find((c) => c.clubId === clubId)?.clubName
                              : "Please select a club"}
                          </SelectValue>
                        </SelectTrigger>
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
                    </FormControl>
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
                name="subscriptionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="normal, promotion, special price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="special deal">
                            Special Deal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="lg:col-span-2 grid lg:grid-cols-3 md:grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="plan1Month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1 Month</FormLabel>
                      <FormControl>
                        <Input placeholder="Price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plan3Month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3 Month</FormLabel>
                      <FormControl>
                        <Input placeholder="Price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plan12Month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>12 Month</FormLabel>
                      <FormControl>
                        <Input placeholder="Price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 md:gap-2 sm:gap-2 items-center place-items-center">
                <FormField
                  control={form.control}
                  name="effectiveFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective From</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "dd/MM/yyyy")
                                : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="font-semibold">TO</span>
                <FormField
                  control={form.control}
                  name="effectiveTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective To</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "dd/MM/yyyy")
                                : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center gap-4 mt-4 p-4">
                <Button type="submit" disabled={isSubmitting || isPending}>
                  {isSubmitting ? "Adding Subscription..." : "Add Subscription"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isModifying || isPending}
                  onClick={form.handleSubmit(onModify)}
                >
                  {isModifying
                    ? "Modifying Subscription..."
                    : "Modify Subscription"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <Separator orientation="vertical" />
        </div>
        {/* program info section*/}
        <div className="w-full max-w-2xl space-y-4 p-4 ">
          {clubId && programId ? (
            <ProgramInfoPanel
              programSubscriptionList={filteredSubscriptionPrograms}
            />
          ) : (
            <div className="flex h-full justify-center">
              <span className="text-lg font-bold">
                Please select a program to display information
              </span>
            </div>
          )}
        </div>
      </div>
      <ResponsiveDialog
        isOpen={showPriceComparison}
        setIsOpen={setShowPriceComparison}
        title="Price Comparison"
      >
        <PriceConfirmation
          setIsOpen={setShowPriceComparison}
          programName={
            subscriptionPrograms.find(
              (p) => p.clubId === clubId && p.programId === programId
            )?.programName!
          }
          status={
            subscriptionPrograms.find(
              (p) => p.clubId === clubId && p.programId === programId
            )?.programStatus!
          }
          normalPrices={normalPrices}
          discountPercentages={discountPercentages}
          newPrices={newPrice}
          onApprove={form.handleSubmit(onSubmit)}
        />
      </ResponsiveDialog>
    </>
  );
};

export default ProgramSubscriptionForm;
