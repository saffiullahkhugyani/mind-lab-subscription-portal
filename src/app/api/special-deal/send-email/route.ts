import SpecialDealEmailTemplate from "@/components/SpecialDealEmailTemplate";
import { SpecialDealEmailPayload } from "@/types/custom-types";
import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const supabase = await createClient();
  try {
    const payload: SpecialDealEmailPayload = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [payload.userEmail],
      subject: `50% OFF on ${payload.programName}`,
      react: SpecialDealEmailTemplate(payload) as React.ReactElement,
      tags: [{ name: "user_id", value: payload.userId }],
    });

    if (error) {
      console.log("Error sending email: ", error);
      return Response.json({ error }, { status: 500 });
    }

    const { data: insertEmailData, error: insertEmailDataError } =
      await supabase
        .from("special_deal_email_send")
        .insert({
          user_id: payload.userId,
          email_id: data!.id,
          program_id: payload.programId,
          status: "sent",
        })
        .select();

    if (insertEmailDataError) {
      console.log("Error inserting email data: ", insertEmailDataError);
      throw new Error(insertEmailDataError.message);
    }

    return Response.json({ data });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
