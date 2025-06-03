import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const { clubId, programName, description, startDate, programPicture,
        programVideo, programFile
    } = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {

        // Insert program into database
        const { data: program, error: insertError } = await supabase
            .from("programs")
            .insert({
                club_id: clubId,
                program_english_name: programName,
                description: description,
                start_date: startDate || null,
                program_picture_url: programPicture || null,
                program_video_url: programVideo || null,
                program_file_url: programFile || null,
                status: "Draft"
            })
            .select()
            .single()

        if (insertError) {
            throw new Error(insertError.message);
        }

        return NextResponse.json({ success: true, program });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add program" }, { status: 500 });
    }
}
