export const fakeQuote = {
    "quoteId": "01b5eba3-4e2f-42d6-81de-0b0900f82175",
    "quoteNumber": "0095919",
    "created": "2021-08-03T18:41:13.182Z",
    "updated": "2021-08-03T18:42:18.817Z",
    "status": {
        "quoteStatus": "IN_BUY_FLOW",
        "productsModifiable": true,
        "scheduleModifiable": true,
        "cancelAllowed": true,
        "productConfigStatus": "Invalid"
    },
    "productSummary": {
        "productLineItemSummary": [
            {
                "lineItemId": "ada91909-66c0-474d-90a5-b2275bad26a3",
                "name": "FiberOptic 50 Mbps Internet",
                "nonRecurringPrice": "0",
                "recurringPrice": "44.99",
                "billOfMaterials": [
                    {
                        "componentId": "9187f4ca-481d-4f89-8785-84e2e81ee523",
                        "seCode": "RN001",
                        "rate": "59.99",
                        "rateType": "RecurringCharge",
                        "tax": [],
                        "name": "FiberOptic 50 Mbps Internet"
                    },
                    {
                        "componentId": "f4501328-7639-4b1a-abf1-c13cee345a16",
                        "seCode": "RNCRF",
                        "rate": "-10",
                        "rateType": "RecurringCharge",
                        "tax": [],
                        "durationInMonths": "12",
                        "name": "Fiber Internet Discount"
                    },
                    {
                        "componentId": "5b0912db-d21c-4da2-8499-059235432a06",
                        "seCode": "AUTOP",
                        "rate": "-5",
                        "rateType": "RecurringCharge",
                        "tax": [],
                        "name": "Auto Pay/Paperless"
                    }
                ],
                "serviceType": "Broadband"
            },
            {
                "lineItemId": "aa9a35f3-bfdb-45ad-b764-715c85881119",
                "name": "Unlimited Digital Voice",
                "nonRecurringPrice": "0",
                "recurringPrice": "10.00",
                "billOfMaterials": [
                    {
                        "componentId": "ac0cc409-17d5-48ab-b12b-d5b6ce2322a3",
                        "seCode": "RNV01",
                        "rate": "43",
                        "rateType": "RecurringCharge",
                        "tax": [
                            {
                                "taxCode": "TXXEP",
                                "taxCodeDescription": "Plano VOIP 911 Surcharge",
                                "amount": ".75"
                            },
                            {
                                "taxCode": "TXXCO",
                                "taxCodeDescription": "Collin County VOIP 911 Surcharge",
                                "amount": ".00"
                            },
                            {
                                "taxCode": "TXSTS",
                                "taxCodeDescription": "TX State 911 Equalization Surcharge",
                                "amount": ".06"
                            },
                            {
                                "taxCode": "TX5PM",
                                "taxCodeDescription": "Plano Telecom District Sales Tax",
                                "amount": ".15"
                            },
                            {
                                "taxCode": "TX5PO",
                                "taxCodeDescription": "Plano Telecom Sales Tax",
                                "amount": ".15"
                            },
                            {
                                "taxCode": "TXSTX",
                                "taxCodeDescription": "TX State Tel Sales Tax",
                                "amount": "3.24"
                            },
                            {
                                "taxCode": "FUSF",
                                "taxCodeDescription": "Federal USF Recovery Charge",
                                "amount": "8.87"
                            }
                        ],
                        "durationInMonths": "12",
                        "name": "Unlimited Digital Voice"
                    },
                    {
                        "componentId": "bdf8d7d5-5811-4363-b7aa-607b03c2f003",
                        "seCode": "RNCRV",
                        "rate": "-33",
                        "rateType": "RecurringCharge",
                        "tax": [],
                        "name": "Broadband and Voice Bundle Discount"
                    }
                ],
                "serviceType": "Voice"
            }
        ],
        "installationType": "",
        "workUnits": "",
        "voiceService": true,
        "videoService": false,
        "dataService": true,
        "securityService": false,
        "hasCPE": false,
        "SDWAN": false,
        "smartVoice": false,
        "copperVoiceOnly": false,
        "videoEquipmentOrdered": false,
        "numberPortabilityRequested": false,
        "nonRecurringPrice": "0.00",
        "monthlyRecurringPrice": "54.99"
    },
    "currentTasks": [
        {
            "taskId": "2a544794-55d4-4897-aa3a-f32ca4a9430a",
            "taskName": "offerSelectConfigTask"
        },
        {
            "taskId": "946c017b-6e44-497b-be66-36a9eff04a68",
            "taskName": "numberPortabilityTask"
        },
        {
            "taskId": "f6ee08a1-877d-48e7-87fe-74b004a67fae",
            "taskName": "changeCustomerDetailsTask"
        }
    ],
    "items": [
        {
            "productId": "9187f4ca-481d-4f89-8785-84e2e81ee523",
            "itemAction": "add",
            "productConfiguration": {
                "ID": "ID_1smbr2hwqh",
                "EntityID": "9187f4ca-481d-4f89-8785-84e2e81ee523",
                "Name": "FiberOptic 50 Mbps Internet",
                "ChildEntity": [
                    {
                        "ID": "ID_09hokzxou1",
                        "EntityID": "f4501328-7639-4b1a-abf1-c13cee345a16",
                        "Name": "Fiber Internet Discount",
                        "Mandatory": true,
                        "Price": [
                            {
                                "Name": "MRC - Simplified",
                                "rateRecurring": "-10",
                                "durationInMonths": "12"
                            }
                        ],
                        "minimumActiveChildEntities": "0",
                        "maximumActiveChildEntities": "0"
                    },
                    {
                        "ID": "ID_ubvjz0mnxv",
                        "EntityID": "f8f82754-7c27-4dcb-872d-4412c0308aa1",
                        "Name": "Add Ons",
                        "Mandatory": true,
                        "ChildEntity": [
                            {
                                "ID": "ID_09x29pmtju",
                                "EntityID": "6edafaba-b42b-408d-a566-fe158a7a8a95",
                                "Name": "Routers",
                                "Mandatory": true,
                                "ChildEntity": [
                                    {
                                        "ID": "ID_4obz9ghdni",
                                        "EntityID": "afd240b1-9aa8-4c6f-b8c1-377b58b92739",
                                        "Name": "Frontier Provided Router",
                                        "Mandatory": false,
                                        "Active": true,
                                        "Price": [
                                            { "Name": "MRC - Equipment", "rateRecurring": "0" }
                                        ],
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    }
                                ],
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "1"
                            },
                            {
                                "ID": "ID_uotz0zq44m",
                                "EntityID": "6d313c4a-a701-4df1-9553-12927e2a4594",
                                "Name": "Order Charge/Non Recurring Charge Options",
                                "Mandatory": true,
                                "ChildEntity": [
                                    {
                                        "ID": "ID_7c6hijxukg",
                                        "EntityID": "4d52ed78-a15e-44d4-a4c9-00d91842ae49",
                                        "Name": "Labor 1st 30 Minutes",
                                        "Mandatory": false,
                                        "Active": false,
                                        "ChildEntity": [
                                            {
                                                "ID": "ID_4zu5aevh50",
                                                "EntityID": "4b6410fb-f245-4e6a-95fe-ff27161ae6b1",
                                                "Name": "Premise Visit",
                                                "Mandatory": false,
                                                "Active": false,
                                                "Price": [
                                                    {
                                                        "Name": "Service Order Charge",
                                                        "rateNonRecurring": "15"
                                                    }
                                                ],
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0"
                                            }
                                        ],
                                        "Price": [
                                            {
                                                "Name": "Labor - First 30 Minutes",
                                                "rateNonRecurring": "35"
                                            }
                                        ],
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "1"
                                    },
                                    {
                                        "ID": "ID_c6s8dxeycz",
                                        "EntityID": "cd2e6f9c-1fb4-4733-84de-ae194bf13a4a",
                                        "Name": "HSI Installation Types Options",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "1",
                                        "maximumActiveChildEntities": "1",
                                        "ChildEntity": [
                                            {
                                                "ID": "ID_8pqzpgmkhv",
                                                "EntityID": "481d3b4f-2c10-4787-9603-94891e58d28d",
                                                "Name": "Activation Fee",
                                                "Mandatory": false,
                                                "Active": true,
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0",
                                                "Price": [
                                                    {
                                                        "Name": "HSI Full Install",
                                                        "rateNonRecurring": "0"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "minimumActiveChildEntities": "1",
                                "maximumActiveChildEntities": "2"
                            }
                        ],
                        "minimumActiveChildEntities": "2",
                        "maximumActiveChildEntities": "2"
                    },
                    {
                        "ID": "ID_5mhp53hhus",
                        "EntityID": "953eb285-4a98-4f04-9b27-11c78d50064b",
                        "Name": "Offers",
                        "Mandatory": true,
                        "ChildEntity": [
                            {
                                "ID": "ID_tz2b09f9zu",
                                "EntityID": "d39cf0d7-55b7-429d-9908-b11869ac5230",
                                "Name": "Federal Broadband Credit",
                                "Mandatory": false,
                                "Active": false,
                                "Price": [{ "Name": "MRC - T3" }],
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "0"
                            },
                            {
                                "ID": "ID_ag8bw321ic",
                                "EntityID": "5b0912db-d21c-4da2-8499-059235432a06",
                                "Name": "Auto Pay/Paperless",
                                "Mandatory": false,
                                "Active": true,
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "0",
                                "Price": [{ "Name": "MRC - Simplified", "rateRecurring": "-5" }]
                            }
                        ],
                        "minimumActiveChildEntities": "0",
                        "maximumActiveChildEntities": "2"
                    }
                ],
                "Price": [{ "Name": "MRC - Simplified", "rateRecurring": "59.99" }],
                "minimumActiveChildEntities": "3",
                "maximumActiveChildEntities": "3"
            },
            "name": "FiberOptic 50 Mbps Internet",
            "id": "ada91909-66c0-474d-90a5-b2275bad26a3",
            "itemNumber": "0017204",
            "created": "2021-08-03T18:41:24.195Z",
            "description": "",
            "currentValidation": {
                "valid": false,
                "errors": [
                    {
                        "entityID": "cd2e6f9c-1fb4-4733-84de-ae194bf13a4a",
                        "childID": "",
                        "entityUniqueCode": "ID_c6s8dxeycz",
                        "errorCode": "GroupCardinalityNotSatisfied",
                        "friendlyMessage": "You must make a choice of child component under entity 'HSI Installation Types Options'",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required child items or has too many child items",
                        "name": "//FiberOptic 50 Mbps Internet//Add Ons//Order Charge/Non Recurring Charge Options//HSI Installation Types Options"
                    }
                ]
            },
            "priceSummary": {
                "RecurringCharges": {
                    "Period": [
                        {
                            "Name": "Monthly",
                            "MinimumTotal": "44.99",
                            "FinalTotal": "44.99"
                        }
                    ]
                },
                "NonRecurringCharges": { "MinimumTotal": "0", "FinalTotal": "0" }
            }
        },
        {
            "productId": "ac0cc409-17d5-48ab-b12b-d5b6ce2322a3",
            "itemAction": "add",
            "productConfiguration": {
                "ID": "ID_qnn0nqp5u1",
                "EntityID": "ac0cc409-17d5-48ab-b12b-d5b6ce2322a3",
                "Name": "Unlimited Digital Voice",
                "ChildEntity": [
                    {
                        "ID": "ID_c9rqpgmp8m",
                        "EntityID": "33381ac1-1aba-4fc6-a58d-aeaa2fb24055",
                        "Name": "IP-Voice-UDV",
                        "Mandatory": true,
                        "ChildEntity": [
                            {
                                "ID": "ID_qvzwkq2xzx",
                                "EntityID": "5f020acb-aaad-42e7-ac8b-6babcb1165f3",
                                "Name": "Local Carrier Freeze Options",
                                "Mandatory": true,
                                "minimumActiveChildEntities": "1",
                                "maximumActiveChildEntities": "1",
                                "ChildEntity": [
                                    {
                                        "ID": "ID_xpbdv1y6j1",
                                        "EntityID": "fa9a26b2-b3f0-4fec-9b04-1c7aa1cc7e89",
                                        "Name": "No, I am Not Interested in Local PIC Freeze, maybe next time.",
                                        "Mandatory": false,
                                        "Active": false,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    },
                                    {
                                        "ID": "ID_t7oky15gia",
                                        "EntityID": "c2a86fbe-eb3f-4903-b95f-9c12c213f071",
                                        "Name": "Dial Tone Freeze",
                                        "Mandatory": false,
                                        "Active": false,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0",
                                        "Price": [{ "Name": "MRC - Freeze" }]
                                    },
                                    {
                                        "ID": "ID_k9za3nlcma",
                                        "EntityID": "c03ffdb6-5489-4677-a6af-b98432ecb1ae",
                                        "Name": "No, I am Not interested in Local PIC Freeze, Do not ask again!",
                                        "Mandatory": false,
                                        "Active": true,
                                        "Price": [{ "Name": "MRC - Freeze" }],
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    }
                                ]
                            },
                            {
                                "ID": "ID_p37drrmcnk",
                                "EntityID": "4d74793d-1963-45c4-947a-8419ffeaae81",
                                "Name": "Order Charge/Non Recurring Charge Options",
                                "Mandatory": true,
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "1",
                                "ChildEntity": [
                                    {
                                        "ID": "ID_oeeov0oacv",
                                        "EntityID": "4d52ed78-a15e-44d4-a4c9-00d91842ae49",
                                        "Name": "Labor 1st 30 Minutes",
                                        "Mandatory": false,
                                        "Active": false,
                                        "ChildEntity": [
                                            {
                                                "ID": "ID_51scqlpgqq",
                                                "EntityID": "4b6410fb-f245-4e6a-95fe-ff27161ae6b1",
                                                "Name": "Premise Visit",
                                                "Mandatory": false,
                                                "Active": false,
                                                "Price": [
                                                    {
                                                        "Name": "Service Order Charge",
                                                        "rateNonRecurring": "15"
                                                    }
                                                ],
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0"
                                            }
                                        ],
                                        "Price": [
                                            {
                                                "Name": "Labor - First 30 Minutes",
                                                "rateNonRecurring": "35"
                                            }
                                        ],
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "1"
                                    }
                                ]
                            },
                            {
                                "ID": "ID_0sx5ps8ueq",
                                "EntityID": "3aab52eb-afc6-40aa-aa29-8eb5cab7da73",
                                "Name": "Would you like to keep your current phone number, or get a new phone number?",
                                "Mandatory": false,
                                "Active": false,
                                "ConfiguredValue": [
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "d8562dc2-03ee-4cd7-9dde-f60e982e4aa9",
                                        "Name": "Zip Code",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "d8562dc2-03ee-4cd7-9dde-f60e982e4aa9",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "8bc1f8c4-4f9a-4ce7-8945-5688d6aae704",
                                        "Name": "City",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "8bc1f8c4-4f9a-4ce7-8945-5688d6aae704",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "e6839323-b353-41a3-ac4c-c77127662feb",
                                        "Name": "State",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "e6839323-b353-41a3-ac4c-c77127662feb",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "c9311cee-e49d-40d6-941d-f98dc3cb3b8b",
                                        "Name": "Account Number",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "c9311cee-e49d-40d6-941d-f98dc3cb3b8b",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "439708de-e4f0-4de1-9cda-91e5e522944d",
                                        "Name": "Name",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "439708de-e4f0-4de1-9cda-91e5e522944d",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "09488b38-7ff0-4b22-90f5-0ceb0fc7e8f9",
                                        "Name": "Address Line 2",
                                        "Mandatory": false,
                                        "Active": false,
                                        "Value": [
                                            {
                                                "ValueDetail": "09488b38-7ff0-4b22-90f5-0ceb0fc7e8f9",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "ea03ebe8-0a86-47eb-b313-220067e14d47",
                                        "Name": "TN",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "ea03ebe8-0a86-47eb-b313-220067e14d47",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "f50a33dd-c7ba-4e62-8781-3d3298a22f9c",
                                        "Name": "PIN",
                                        "Mandatory": false,
                                        "Active": false,
                                        "Value": [
                                            {
                                                "ValueDetail": "f50a33dd-c7ba-4e62-8781-3d3298a22f9c",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "2679b39c-a64e-4767-974a-d2af4261d51f",
                                        "Name": "Password",
                                        "Mandatory": false,
                                        "Active": false,
                                        "Value": [
                                            {
                                                "ValueDetail": "2679b39c-a64e-4767-974a-d2af4261d51f",
                                                "Value": ""
                                            }
                                        ]
                                    },
                                    {
                                        "UseArea": "User_Specification_Characteristics",
                                        "CharacteristicID": "4e2187a7-fa44-444a-a9db-4e0046ba67f8",
                                        "Name": "Address Line 1",
                                        "Mandatory": true,
                                        "Value": [
                                            {
                                                "ValueDetail": "4e2187a7-fa44-444a-a9db-4e0046ba67f8",
                                                "Value": ""
                                            }
                                        ]
                                    }
                                ],
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "0"
                            },
                            {
                                "ID": "ID_m99nsqo7ar",
                                "EntityID": "31f02286-618d-41f0-bf37-d0fbb28d99a9",
                                "Name": "Directory Listing Options",
                                "Mandatory": true,
                                "ChildEntity": [
                                    {
                                        "ID": "ID_cctfogmost",
                                        "EntityID": "b297241c-f56e-44ec-9c10-fd683ae3a475",
                                        "Name": "Mailing Information Options",
                                        "Mandatory": true,
                                        "ChildEntity": [
                                            {
                                                "ID": "ID_ki6d5okuym",
                                                "EntityID": "7c36af6c-2a3e-416c-88d4-77e7819d1e71",
                                                "Name": "Mailing Address - Additional Information",
                                                "Mandatory": false,
                                                "Active": false,
                                                "ConfiguredValue": [
                                                    {
                                                        "UseArea": "User_Specification_Characteristics",
                                                        "CharacteristicID": "e1b62725-510f-c321-a067-b35b811a0063",
                                                        "Name": "State",
                                                        "Mandatory": true,
                                                        "Value": [
                                                            {
                                                                "ValueDetail": "e1b62725-510f-c321-a067-b35b811a0063",
                                                                "Value": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "UseArea": "User_Specification_Characteristics",
                                                        "CharacteristicID": "46f28741-b639-61e6-c442-3144e02b8917",
                                                        "Name": "Address",
                                                        "Mandatory": true,
                                                        "Value": [
                                                            {
                                                                "ValueDetail": "46f28741-b639-61e6-c442-3144e02b8917",
                                                                "Value": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "UseArea": "User_Specification_Characteristics",
                                                        "CharacteristicID": "27cf1021-bc40-93bf-0bda-ba4d39c47c0c",
                                                        "Name": "Zipcode",
                                                        "Mandatory": true,
                                                        "Value": [
                                                            {
                                                                "ValueDetail": "27cf1021-bc40-93bf-0bda-ba4d39c47c0c",
                                                                "Value": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "UseArea": "User_Specification_Characteristics",
                                                        "CharacteristicID": "e1065d52-0f62-abc8-89c7-089aef5ac72d",
                                                        "Name": "Last Name",
                                                        "Mandatory": true,
                                                        "Value": [
                                                            {
                                                                "ValueDetail": "e1065d52-0f62-abc8-89c7-089aef5ac72d",
                                                                "Value": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "UseArea": "User_Specification_Characteristics",
                                                        "CharacteristicID": "864149e9-5340-6b22-e461-e7374f119730",
                                                        "Name": "City",
                                                        "Mandatory": true,
                                                        "Value": [
                                                            {
                                                                "ValueDetail": "864149e9-5340-6b22-e461-e7374f119730",
                                                                "Value": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "UseArea": "User_Specification_Characteristics",
                                                        "CharacteristicID": "535268f4-0127-34e8-9ca1-3b14e0383260",
                                                        "Name": "First Name",
                                                        "Mandatory": true,
                                                        "Value": [
                                                            {
                                                                "ValueDetail": "535268f4-0127-34e8-9ca1-3b14e0383260",
                                                                "Value": ""
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0"
                                            }
                                        ],
                                        "CharacteristicUse": [
                                            {
                                                "UseArea": "Order_Time_Characteristics",
                                                "CharacteristicID": "0f9a1e2f-6364-4023-9fae-2ac0bb67fdb6",
                                                "Name": "Mailing Address",
                                                "Mandatory": true,
                                                "ValidValues": [
                                                    {
                                                        "ValueID": "40b35499-a957-4a36-9168-69cfecfc370a",
                                                        "Value": "B - Billing Address",
                                                        "Active": true
                                                    },
                                                    {
                                                        "ValueID": "6ed21120-0e67-45e1-8114-ad659f327abd",
                                                        "Value": "D - Directory Address",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "8f63646d-e6d7-4d16-bde9-0a0e3191cec7",
                                                        "Value": "O - Other",
                                                        "Active": false
                                                    }
                                                ]
                                            }
                                        ],
                                        "ConfiguredValue": [
                                            {
                                                "UseArea": "User_Specification_Characteristics",
                                                "CharacteristicID": "d7b65e9c-480c-40ce-b228-c52a00f90772",
                                                "Name": "Qty of Directories",
                                                "Mandatory": false,
                                                "Active": false,
                                                "Value": [
                                                    {
                                                        "ValueDetail": "d7b65e9c-480c-40ce-b228-c52a00f90772",
                                                        "Value": "1"
                                                    }
                                                ]
                                            }
                                        ],
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "1"
                                    },
                                    {
                                        "ID": "ID_8b5y7c6gbv",
                                        "EntityID": "c37e99e1-cbe8-4545-80e8-248ec0c93a52",
                                        "Name": "Listing Information Options",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "1",
                                        "maximumActiveChildEntities": "1",
                                        "ChildEntity": [
                                            {
                                                "ID": "ID_ij28hma7ji",
                                                "EntityID": "6061bd4a-4dd2-46f9-aa13-fd2ecb024497",
                                                "Name": "Non-Published Listing",
                                                "Mandatory": false,
                                                "Active": false,
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0",
                                                "Price": [{ "Name": "MRC - Voice" }]
                                            },
                                            {
                                                "ID": "ID_qcrv7vo7hc",
                                                "EntityID": "e4fefb15-6154-488c-9a14-87b9a46ab642",
                                                "Name": "Listed",
                                                "Mandatory": false,
                                                "Active": false,
                                                "minimumActiveChildEntities": "1",
                                                "maximumActiveChildEntities": "2",
                                                "ChildEntity": [
                                                    {
                                                        "ID": "ID_og3cderutv",
                                                        "EntityID": "b9ec33fa-3eee-4980-80bd-42885670d3fe",
                                                        "Name": "Directory Listing - Main",
                                                        "Mandatory": true,
                                                        "minimumActiveChildEntities": "0",
                                                        "maximumActiveChildEntities": "0",
                                                        "ConfiguredValue": [
                                                            {
                                                                "UseArea": "User_Specification_Characteristics",
                                                                "CharacteristicID": "350f87ed-bb59-2839-9722-5d19366335c1",
                                                                "Name": "First Name",
                                                                "Mandatory": true,
                                                                "Value": [
                                                                    {
                                                                        "ValueDetail": "350f87ed-bb59-2839-9722-5d19366335c1",
                                                                        "Value": " "
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "UseArea": "User_Specification_Characteristics",
                                                                "CharacteristicID": "2ae480b0-47a8-0544-244e-bf895d5a3ec1",
                                                                "Name": "Last Name",
                                                                "Mandatory": true,
                                                                "Value": [
                                                                    {
                                                                        "ValueDetail": "2ae480b0-47a8-0544-244e-bf895d5a3ec1",
                                                                        "Value": " "
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "CharacteristicUse": [
                                                            {
                                                                "UseArea": "Order_Time_Characteristics",
                                                                "CharacteristicID": "3893fd08-b9da-4f97-923e-4da60745eea0",
                                                                "Name": "Listing Choice",
                                                                "Mandatory": false,
                                                                "Active": false,
                                                                "ValidValues": [
                                                                    {
                                                                        "ValueID": "2765118c-0588-431b-8bef-c3efcf67e5bb",
                                                                        "Value": "Complete Address",
                                                                        "Active": true
                                                                    },
                                                                    {
                                                                        "ValueID": "620b5c85-dd24-48a0-80ce-b37a8ad33483",
                                                                        "Value": "Complete Address Omitted",
                                                                        "Active": false
                                                                    },
                                                                    {
                                                                        "ValueID": "c896d7b5-85bd-465c-94cf-671c1ca97fe1",
                                                                        "Value": "Street Address Omitted",
                                                                        "Active": false
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "ID": "ID_e2wh4xdpwq",
                                                        "EntityID": "3c4f1366-fd26-4b66-ad28-5ee8100af7e8",
                                                        "Name": "Additional Listing",
                                                        "Mandatory": false,
                                                        "Active": false,
                                                        "ChildEntity": [
                                                            {
                                                                "ID": "ID_15i0rzjj9t",
                                                                "EntityID": "91b77fe2-ba3f-4cb9-a6a2-e76888dba8f3",
                                                                "Name": "Directory Listing - Additional",
                                                                "Mandatory": true,
                                                                "ConfiguredValue": [
                                                                    {
                                                                        "UseArea": "User_Specification_Characteristics",
                                                                        "CharacteristicID": "122ae505-2c54-f94b-7287-8f76691ccc77",
                                                                        "Name": "Last Name",
                                                                        "Mandatory": true,
                                                                        "Value": [
                                                                            {
                                                                                "ValueDetail": "122ae505-2c54-f94b-7287-8f76691ccc77",
                                                                                "Value": " "
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "UseArea": "User_Specification_Characteristics",
                                                                        "CharacteristicID": "2090e7f0-512d-1104-d5ac-091a5802b221",
                                                                        "Name": "First Name",
                                                                        "Mandatory": true,
                                                                        "Value": [
                                                                            {
                                                                                "ValueDetail": "2090e7f0-512d-1104-d5ac-091a5802b221",
                                                                                "Value": " "
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "CharacteristicUse": [
                                                                    {
                                                                        "UseArea": "Order_Time_Characteristics",
                                                                        "CharacteristicID": "3893fd08-b9da-4f97-923e-4da60745eea0",
                                                                        "Name": "Listing Choice",
                                                                        "Mandatory": false,
                                                                        "Active": false,
                                                                        "ValidValues": [
                                                                            {
                                                                                "ValueID": "2765118c-0588-431b-8bef-c3efcf67e5bb",
                                                                                "Value": "Complete Address",
                                                                                "Active": true
                                                                            },
                                                                            {
                                                                                "ValueID": "620b5c85-dd24-48a0-80ce-b37a8ad33483",
                                                                                "Value": "Complete Address Omitted",
                                                                                "Active": false
                                                                            },
                                                                            {
                                                                                "ValueID": "c896d7b5-85bd-465c-94cf-671c1ca97fe1",
                                                                                "Value": "Street Address Omitted",
                                                                                "Active": false
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "minimumActiveChildEntities": "0",
                                                                "maximumActiveChildEntities": "0"
                                                            }
                                                        ],
                                                        "Price": [{ "Name": "MRC - Voice" }],
                                                        "minimumActiveChildEntities": "1",
                                                        "maximumActiveChildEntities": "1"
                                                    }
                                                ]
                                            },
                                            {
                                                "ID": "ID_8x37f9m6vv",
                                                "EntityID": "1e65f9a2-1c13-461c-9c46-ad90d612fe22",
                                                "Name": "Non-Listed",
                                                "Mandatory": false,
                                                "Active": false,
                                                "minimumActiveChildEntities": "1",
                                                "maximumActiveChildEntities": "1",
                                                "ChildEntity": [
                                                    {
                                                        "ID": "ID_kuoyo11a8n",
                                                        "EntityID": "b9ec33fa-3eee-4980-80bd-42885670d3fe",
                                                        "Name": "Directory Listing - Main",
                                                        "Mandatory": true,
                                                        "minimumActiveChildEntities": "0",
                                                        "maximumActiveChildEntities": "0",
                                                        "ConfiguredValue": [
                                                            {
                                                                "UseArea": "User_Specification_Characteristics",
                                                                "CharacteristicID": "350f87ed-bb59-2839-9722-5d19366335c1",
                                                                "Name": "First Name",
                                                                "Mandatory": true,
                                                                "Value": [
                                                                    {
                                                                        "ValueDetail": "350f87ed-bb59-2839-9722-5d19366335c1",
                                                                        "Value": " "
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "UseArea": "User_Specification_Characteristics",
                                                                "CharacteristicID": "2ae480b0-47a8-0544-244e-bf895d5a3ec1",
                                                                "Name": "Last Name",
                                                                "Mandatory": true,
                                                                "Value": [
                                                                    {
                                                                        "ValueDetail": "2ae480b0-47a8-0544-244e-bf895d5a3ec1",
                                                                        "Value": " "
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "CharacteristicUse": [
                                                            {
                                                                "UseArea": "Order_Time_Characteristics",
                                                                "CharacteristicID": "3893fd08-b9da-4f97-923e-4da60745eea0",
                                                                "Name": "Listing Choice",
                                                                "Mandatory": false,
                                                                "Active": false,
                                                                "ValidValues": [
                                                                    {
                                                                        "ValueID": "2765118c-0588-431b-8bef-c3efcf67e5bb",
                                                                        "Value": "Complete Address",
                                                                        "Active": true
                                                                    },
                                                                    {
                                                                        "ValueID": "620b5c85-dd24-48a0-80ce-b37a8ad33483",
                                                                        "Value": "Complete Address Omitted",
                                                                        "Active": false
                                                                    },
                                                                    {
                                                                        "ValueID": "c896d7b5-85bd-465c-94cf-671c1ca97fe1",
                                                                        "Value": "Street Address Omitted",
                                                                        "Active": false
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "Price": [{ "Name": "MRC - Voice" }]
                                            }
                                        ]
                                    }
                                ],
                                "minimumActiveChildEntities": "2",
                                "maximumActiveChildEntities": "2"
                            },
                            {
                                "ID": "ID_fesfdejcp2",
                                "EntityID": "14b31a63-d415-4c26-b521-8b6b4b43e07a",
                                "Name": "Long Distance Calling Options",
                                "Mandatory": true,
                                "minimumActiveChildEntities": "5",
                                "maximumActiveChildEntities": "6",
                                "ChildEntity": [
                                    {
                                        "ID": "ID_dp1p7deqip",
                                        "EntityID": "4f4b7baf-0e8c-4315-be73-9e87509a6284",
                                        "Name": "World Plan 500 Minutes",
                                        "Mandatory": false,
                                        "Active": false,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0",
                                        "Price": [{ "Name": "MRC - Voice" }]
                                    },
                                    {
                                        "ID": "ID_x88gprocm9",
                                        "EntityID": "9be6802e-eda3-41e4-9f44-94cd65bbda2a",
                                        "Name": "World Plan 300 Minutes",
                                        "Mandatory": false,
                                        "Active": false,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0",
                                        "Price": [{ "Name": "MRC - Voice" }]
                                    },
                                    {
                                        "ID": "ID_dpc7fx1fy7",
                                        "EntityID": "f5210474-b020-43a4-8056-6bd348f2761e",
                                        "Name": "Unlimited Canada Calling",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    },
                                    {
                                        "ID": "ID_70arg4ubb0",
                                        "EntityID": "5d5c15ad-1acd-4172-b9f5-b5bf50f8ac98",
                                        "Name": "FiberOptic-Digital Phone LD",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    },
                                    {
                                        "ID": "ID_nk3wnxvs3e",
                                        "EntityID": "2a77c694-08a2-4dd1-a5c5-2a5fb3aa9f80",
                                        "Name": "Unlimited Domestic Calling",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    },
                                    {
                                        "ID": "ID_yvqqnpsqpu",
                                        "EntityID": "5701c103-4e0e-42a3-a30e-498b5609ebb5",
                                        "Name": "Unlimited Mexico Calling",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0"
                                    },
                                    {
                                        "ID": "ID_a6s6bvlwek",
                                        "EntityID": "0c0f8411-12d5-4ba2-8881-13c20514e91f",
                                        "Name": "PIC Selection Options",
                                        "Mandatory": true,
                                        "minimumActiveChildEntities": "2",
                                        "maximumActiveChildEntities": "2",
                                        "ChildEntity": [
                                            {
                                                "ID": "ID_tclvrpcid8",
                                                "EntityID": "a98e9b91-3f54-4953-9ee9-312bae181685",
                                                "Name": "InterLATA PIC Product Spec",
                                                "Mandatory": true,
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0",
                                                "ConfiguredValue": [],
                                                "CharacteristicUse": [
                                                    {
                                                        "UseArea": "Order_Time_Characteristics",
                                                        "CharacteristicID": "d1667538-142d-4e9b-8c33-cc586ef64d86",
                                                        "Name": "InterLata PIC Source Codes",
                                                        "Mandatory": true,
                                                        "ValidValues": [
                                                            {
                                                                "ValueID": "0ae1f568-e7f5-4853-a4d8-9c9f0a0a97fa",
                                                                "Value": "D - DISPUTD PIC/ACC CARR",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "31b0106b-8c91-49ce-82f3-57d1d0ced374",
                                                                "Value": "S - SUPERBALLOT",
                                                                "Active": true
                                                            },
                                                            {
                                                                "ValueID": "3c2ff15a-4c26-4c37-952a-eda11ec5b073",
                                                                "Value": "U - UNAUTHZED PIC CHANGE",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "4b4e2d8f-9f68-453f-a05f-404a89ad70d0",
                                                                "Value": "F - FORCED PIC",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "4e4d1baa-be15-46ab-a982-235ff42b3330",
                                                                "Value": "L - LETTER OF AGENCY",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "6ab9bd3e-4873-4f70-9264-38e139cb520b",
                                                                "Value": "C - CONVERSION",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "c4aa3739-cb92-4ecf-97e5-da5593ece301",
                                                                "Value": "X - UNAUTHZD PIC CHNG,FZ",
                                                                "Active": false
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "ID": "ID_c1cf6d7jyo",
                                                "EntityID": "1e34b523-00fc-41a3-9abf-69043033f70f",
                                                "Name": "IntraLATA PIC Product Spec",
                                                "Mandatory": true,
                                                "minimumActiveChildEntities": "0",
                                                "maximumActiveChildEntities": "0",
                                                "ConfiguredValue": [],
                                                "CharacteristicUse": [
                                                    {
                                                        "UseArea": "Order_Time_Characteristics",
                                                        "CharacteristicID": "3b8ef912-538f-6478-7266-c587ea81849d",
                                                        "Name": "IntraLata PIC Source Codes",
                                                        "Mandatory": true,
                                                        "ValidValues": [
                                                            {
                                                                "ValueID": "11e06e2f-a107-4757-a67d-a7528a170401",
                                                                "Value": "L - LETTER OF AGENCY",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "20239867-4ca8-4697-b7e3-afc8973274e4",
                                                                "Value": "C - CONVERSION",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "4ebf00b8-9a8f-44e0-8b3b-42bc185e5c07",
                                                                "Value": "S - SUPERBALLOT",
                                                                "Active": true
                                                            },
                                                            {
                                                                "ValueID": "80ec2d20-3615-456e-88b9-62f771688aa7",
                                                                "Value": "F - FORCED PIC",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "96c4b2e5-a11d-414f-9d96-a517bbddec45",
                                                                "Value": "X - UNAUTHZD PIC CHNG,FZ",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "ab457e95-5a6f-4481-be00-33fea75615c9",
                                                                "Value": "D - DISPUTD PIC/ACC CARR",
                                                                "Active": false
                                                            },
                                                            {
                                                                "ValueID": "ddc33174-3264-4149-8790-f119ec0dc959",
                                                                "Value": "U - UNAUTHZED PIC CHANGE",
                                                                "Active": false
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "ID": "ID_vigqk4jjkk",
                                "EntityID": "fe16107e-df11-47e5-acf3-6bb6216731e4",
                                "Name": "Feature Options",
                                "Mandatory": true,
                                "ChildEntity": [
                                    {
                                        "ID": "ID_o3xhwnbjh9",
                                        "EntityID": "17b77661-daea-4989-9a88-d020ba306290",
                                        "Name": "Voicemail - Unified Messaging",
                                        "Mandatory": false,
                                        "Active": true,
                                        "minimumActiveChildEntities": "0",
                                        "maximumActiveChildEntities": "0",
                                        "Price": [{ "Name": "MRC - Voice" }],
                                        "ConfiguredValue": [
                                            {
                                                "UseArea": "User_Specification_Characteristics",
                                                "CharacteristicID": "49f0a09d-83ab-431b-8e83-b8950813d8df",
                                                "Name": "Voicemail Email",
                                                "Mandatory": false,
                                                "Active": false,
                                                "Value": [
                                                    {
                                                        "ValueDetail": "49f0a09d-83ab-431b-8e83-b8950813d8df",
                                                        "Value": ""
                                                    }
                                                ]
                                            },
                                            {
                                                "UseArea": "User_Specification_Characteristics",
                                                "CharacteristicID": "287a8f7d-e670-49e7-bb7f-f6f63c5c5cf1",
                                                "Name": "Voicemail Passcode",
                                                "Mandatory": false,
                                                "Active": false,
                                                "Value": [
                                                    {
                                                        "ValueDetail": "287a8f7d-e670-49e7-bb7f-f6f63c5c5cf1",
                                                        "Value": "GC"
                                                    }
                                                ]
                                            }
                                        ],
                                        "CharacteristicUse": [
                                            {
                                                "UseArea": "Order_Time_Characteristics",
                                                "CharacteristicID": "e223d501-027d-47c8-8731-a920f52a8f49",
                                                "Name": "Number of Rings",
                                                "Mandatory": true,
                                                "ValidValues": [
                                                    {
                                                        "ValueID": "3feddf12-1d6d-42ed-a8d3-524c8913b895",
                                                        "Value": "3",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "5b833fbb-b394-4f71-9b24-289bf822b11f",
                                                        "Value": "2",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "828dc466-7c0c-45b9-adaa-b80e5b460e6b",
                                                        "Value": "5",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "b782f0b6-8703-473a-ac9c-c9d91f7eb87f",
                                                        "Value": "9",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "c5855462-eac1-4cb4-8532-8bf00471c0b3",
                                                        "Value": "8",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "c8c2bc09-814c-4745-82dd-1597688b35e8",
                                                        "Value": "4",
                                                        "Active": true
                                                    },
                                                    {
                                                        "ValueID": "d26e1cfb-3b0a-4cc3-9fb1-154c830e96cd",
                                                        "Value": "10",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "d29e66dc-6404-4490-a52f-5ae468eaddb3",
                                                        "Value": "6",
                                                        "Active": false
                                                    },
                                                    {
                                                        "ValueID": "e45593b2-36a3-4e88-9ff6-fb2f29326733",
                                                        "Value": "7",
                                                        "Active": false
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "1"
                            }
                        ],
                        "minimumActiveChildEntities": "5",
                        "maximumActiveChildEntities": "6"
                    },
                    {
                        "ID": "ID_qu06gagmr6",
                        "EntityID": "afd240b1-9aa8-4c6f-b8c1-377b58b92739",
                        "Name": "Frontier Provided Router",
                        "Mandatory": false,
                        "Active": false,
                        "Price": [{ "Name": "MRC - Equipment", "rateRecurring": "0" }],
                        "minimumActiveChildEntities": "0",
                        "maximumActiveChildEntities": "0"
                    },
                    {
                        "ID": "ID_0lmghtv2ke",
                        "EntityID": "953eb285-4a98-4f04-9b27-11c78d50064b",
                        "Name": "Offers",
                        "Mandatory": true,
                        "ChildEntity": [
                            {
                                "ID": "ID_9ibah5ifra",
                                "EntityID": "d39cf0d7-55b7-429d-9908-b11869ac5230",
                                "Name": "Federal Broadband Credit",
                                "Mandatory": false,
                                "Active": false,
                                "Price": [{ "Name": "MRC - T3" }],
                                "minimumActiveChildEntities": "0",
                                "maximumActiveChildEntities": "0"
                            }
                        ],
                        "minimumActiveChildEntities": "0",
                        "maximumActiveChildEntities": "1"
                    }
                ],
                "Price": [{ "Name": "MRC - Simplified" }],
                "minimumActiveChildEntities": "2",
                "maximumActiveChildEntities": "3"
            },
            "name": "Unlimited Digital Voice",
            "id": "aa9a35f3-bfdb-45ad-b764-715c85881119",
            "itemNumber": "0017205",
            "created": "2021-08-03T18:41:26.639Z",
            "description": "",
            "currentValidation": {
                "valid": false,
                "errors": [
                    {
                        "entityID": "ac0cc409-17d5-48ab-b12b-d5b6ce2322a3",
                        "childID": "799aa79f-da6c-4e2d-99f4-4095ba14e267",
                        "entityUniqueCode": "ID_qnn0nqp5u1",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'State' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice"
                    },
                    {
                        "entityID": "e1409992-3e1c-45a6-9af7-282f855e59d5",
                        "childID": "f655f2dd-7e21-41c3-b7d3-241e3008b255",
                        "entityUniqueCode": "cs_eb7d7530-3ece-47e9-8fbb-5b145418a4d6",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'recordLocatorNumber' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//Voice Spec"
                    },
                    {
                        "entityID": "e1409992-3e1c-45a6-9af7-282f855e59d5",
                        "childID": "ea03ebe8-0a86-47eb-b313-220067e14d47",
                        "entityUniqueCode": "cs_eb7d7530-3ece-47e9-8fbb-5b145418a4d6",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'TN - Telephone Number' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//Voice Spec"
                    },
                    {
                        "entityID": "e4657525-8809-4089-a6c9-969434ad9a56",
                        "childID": "c47424f6-b09a-445e-b13f-6538744fefb2",
                        "entityUniqueCode": "ID_nhju0a0bl1",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'New IWM 1YR' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Inside Wire Maintenance"
                    },
                    {
                        "entityID": "17b77661-daea-4989-9a88-d020ba306290",
                        "childID": "e223d501-027d-47c8-8731-a920f52a8f49",
                        "entityUniqueCode": "ID_o3xhwnbjh9",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Number of Rings' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Feature Options//Voicemail - Unified Messaging"
                    },
                    {
                        "entityID": "0c0f8411-12d5-4ba2-8881-13c20514e91f",
                        "childID": "175fb7b2-281f-4c17-b03d-100664f3e5ad",
                        "entityUniqueCode": "ID_a6s6bvlwek",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Moved to Other Carrier Inter' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options"
                    },
                    {
                        "entityID": "0c0f8411-12d5-4ba2-8881-13c20514e91f",
                        "childID": "f0cfd1b2-b588-4fbb-a2a0-8a410ba58662",
                        "entityUniqueCode": "ID_a6s6bvlwek",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Moved to Frontier Carrier Intra' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options"
                    },
                    {
                        "entityID": "0c0f8411-12d5-4ba2-8881-13c20514e91f",
                        "childID": "f747074a-fdb5-4f60-b0d5-6f6aa1e8e105",
                        "entityUniqueCode": "ID_a6s6bvlwek",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Moved to Frontier Carrier Inter' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options"
                    },
                    {
                        "entityID": "0c0f8411-12d5-4ba2-8881-13c20514e91f",
                        "childID": "6fb67d15-d983-4875-bd64-1e48a865fac7",
                        "entityUniqueCode": "ID_a6s6bvlwek",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Moved to Other Carrier Intra' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options"
                    },
                    {
                        "entityID": "c37e99e1-cbe8-4545-80e8-248ec0c93a52",
                        "childID": "",
                        "entityUniqueCode": "ID_8b5y7c6gbv",
                        "errorCode": "GroupCardinalityNotSatisfied",
                        "friendlyMessage": "You must make a choice of child component under entity 'Listing Information Options'",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required child items or has too many child items",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Directory Listing Options//Listing Information Options"
                    },
                    {
                        "entityID": "b297241c-f56e-44ec-9c10-fd683ae3a475",
                        "childID": "0f9a1e2f-6364-4023-9fae-2ac0bb67fdb6",
                        "entityUniqueCode": "ID_cctfogmost",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Mailing Address' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Directory Listing Options//Mailing Information Options"
                    },
                    {
                        "entityID": "a98e9b91-3f54-4953-9ee9-312bae181685",
                        "childID": "f411e7b3-1a43-47e3-9a1d-2721c1ec41db",
                        "entityUniqueCode": "ID_tclvrpcid8",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Mapped InterLATA PIC List' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options//InterLATA PIC Product Spec"
                    },
                    {
                        "entityID": "a98e9b91-3f54-4953-9ee9-312bae181685",
                        "childID": "c44a2f69-05f0-4937-be4b-facf3a543b20",
                        "entityUniqueCode": "ID_tclvrpcid8",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Mapped InterLata PIC Source Codes' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options//InterLATA PIC Product Spec"
                    },
                    {
                        "entityID": "1e34b523-00fc-41a3-9abf-69043033f70f",
                        "childID": "85ff95ac-c28f-4c56-9c58-7ca42bcca527",
                        "entityUniqueCode": "ID_c1cf6d7jyo",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Mapped IntraLATA PIC List' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options//IntraLATA PIC Product Spec"
                    },
                    {
                        "entityID": "1e34b523-00fc-41a3-9abf-69043033f70f",
                        "childID": "c44a2f69-05f0-4937-be4b-facf3a543b20",
                        "entityUniqueCode": "ID_c1cf6d7jyo",
                        "errorCode": "CharacteristicOutOfRange",
                        "friendlyMessage": "characteristic 'Mapped InterLata PIC Source Codes' is required",
                        "message": "The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses",
                        "name": "//Unlimited Digital Voice//IP-Voice-UDV//Long Distance Calling Options//PIC Selection Options//IntraLATA PIC Product Spec"
                    }
                ]
            },
            "priceSummary": {
                "RecurringCharges": {
                    "Period": [
                        {
                            "Name": "Monthly",
                            "MinimumTotal": "10.00",
                            "FinalTotal": "10.00"
                        }
                    ]
                },
                "NonRecurringCharges": { "MinimumTotal": "0", "FinalTotal": "0" }
            }
        }
    ]
}
