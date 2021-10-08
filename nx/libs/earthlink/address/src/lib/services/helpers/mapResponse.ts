function hasVisaReward(offer: any) {
    const rewardOffer = /\$\d+\ Visa reward card/g;
    const offerName = offer.Promotions.Promotion.Name;
    return offerName.search(rewardOffer) >= 0;
}

export const mapResponse = (data: any) => {
    try {
        return data.ServiceQualResponse.Offers.filter((offer: any) => {
            return offer.OfferType === "Single" && offer.OfferName.includes("Fiber") && hasVisaReward(offer)
        })
    } catch (error) {
        console.log(error)
        return [];
    }

}