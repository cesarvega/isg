export const noOffersFound = (response: any) => {
    return !response.ServiceQualResponse?.Offers
}