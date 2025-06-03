import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { clubId, programId, programStatus } = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unathorized" }, { status: 401 });
    }

    try {
        const { data, error: updateError } = await supabase.from("programs")
            .update({ status: programStatus })
            .eq("club_id", clubId)
            .eq("program_id", programId);

        if (updateError) throw new Error(updateError.message)
        return NextResponse.json({ success: true, data: data })
    } catch (error: any) {

        return NextResponse.json({ error: "Failed to update program status" }, { status: 500 });

    }
}