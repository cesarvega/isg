export const getTransactionId = (response:any) => {
    return response.orderNumber;//response.ServiceQualResponse.Header.transactionID

}