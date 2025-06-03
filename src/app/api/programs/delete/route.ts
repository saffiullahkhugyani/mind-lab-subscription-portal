import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Programs } from "@/types/types";

export async function DELETE(req: Request) {
    const { clubId, programId } = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { data, error: programError } = await
            supabase.from("programs")
                .delete()
                .eq("club_id", clubId)
                .eq("program_id", programId);

        if (programError) throw new Error(programError.message)

        return NextResponse.json({ success: true, message: "Program has been deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}
