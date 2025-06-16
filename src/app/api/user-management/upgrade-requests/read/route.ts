import { PlanUpgradeDataModel } from "@/types/custom-types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser();

    if(!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const {data, error} = await supabase.from("plan-upgrade-request").select();

        var planUpgradeModelList: PlanUpgradeDataModel[] =[] 

        
        if(error) throw new Error(error.message);

        data.map((item) => planUpgradeModelList.push({
            id: item.id,
            studentId: item.student_id,
            email: item.email,
            currentPlan: item.current_plan,
            currentPrice: item.current_price,
            upgradePlan: item.upgrade_plan,
            upgradePrice: item.upgrade_price,
        }))


        return NextResponse.json({success: true, data: planUpgradeModelList})
    } catch(error: any) {
        console.log(`Failed to get list of upgrade requests: ${error}`);
        return NextResponse.json({error: `Failed to get list of upgrade requests: ${error}`}, {status: 500});
    }
}