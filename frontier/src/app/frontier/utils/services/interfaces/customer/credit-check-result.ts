export interface CreditCheckResultInterface {
    creditScore: CreditScoreInterface,
    creditBureau: string,
    date: string,
}

export interface CreditScoreInterface {
    rating: string,
    model: string
}