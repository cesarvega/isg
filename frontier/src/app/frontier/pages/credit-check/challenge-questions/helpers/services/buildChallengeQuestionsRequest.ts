import { SecurityChallengeQuestionsInterface } from "src/app/frontier/utils/services/interfaces/customer/credit-check-result";
import { SecurityChallengeQuestionsRequestInterface } from "../interfaces/securityChallengeQuestionRequest.interface";

export const buildChallengeQuestionsRequest =
    (securityChallengeQuestions: SecurityChallengeQuestionsInterface[])
        : SecurityChallengeQuestionsRequestInterface => {
        let request: SecurityChallengeQuestionsRequestInterface = {
            securityChallengeQuestions: securityChallengeQuestions.map((securityChallengeQuestion) => {
                return {
                    answerNumber: securityChallengeQuestion.answerChoiceNumber,
                    questionNumber: securityChallengeQuestion.questionNumber
                }
            }),
        }
        return request;
    }