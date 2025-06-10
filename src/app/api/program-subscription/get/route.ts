import { ProgramSubscriptionModel } from "@/types/custom-types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { data, error: getError } = await supabase
            .from('program_subscription')
            .select("*, programs!inner(*, clubs!inner(*))");

        let mappedData: ProgramSubscriptionModel[] = []

        if (getError) throw new Error(getError.message);

        data.map((item) => mappedData.push({
            subcriptionId: item.id,
            clubId: item.club_id,
            programId: item.program_id,
            clubName: item.programs.clubs.club_name,
            programName: item.programs.program_english_name,
            programStatus: item.programs.status,
            planOneMonth: Number(item.plan_1_month),
            planThreeMonth: Number(item.plan_3_month),
            planTweleveMonth: Number(item.plan_12_month),
            effectiveFrom: item.effective_from,
            effectiveTo: item.effective_to,
            subscriptionType: item.subscription_type,
            subscriptionStatus: item.subscription_status,

        }))

        return NextResponse.json({ success: true, data: mappedData });


    } catch (error) {
        return NextResponse.json({ error: "Failed to get program subscription data list" }, { status: 500 });
    }


}