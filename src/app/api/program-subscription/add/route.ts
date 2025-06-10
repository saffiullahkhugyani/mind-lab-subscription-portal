import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const reqData = await req.json();
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { data, error: insertError } = await supabase
            .from('program_subscription')
            .insert(reqData)
            .select()
            .single()

        if (insertError) throw new Error(insertError.message);

        return NextResponse.json({ success: true, data: data });


    } catch (error) {
        return NextResponse.json({ error: "Failed to insert program subscription" }, { status: 500 });
    }


}