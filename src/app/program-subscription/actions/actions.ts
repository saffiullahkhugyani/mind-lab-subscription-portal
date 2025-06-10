import { ProgramSubscriptionModel } from "@/types/custom-types";
import { Programs } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export async function getAllClubs() {
    try {
        const supabase = await createClient();
        const { data, error: clubsError } = await supabase
            .from("clubs")
            .select("*")
            .order("created_at", { ascending: false });

        if (clubsError) {
            throw new Error(clubsError.message);
        }

        const clubs = data.map((item) => ({
            clubId: item.club_id,
            clubName: item.club_name,
            createdAt: item.created_at,
        }));

        return { success: true, data: clubs || [] };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An error occurred while fetching clubs.",
        }
    }

}

// fetch all existing progams
export async function getAllProgramsAction() {
    try {
        const supabase = await createClient();
        const { data, error: programsError } = await supabase
            .from("programs")
            .select("*, clubs!inner(club_name)")
            .order("created_at", { ascending: false });

        if (programsError) {
            throw new Error(programsError.message);
        }

        const programs: Programs[] = data.map((item) => ({
            programId: item.program_id,
            programEnglishName: item.program_english_name,
            programArabicName: item.program_arabic_name,
            period: item.period,
            subscriptionValue: item.subscription_value,
            clubId: item.club_id,
            clubName: item.clubs?.club_name ?? null,
            totalAllocatedDonation: item.total_allocated_donation,
            totalRemainingDonation: item.total_remaining_donation,
        }));

        return { success: true, data: programs || [] };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An error occurred while fetching programs.",
        }
    }
}

export async function getAllProgramSubscriptions() {
    try {
        const supabase = await createClient();
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
            startDate: item.programs.start_date,
        }))

        return { success: true, data: mappedData };


    } catch (error: any) {
        console.log(error);
        return { success: false, error: error };
    }
}

