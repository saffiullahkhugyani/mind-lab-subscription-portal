import { NextResponse } from "next/server";
import { getAllClubs } from "@/app/dashboard/actions/actions";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await getAllClubs();
        return NextResponse.json({ success: true, data: result.data });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch clubs" }, { status: 500 });
    }
}
