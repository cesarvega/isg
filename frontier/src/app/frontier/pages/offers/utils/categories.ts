export interface Category {
    name: string,
    value: string,
    icon: string,
    active?: boolean
}

export const categories: Category[] = [
    {
        name: "Internet",
        value: "Broadband",
        icon: "faWifi",
        active: true
    },
    {
        name: "Voice",
        value: "Voice",
        icon: "faVoice"
    },
    {
        name: "Add Ons",
        value: "Frontier Secure",
        icon: "faPlus"
    }
]