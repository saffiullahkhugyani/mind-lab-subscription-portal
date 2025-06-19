import WelcomeEmailTemplate from "@/components/WelcomeEmailTemplate";
import { Resend } from "resend";

const resend = new Resend("re_KD5gZAHp_PvLKzTaGmSStdM8TFggDtDd6");

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["saffiullah.khugyani@gmail.com"],
      subject: "hello world",
      react: WelcomeEmailTemplate("Saffiullah") as React.ReactElement,
    });

    console.log("Error in try: ", error);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error: any) {
    console.log("Error in catch: ", error);
    return Response.json({ error }, { status: 401 });
  }
}
