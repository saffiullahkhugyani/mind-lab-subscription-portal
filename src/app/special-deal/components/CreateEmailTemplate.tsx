import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface CreateEmailTemplateProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// zod schema for email template creation
const TemplateFormSchema = z.object({
  templateName: z.string().min(5, "Template name is required"),
  emailSubject: z.string().min(5, "Email subject is required"),
  content: z.string().min(20, "Content is required"),
});

// Inter form type
type TemplateFormValues = z.infer<typeof TemplateFormSchema>;

export default function CreateEmailTemplate({
  setIsOpen,
}: CreateEmailTemplateProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    resolver: zodResolver(TemplateFormSchema),
  });

  const onSubmit: SubmitHandler<TemplateFormValues> = (
    data: TemplateFormValues
  ) => {
    console.log("Template Data:", data);
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-5">
          <div>
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="Enter template name"
              className="input"
              {...register("templateName")}
            />
            {errors.templateName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.templateName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="emailSubject">Subject</Label>
            <Input
              id="emailSubject"
              placeholder="Enter Subject"
              className="input"
              {...register("emailSubject")}
            />
            {errors.emailSubject && (
              <p className="text-red-500 text-sm mt-2">
                {errors.emailSubject.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="content">Template Content</Label>
            <Textarea
              id="content"
              placeholder="Enter Content"
              className="textarea"
              {...register("content")}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-2">
                {errors.content.message}
              </p>
            )}
          </div>
          <Button type={"submit"} className="">
            Create Template
          </Button>
        </div>
      </form>
    </>
  );
}
