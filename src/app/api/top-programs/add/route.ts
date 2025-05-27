import { NextResponse } from "next/server";
import { addTopProgramAction } from "@/app/dashboard/actions/actions";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const { clubId, programId } = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await addTopProgramAction(clubId, programId);
        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add program" }, { status: 500 });
    }
}
