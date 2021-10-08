import { TestCase } from "libs/earthlink/shared/src/lib/components/test-selector/models/test-case";

export const testCases: TestCase[] = [
    {
        name: "Frontier Dish",
        value: "frontier_dish",
        data: {
            AddressLine1: '5110 Arborfield Ct',
            AddressLine2: '',
            State: 'IN',
            City: 'Fort Wayne',
            Zip: {
                ZipCode: '46835'
            }
        }
    }, {
        name: "Frontier TV",
        value: "frontier_tv",
        data: {
            AddressLine1: '2401 Hadley Ln',
            AddressLine2: '',
            State: 'CA',
            City: 'Redondo Beach',
            Zip: {
                ZipCode: '90278'
            }
        }
    }
]

