"use server"

import { Programs, TopPrograms } from "@/types/types";
import { createClient } from "@/utils/supabase/server"

export async function addTopProgramAction(clubId: number, programId: number) {
    console.log("landed here: ", clubId, programId);

    try {
        const supabase = await createClient();
        const { data, error: insertError } = await supabase
            .from("top_programs")
            .insert({ club_id: clubId, program_id: programId });

        if (insertError) {
            throw new Error(insertError.message);
        }

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An error occurred while adding the top program.",
        }
    }


}

export async function getAllTopProgramsAction() {
    try {
        const supabase = await createClient();
        const { data, error: topProgramsError } = await supabase
            .from("top_programs")
            .select("id, programs!inner(program_id, program_english_name), clubs!inner(club_id, club_name)")
            .order("created_at", { ascending: false });

        if (topProgramsError) {
            throw new Error(topProgramsError.message);
        }

        const topPrograms: TopPrograms[] = data.map((item) => ({
            id: item.id,
            programId: item.programs.program_id,
            programName: item.programs.program_english_name,
            clubId: item.clubs.club_id,
            clubName: item.clubs?.club_name,
        }));

        console.log("Top Programs: ", topPrograms);

        return { success: true, data: topPrograms || [] };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An error occurred while fetching top programs.",
        }
    }
}

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