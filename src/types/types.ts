export type Programs = {
    clubId?: number | null
    clubName?: string | null
    period?: string | null
    programArabicName?: string | null
    programEnglishName?: string | null
    programId?: number
    subscriptionValue?: string | null
    totalAllocatedDonation?: number | null
    totalRemainingDonation?: number | null
    status?: string | null
    startDate?: string | null
    programImage?: string | null
    programVideo?: string | null
    programFile?: string | null
    description?: string | null
}

export type Clubs = {
    clubId?: number | null;
    clubName?: string | null;
    createdAt?: string | null;
}

export type TopPrograms = {
    id?: number | null;
    programId?: number | null;
    programName?: string | null;
    clubId?: number | null;
    clubName?: string | null;
}