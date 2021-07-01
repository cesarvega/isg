export interface Category {
    name: string,
    value: string,
    icon: string,
    active?: boolean
}

export const broadbandServiceType = "Broadband";
export const voiceServiceType = "Voice";
export const addOnsServiceType = "Frontier Secure";

export const categories: Category[] = [
    {
        name: "Internet",
        value: broadbandServiceType,
        icon: "faWifi",
        active: true
    },
    {
        name: "Voice",
        value: voiceServiceType,
        icon: "faVoice"
    },
    {
        name: "Add Ons",
        value: addOnsServiceType,
        icon: "faPlus"
    }
]