import { CustomerInterface } from "src/app/frontier/utils/services/interfaces/customer/customer";

export const buildScheduleRequest = (customer: CustomerInterface, scheduleId) => {
    let primaryPhoneNumber = getPhoneNumber(customer, true);
    let secondaryPhoneNumber = getPhoneNumber(customer, false);
    if (!secondaryPhoneNumber) {
        secondaryPhoneNumber = primaryPhoneNumber;
    }
    return {
        scheduleId,
        contact: {
            name: customer.accountName,
            primaryPhoneNumber,
            secondaryPhoneNumber
        }
    }
}

const getPhoneNumber = (customer: CustomerInterface, type) => {
    let foundItem = customer.contacts.item[0].telephones.item.find((item) => {
        return item.isPrimary == type
    })
    return foundItem ? parseInt(foundItem.phoneNumber) : null
}


