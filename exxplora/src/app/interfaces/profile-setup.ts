export interface ProfileSetup {
    location: string
    organization: string
    institution: string
    startYear: string
    endYear: string
    isStudent: boolean
    selectedDomains: number[]
    profile: File | undefined
    cover: File | undefined
}