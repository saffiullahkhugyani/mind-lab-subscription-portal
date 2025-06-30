import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clubId, programId, programStatus } = await req.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: programSub, error: programSubError } = await supabase
      .from("program_subscription")
      .select("*")
      .eq("club_id", clubId)
      .eq("program_id", programId);

    if (programSubError)
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 403 }
      );

    if (programSub && programSub.length <= 0)
      return Response.json(
        {
          error:
            "No Subscription found for the program, Please add subscription to change the status",
        },
        { status: 404 }
      );

    const { data, error: updateError } = await supabase
      .from("programs")
      .update({ status: programStatus })
      .eq("club_id", clubId)
      .eq("program_id", programId);

    if (updateError) throw new Error(updateError.message);
    return NextResponse.json({ success: true, data: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
