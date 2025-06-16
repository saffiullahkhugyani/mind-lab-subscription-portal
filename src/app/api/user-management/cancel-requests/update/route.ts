import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const {id, studentId, status } = await req.json();
    const supabase = await createClient();

    const { data: user } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        console.log(studentId);

        try {
        const { data, error: modifyError } = await supabase
            .from('plan-cancel-request')
            .update({
                status: status
            })
            .eq("id", id)
            .eq("student_id", studentId)
            .select();

        if (modifyError) throw new Error(modifyError.message);

        return NextResponse.json({ success: true, data: data });

    } catch (error) {
        return NextResponse.json({ error: "Failed to cancel program subscription" }, { status: 500 });
    }
}