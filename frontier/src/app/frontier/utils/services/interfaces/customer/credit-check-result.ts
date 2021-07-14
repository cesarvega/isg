export interface CreditCheckResultInterface {
    creditScore: CreditScoreInterface,
    creditBureau: string,
    date: string,
    fraudPrevention: FraudPreventionInterface
}

export interface CreditScoreInterface {
    description: string,
    rating: string,
    model: string
}

export interface FraudPreventionInterface {
    securityChallengeQuestions: SecurityChallengeQuestionsInterface[]
}

export interface SecurityChallengeQuestionsInterface {
    questionNumber: number,
    question: string,
    answerChoices: AnswerChoicesInterface[],
    answerChoiceNumber?: number;
}

export interface AnswerChoicesInterface {
    number: number,
    text: string
}