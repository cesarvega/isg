export const isServiceFound = (response: any) => {
    const serviceFoundMessage = "Connected Service at Requested Address";
    const errorMessage = response.ServiceQualResponse?.ResponseHeader?.ResponseDescription;
    return errorMessage && errorMessage.includes(serviceFoundMessage)
}