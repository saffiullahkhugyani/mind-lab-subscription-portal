"use client";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import ClickableCard from "./components/clickable-card";
import { Edit, Plus, Send, Trash2 } from "lucide-react";
import { SpecialDealDataTable } from "./components/special-deal-data-table";
import { SpecialDealColumns } from "./components/special-deal-columns";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const specialDealEmailData = [
  {
    userId: "11",
    email: "Email@gmail.com",
    currentPlan: "1 month",
    template: "template 1",
    sendDate: "03/08/2025",
    status: "Send",
  },
  {
    userId: "11",
    email: "Email@gmail.com",
    currentPlan: "template 2",
    template: "Reason 1",
    sendDate: "03/08/2025",
    status: "Send",
  },
];

// 1. Define Zod schema
const FormSchema = z.object({
  template: z.string().min(1, "Template is required"),
  user: z.string().min(1, "User is required"),
  program: z.string().min(1, "Program is required"),
});

// 2. Infer form type
type FormValues = z.infer<typeof FormSchema>;

export default function SpecialDealPage() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const { reset, handleSubmit, register } = form;

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <PageHeader pageTitle="Special Deal" />
      <div className="flex-1 p-6 overflow-auto">
        {/* send email Cards */}
        <div className="flex gap-6 mb-8">
          <ClickableCard
            title="Send Special Deal"
            icon={Send}
            onClick={() => setIsOpen(true)}
          />
          <ClickableCard title="Send Special Deal in bulk" icon={Send} />
        </div>
        {/* email action Cards */}
        <div className="flex gap-6 mb-8">
          <ClickableCard
            title="Create Email Template"
            icon={Plus}
            iconColor="text-green-500"
          />
          <ClickableCard
            title="Modify Email Template"
            icon={Edit}
            iconColor="text-yellow-500"
          />
          <ClickableCard
            title="Delete Email Template"
            icon={Trash2}
            iconColor="text-red-500"
          />
        </div>

        <div>
          <SpecialDealDataTable
            columns={SpecialDealColumns}
            data={specialDealEmailData}
          />
        </div>
      </div>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Send Special Deal Email"
      >
        <form
          className="flex-1 flex flex-col gap-4 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 p-5">
            <div>
              <Label htmlFor="template">Choose Template</Label>
              <Input
                id="template"
                placeholder="Template 1"
                {...register("template")}
              />
            </div>
            <div>
              <Label htmlFor="user">Choose User</Label>
              <Input id="user" placeholder="User name" {...register("user")} />
            </div>
            <div>
              <Label htmlFor="program">Choose Program</Label>
              <Input
                id="program"
                placeholder="Program"
                {...register("program")}
              />
            </div>

            <div className="flex gap-2 mt-4">
              <SubmitButton type="submit">Send Email</SubmitButton>
              <Button
                type="button"
                variant="ghost"
                className="bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </ResponsiveDialog>
    </>
  );
}
