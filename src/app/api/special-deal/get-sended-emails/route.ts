import { createClient } from "@/utils/supabase/server";
import { send } from "process";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("special_deal_email_send")
      .select(
        "id, profiles!inner(name, email), programs!inner(program_id, program_english_name), status, send_date"
      );
    if (error) {
      throw new Error(error.message);
    }
    if (!data || data.length === 0) {
      return Response.json({ error: "No sended email found" }, { status: 404 });
    }
    const sendedEmailList = data.map((item) => {
      const date = new Date(item.send_date!);
      return {
        id: item.id,
        userEmail: item.profiles.email,
        programName: item.programs.program_english_name,
        sendDate: date.toLocaleDateString(),
        status: item.status,
      };
    });

    console.log(sendedEmailList);

    return Response.json(
      { success: true, data: sendedEmailList },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Failed to get special deal sended emails: ", error);
    return Response.json(
      {
        error: `Failed to get special deal sended emails: ${error}`,
      },
      { status: 500 }
    );
  }
}
