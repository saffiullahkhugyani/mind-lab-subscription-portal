import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { id, userId, status } = await req.json();
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(userId);

  try {
    const { data, error: modifyError } = await supabase
      .from("plan_upgrade_request")
      .update({
        status: status,
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select();

    if (modifyError) throw new Error(modifyError.message);

    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upgrade program subscription" },
      { status: 500 }
    );
  }
}
