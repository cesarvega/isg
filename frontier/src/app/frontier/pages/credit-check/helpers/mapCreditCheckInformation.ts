import { resultInformation03, resultInformationA, resultInformationB, resultInformationC, resultInformationPZ } from "./credit-check-information";

export const mapCreditCheckInformation = (score: string) => {
    switch (score) {
        case "A":
            return resultInformationA;
        case "B":
            return resultInformationB;
        case "C":
            return resultInformationC;
        case "PZ":
            return resultInformationPZ;
        case "03":
            return resultInformation03;
    }
}