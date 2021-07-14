export interface SecurityChallengeQuestionsRequestInterface {
    securityChallengeQuestions: SecurityChallengeQuestionsItemInterface[]
}

export interface SecurityChallengeQuestionsItemInterface {
    questionNumber: number,
    answerNumber: number
}