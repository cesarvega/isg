export interface CreditCheckResultInterface {
    creditScore: CreditScoreInterface,
    creditBureau: string,
    date: string,
}

export interface CreditScoreInterface {
    description: string,
    rating: string,
    model: string
}