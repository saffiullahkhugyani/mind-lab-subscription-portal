import { NextResponse } from "next/server";
import { getAllProgramsAction, getAllTopProgramsAction } from "@/app/dashboard/actions/actions";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
    const { } = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await getAllTopProgramsAction();
        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}
