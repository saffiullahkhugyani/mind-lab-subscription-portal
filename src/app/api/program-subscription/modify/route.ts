import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const programodifyProgramSubscription = await req.json();
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { data, error: modifyError } = await supabase
            .from('program_subscription')
            .upsert(programodifyProgramSubscription).select();

        if (modifyError) throw new Error(modifyError.message);

        return NextResponse.json({ success: true, data: data });

    } catch (error) {
        return NextResponse.json({ error: "Failed to insert program subscription" }, { status: 500 });
    }
}