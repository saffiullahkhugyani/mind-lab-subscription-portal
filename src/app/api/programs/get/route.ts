import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Programs } from "@/types/types";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error: programError } = await supabase
      .from("programs")
      .select("*, clubs!inner(club_name)");

    if (programError) throw new Error(programError.message);

    console.log(data);

    const programs: Programs[] = data!.map((item) => ({
      programId: item.program_id,
      programEnglishName: item.program_english_name,
      programArabicName: item.program_arabic_name,
      period: item.period,
      subscriptionValue: item.subscription_value,
      clubId: item.club_id,
      clubName: item.clubs?.club_name ?? null,
      totalAllocatedDonation: item.total_allocated_donation,
      totalRemainingDonation: item.total_remaining_donation,
      startDate: item.start_date,
      status: item.status,
      programImage: item.program_picture_url,
      programVideo: item.program_video_url,
      programFile: item.program_file_url,
      description: item.description,
    }));

    return NextResponse.json({ success: true, programs });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}
