export const quoteSample = {
  quoteId: 'e662263e-41b6-4d34-acc4-31131e071b78',
  quoteNumber: '0181584',
  created: '2021-05-25T18:02:09.176Z',
  updated: '2021-05-25T18:02:48.360Z',
  status: {
    quoteStatus: 'IN_BUY_FLOW',
    productsModifiable: true,
    scheduleModifiable: true,
    cancelAllowed: true,
    productConfigStatus: 'Invalid',
  },
  productSummary: {
    productLineItemSummary: [
      {
        lineItemId: '33f1708e-f493-4e11-95b9-a9335d9c0fe5',
        name: 'FiberOptic Internet 500/500M',
        nonRecurringPrice: '0',
        recurringPrice: '59.99',
        billOfMaterials: [
          {
            componentId: 'c75fb0df-6d48-4a06-bb10-3ee47a8d3d28',
            seCode: 'RN004',
            rate: '69.99',
            rateType: 'RecurringCharge',
            tax: [],
            name: 'FiberOptic Internet 500/500M',
          },
          {
            componentId: 'f4501328-7639-4b1a-abf1-c13cee345a16',
            seCode: 'RNCRF',
            rate: '-10',
            rateType: 'RecurringCharge',
            tax: [],
            durationInMonths: '12',
            name: 'Fiber Internet Discount',
          },
        ],
        serviceType: 'Broadband',
      },
    ],
    installationType: '',
    workUnits: '',
    voiceService: false,
    videoService: false,
    dataService: true,
    securityService: false,
    hasCPE: false,
    SDWAN: false,
    smartVoice: false,
    copperVoiceOnly: false,
    videoEquipmentOrdered: false,
    numberPortabilityRequested: false,
    nonRecurringPrice: '0.00',
    monthlyRecurringPrice: '59.99',
  },
  currentTasks: [
    {
      taskId: '99c7b9fd-d981-4679-a795-a7d0c1fba769',
      taskName: 'offerSelectConfigTask',
    },
    {
      taskId: 'e00ed96c-9d57-4256-a8cb-fb5ae73e895f',
      taskName: 'customerDetailsTask',
    },
    {
      taskId: '7bd4b713-3a8c-4ffe-a3f6-df9f38e88a95',
      taskName: 'numberPortabilityTask',
    },
  ],
  items: [
    {
      productId: 'c75fb0df-6d48-4a06-bb10-3ee47a8d3d28',
      itemAction: 'add',
      productConfiguration: {
        ID: 'ID_dpxuexmjg1',
        EntityID: 'c75fb0df-6d48-4a06-bb10-3ee47a8d3d28',
        Name: 'FiberOptic Internet 500/500M',
        ChildEntity: [
          {
            ID: 'ID_mah76j1gu7',
            EntityID: 'f4501328-7639-4b1a-abf1-c13cee345a16',
            Name: 'Fiber Internet Discount',
            Mandatory: true,
            Price: [
              {
                Name: 'MRC - T3',
                rateRecurring: '-10',
                durationInMonths: '12',
              },
            ],
            minimumActiveChildEntities: '0',
            maximumActiveChildEntities: '0',
          },
          {
            ID: 'ID_ik2tif8rn4',
            EntityID: '5beccab1-3f43-4fa8-9880-7d37d046e305',
            Name: 'ETF',
            Mandatory: false,
            Active: false,
            minimumActiveChildEntities: '0',
            maximumActiveChildEntities: '0',
          },
          {
            ID: 'ID_gkfhxp4w0f',
            EntityID: 'f8f82754-7c27-4dcb-872d-4412c0308aa1',
            Name: 'FiberOptic Add Ons Options',
            Mandatory: true,
            ChildEntity: [
              {
                ID: 'ID_1jiqudvzpt',
                EntityID: '6edafaba-b42b-408d-a566-fe158a7a8a95',
                Name: 'FiberOptic Routers Options',
                Mandatory: true,
                ChildEntity: [
                  {
                    ID: 'ID_a4ew7hbqpd',
                    EntityID: 'afd240b1-9aa8-4c6f-b8c1-377b58b92739',
                    Name: 'FTR Provided Router',
                    Mandatory: false,
                    Active: true,
                    Price: [{ Name: 'MRC - Equipment' }],
                    minimumActiveChildEntities: '0',
                    maximumActiveChildEntities: '0',
                  },
                ],
                minimumActiveChildEntities: '0',
                maximumActiveChildEntities: '1',
              },
              {
                ID: 'ID_i0ohiykmzo',
                EntityID: 'a5df8862-e56b-45fa-8575-2db2deecf6b0',
                Name: 'Email/ISP',
                Mandatory: true,
                ChildEntity: [
                  {
                    ID: 'cs_fe5d53df-579f-4098-9e88-2764b8235bec',
                    EntityID: '03738b91-7f3a-4aaa-acc2-a85e376a64dc',
                    Name: 'CFSS_ISP',
                    Mandatory: false,
                    Active: true,
                    ConfiguredValue: [
                      {
                        UseArea: 'User_Specification_Characteristics',
                        CharacteristicID:
                          '439708de-e4f0-4de1-9cda-91e5e522944d',
                        Name: 'User Name',
                        Mandatory: false,
                        Active: false,
                        Value: [
                          {
                            ValueDetail: '439708de-e4f0-4de1-9cda-91e5e522944d',
                            Value: '',
                          },
                        ],
                      },
                      {
                        UseArea: 'User_Specification_Characteristics',
                        CharacteristicID:
                          '2679b39c-a64e-4767-974a-d2af4261d51f',
                        Name: 'Password',
                        Mandatory: false,
                        Active: false,
                        Value: [
                          {
                            ValueDetail: '2679b39c-a64e-4767-974a-d2af4261d51f',
                            Value: '',
                          },
                        ],
                      },
                    ],
                    CharacteristicUse: [
                      {
                        UseArea: 'Order_Time_Characteristics',
                        CharacteristicID:
                          '2f3624fc-7052-4d5d-b30f-edad66e36b4c',
                        Name: 'productPlan',
                        Mandatory: false,
                        Active: false,
                        ValidValues: [
                          {
                            ValueID: '03691246-4385-4bb0-ab29-3869dbc5d2b4',
                            Value: '231',
                            Active: false,
                          },
                          {
                            ValueID: '07df4685-66d8-4a6b-9643-c14763e5e9d0',
                            Value: '706',
                            Active: false,
                          },
                          {
                            ValueID: '0a51a5fc-e6c3-41ce-ac8b-66379b580f2e',
                            Value: '241',
                            Active: false,
                          },
                          {
                            ValueID: '0a704f39-6df3-4a2b-9a34-8c8b215e98c9',
                            Value: '254',
                            Active: false,
                          },
                          {
                            ValueID: '0ad5afcf-df3e-402b-88db-1d5051680999',
                            Value: '115',
                            Active: false,
                          },
                          {
                            ValueID: '0b77c8ff-c4da-4286-8538-b38868e8cd28',
                            Value: '248',
                            Active: false,
                          },
                          {
                            ValueID: '0bb03547-24ff-4568-8626-1bec9c3f2f45',
                            Value: '257',
                            Active: false,
                          },
                          {
                            ValueID: '11ff2500-67f9-4d90-9325-e27d51b3ae76',
                            Value: '223',
                            Active: false,
                          },
                          {
                            ValueID: '14398015-341c-432e-ae5e-45eabcf92956',
                            Value: '644',
                            Active: false,
                          },
                          {
                            ValueID: '160307ff-01d0-4729-b63c-b4c62cf07f5d',
                            Value: '204',
                            Active: false,
                          },
                          {
                            ValueID: '1644dd7a-8b4b-40f9-b445-625746c67bf4',
                            Value: '216',
                            Active: false,
                          },
                          {
                            ValueID: '1fe85169-e474-41f0-95e9-b26a51681794',
                            Value: '217',
                            Active: false,
                          },
                          {
                            ValueID: '201db2b5-954b-4d0f-8f68-74915bf3d4fb',
                            Value: '237',
                            Active: false,
                          },
                          {
                            ValueID: '230960c1-724c-4b2a-ab51-ce8246a6d03a',
                            Value: '276',
                            Active: false,
                          },
                          {
                            ValueID: '263359ea-ef69-4209-9d2b-044fce99289a',
                            Value: '703',
                            Active: false,
                          },
                          {
                            ValueID: '29990810-95a4-4353-aa2b-aba3a1084dbc',
                            Value: '634',
                            Active: false,
                          },
                          {
                            ValueID: '2a474759-5e7e-4557-8cf2-8a79dc0b8b92',
                            Value: '216',
                            Active: false,
                          },
                          {
                            ValueID: '2a529f15-08f6-4ce0-96cb-44e77ceedf65',
                            Value: '710',
                            Active: false,
                          },
                          {
                            ValueID: '2afd979c-3c5a-49ca-83e6-929ef4d018b7',
                            Value: '279',
                            Active: false,
                          },
                          {
                            ValueID: '2e7a843d-1bea-408d-9d45-5aa4c4ffb51c',
                            Value: '701',
                            Active: false,
                          },
                          {
                            ValueID: '3a5cfb56-0355-4e7e-8f82-0eaf461835c9',
                            Value: '711',
                            Active: false,
                          },
                          {
                            ValueID: '3a8f160f-9908-40dc-b608-3325f0e9649d',
                            Value: '264',
                            Active: false,
                          },
                          {
                            ValueID: '3d2eae30-8b8f-41bf-aec9-3312207a5083',
                            Value: '208',
                            Active: false,
                          },
                          {
                            ValueID: '3e7318b5-253f-4e95-8c82-7dec0038d40f',
                            Value: '250',
                            Active: false,
                          },
                          {
                            ValueID: '3f217014-c2e1-4175-bdbe-bb5c019af4e3',
                            Value: '633',
                            Active: false,
                          },
                          {
                            ValueID: '40047ce7-17d9-4fc3-ba50-9c3d3ede12cf',
                            Value: '569',
                            Active: false,
                          },
                          {
                            ValueID: '4081c911-4e98-40c4-976b-efbc64793fff',
                            Value: '369',
                            Active: false,
                          },
                          {
                            ValueID: '423a2cc5-5ad8-4c04-9c14-ba23feb55c46',
                            Value: '224',
                            Active: false,
                          },
                          {
                            ValueID: '45087f94-69e6-41fd-a388-c81def1ef4b4',
                            Value: '174',
                            Active: false,
                          },
                          {
                            ValueID: '450a2463-832c-46a7-b74a-aab2062cf431',
                            Value: '4',
                            Active: false,
                          },
                          {
                            ValueID: '45d506e8-5a33-416b-90d7-31c1816ceed1',
                            Value: '247',
                            Active: false,
                          },
                          {
                            ValueID: '487677b2-6759-44fc-ad21-045879197649',
                            Value: '229',
                            Active: false,
                          },
                          {
                            ValueID: '4ce43100-e771-4ed4-b7c8-9c1e2a792705',
                            Value: '268',
                            Active: false,
                          },
                          {
                            ValueID: '4cf96740-567a-4667-bed4-72a06086e610',
                            Value: '244',
                            Active: false,
                          },
                          {
                            ValueID: '50903564-cd26-4cef-9587-9b77898ba7c9',
                            Value: '646',
                            Active: false,
                          },
                          {
                            ValueID: '50bc3cb5-7195-4d7e-b669-77fc82e22dd3',
                            Value: '210',
                            Active: false,
                          },
                          {
                            ValueID: '58e94624-f2e9-453e-94a9-241085041637',
                            Value: '567',
                            Active: false,
                          },
                          {
                            ValueID: '5b1a25aa-f705-2072-b0f8-3e8c3f3ac99e',
                            Value: '200',
                            Active: false,
                          },
                          {
                            ValueID: '5d03dcd9-0d9d-4816-8449-d01493090bf0',
                            Value: '242',
                            Active: false,
                          },
                          {
                            ValueID: '64255469-a3c1-43a3-a416-67dbaac502f5',
                            Value: '238',
                            Active: false,
                          },
                          {
                            ValueID: '663ba43a-9cd2-4eae-bfbb-e0176ff88130',
                            Value: '570',
                            Active: false,
                          },
                          {
                            ValueID: '6728ce96-b7d2-4282-a7ab-e48aab4900ad',
                            Value: '571',
                            Active: false,
                          },
                          {
                            ValueID: '678f5201-53e7-4408-8bc9-c102150011bc',
                            Value: '240',
                            Active: false,
                          },
                          {
                            ValueID: '69b90a27-a46a-4aeb-8b2d-1d26cda97d8d',
                            Value: '741',
                            Active: false,
                          },
                          {
                            ValueID: '69fbc289-ac0d-4bda-8c83-eb87d7b3ee9a',
                            Value: '8',
                            Active: false,
                          },
                          {
                            ValueID: '6ec41101-8ee4-4238-8778-755d912a56b1',
                            Value: '245',
                            Active: false,
                          },
                          {
                            ValueID: '6ec91d1f-5141-4959-9260-8a77f95838e2',
                            Value: '203',
                            Active: false,
                          },
                          {
                            ValueID: '6f801297-2e96-49ed-8d24-e7e3c38ef452',
                            Value: '211',
                            Active: false,
                          },
                          {
                            ValueID: '709e3bba-a10c-4868-a690-6b1ccdb398bc',
                            Value: '151',
                            Active: false,
                          },
                          {
                            ValueID: '710f5d8c-a349-460a-9837-e6afd2e4bca4',
                            Value: '6',
                            Active: false,
                          },
                          {
                            ValueID: '7229a2de-717a-4385-a1cd-85489188f68a',
                            Value: '574',
                            Active: false,
                          },
                          {
                            ValueID: '73c1ebbd-8f13-4859-9f28-17b530c96ff5',
                            Value: '581',
                            Active: false,
                          },
                          {
                            ValueID: '76440b00-5706-4e00-a328-291c37e39c36',
                            Value: '230',
                            Active: false,
                          },
                          {
                            ValueID: '768501a5-c959-4bdd-970e-226950b482d1',
                            Value: '269',
                            Active: false,
                          },
                          {
                            ValueID: '788b9d20-50f7-4e52-97d4-1d6ce384b503',
                            Value: '249',
                            Active: false,
                          },
                          {
                            ValueID: '78da3c96-6e58-477d-9cdd-7d0bb52e5327',
                            Value: '235',
                            Active: false,
                          },
                          {
                            ValueID: '79038098-4ddb-4c0a-9bfc-faa5e281adce',
                            Value: '645',
                            Active: false,
                          },
                          {
                            ValueID: '7a6bd3c2-f811-41d0-83d2-9c7ef6b04eb5',
                            Value: '575',
                            Active: false,
                          },
                          {
                            ValueID: '7a78eb37-d92d-46f7-a06e-137c7837f8e3',
                            Value: '278',
                            Active: false,
                          },
                          {
                            ValueID: '7cbc110c-12ba-4d05-a680-4a1c353dde15',
                            Value: '643',
                            Active: false,
                          },
                          {
                            ValueID: '7d752ab8-ca20-4d0e-a4c4-ec98e69957c3',
                            Value: '578',
                            Active: false,
                          },
                          {
                            ValueID: '81c6f514-7dba-4381-ad53-382bb514c2d5',
                            Value: '640',
                            Active: false,
                          },
                          {
                            ValueID: '87f6c71d-db4d-4e19-b1dc-ee6d15c4b4e5',
                            Value: '565',
                            Active: false,
                          },
                          {
                            ValueID: '88823d35-3c36-4df6-ad15-383b246096d4',
                            Value: '708',
                            Active: false,
                          },
                          {
                            ValueID: '89384c6f-9cbc-4e6c-a566-cfdc301e402a',
                            Value: '251',
                            Active: false,
                          },
                          {
                            ValueID: '8b318963-37e4-46be-8909-c4bf3c975cf6',
                            Value: '566',
                            Active: false,
                          },
                          {
                            ValueID: '90e6f2e1-16e3-42de-a446-6c0f35c90e0b',
                            Value: '104',
                            Active: false,
                          },
                          {
                            ValueID: '96875c23-e03c-4e0a-895b-826e959f2b78',
                            Value: '637',
                            Active: false,
                          },
                          {
                            ValueID: '97b4e77e-39f2-4702-ba61-842b5bd58487',
                            Value: '648',
                            Active: false,
                          },
                          {
                            ValueID: '9b2e1216-921c-4326-8651-170619b23480',
                            Value: '255',
                            Active: false,
                          },
                          {
                            ValueID: '9bcfeeee-2db8-48ba-bbe4-c75dd8cc202e',
                            Value: '573',
                            Active: false,
                          },
                          {
                            ValueID: '9bf3d0e0-8708-46c4-b18a-7d9117d4ce05',
                            Value: '367',
                            Active: false,
                          },
                          {
                            ValueID: '9bfb3522-6c38-4235-9e43-b518cb8695e7',
                            Value: '704',
                            Active: false,
                          },
                          {
                            ValueID: 'a0500d02-bdbf-449d-8cb9-f58ea28ef515',
                            Value: '218',
                            Active: false,
                          },
                          {
                            ValueID: 'a4ad0dcb-c790-49dd-8d36-e361d318a636',
                            Value: '568',
                            Active: false,
                          },
                          {
                            ValueID: 'a5c5794e-58be-43f6-9b1e-7d399e06d5fe',
                            Value: '641',
                            Active: false,
                          },
                          {
                            ValueID: 'a65b8a1c-3d8f-e473-5dbe-5abea50c0e5c',
                            Value: '367',
                            Active: false,
                          },
                          {
                            ValueID: 'ad08dd75-773c-469d-8d3f-d58c373912f8',
                            Value: '368',
                            Active: false,
                          },
                          {
                            ValueID: 'ae938a4f-b0d5-4f9a-bf20-4dbc58826ddc',
                            Value: '742',
                            Active: false,
                          },
                          {
                            ValueID: 'aea8bd53-9cb1-4312-9782-a4358bfa6827',
                            Value: '523',
                            Active: true,
                          },
                          {
                            ValueID: 'af8717ab-e161-402f-ad67-d2d25531afae',
                            Value: '579',
                            Active: false,
                          },
                          {
                            ValueID: 'b253b493-91b2-4c02-b068-da1fd0ba638d',
                            Value: '256',
                            Active: false,
                          },
                          {
                            ValueID: 'b3bf8f18-5bf3-4fd1-a1c2-ff7e77ebb9b1',
                            Value: '246',
                            Active: false,
                          },
                          {
                            ValueID: 'b44f5512-2319-4eb3-9e36-c777bb5d5ad2',
                            Value: '635',
                            Active: false,
                          },
                          {
                            ValueID: 'b912c931-6638-4adc-aa34-d4cf5112042b',
                            Value: '580',
                            Active: false,
                          },
                          {
                            ValueID: 'b9b75833-bbf1-4ee9-8066-b08539a90a61',
                            Value: '236',
                            Active: false,
                          },
                          {
                            ValueID: 'b9c5c28a-3a89-4a4c-9174-9d65596e8997',
                            Value: '252',
                            Active: false,
                          },
                          {
                            ValueID: 'bab4725c-8905-4384-b0ee-e46049c0b16c',
                            Value: '225',
                            Active: false,
                          },
                          {
                            ValueID: 'bad43402-40cc-4d8c-8feb-6d3b20d9c760',
                            Value: '52',
                            Active: false,
                          },
                          {
                            ValueID: 'bb8480f0-c6f6-407d-ad37-846820ce8a5d',
                            Value: '233',
                            Active: false,
                          },
                          {
                            ValueID: 'bb9dd95c-c83c-4e44-bf26-6cab985d3ce0',
                            Value: '636',
                            Active: false,
                          },
                          {
                            ValueID: 'bc35f6c3-f60b-4673-1638-89fe0e98ffc4',
                            Value: '201',
                            Active: false,
                          },
                          {
                            ValueID: 'bed30da9-17e7-4be0-8713-cfb77ae10939',
                            Value: '727',
                            Active: false,
                          },
                          {
                            ValueID: 'bf68e50b-5dd7-4739-b065-9bcbbf512ecc',
                            Value: '576',
                            Active: false,
                          },
                          {
                            ValueID: 'c1965c51-20e5-46c3-a802-93d3931a2c4b',
                            Value: '366',
                            Active: false,
                          },
                          {
                            ValueID: 'c1bc5df8-a276-490e-9fd9-bc5041825da5',
                            Value: '214',
                            Active: false,
                          },
                          {
                            ValueID: 'c295d948-2261-468b-bb66-9828b85ce757',
                            Value: '702',
                            Active: false,
                          },
                          {
                            ValueID: 'c2ef0f15-62fa-44f4-b34b-45da3003df64',
                            Value: '743',
                            Active: false,
                          },
                          {
                            ValueID: 'c38b6a87-36f7-430b-aa83-4a98fd16b366',
                            Value: '577',
                            Active: false,
                          },
                          {
                            ValueID: 'c6fb7d46-992e-4aa0-a484-104a5df2448d',
                            Value: '209',
                            Active: false,
                          },
                          {
                            ValueID: 'c75b26fc-5857-4e66-80d0-81563838d61a',
                            Value: '207',
                            Active: false,
                          },
                          {
                            ValueID: 'c7c08541-33a1-471c-b576-665b5150290b',
                            Value: '258',
                            Active: false,
                          },
                          {
                            ValueID: 'c7f799c6-3334-4d9b-adf1-f30977f1ca75',
                            Value: '243',
                            Active: false,
                          },
                          {
                            ValueID: 'c8d9842f-06b1-4790-8c3e-831a23a0f26e',
                            Value: '215',
                            Active: false,
                          },
                          {
                            ValueID: 'c9972847-277f-4331-97f1-dcc4128cb1c5',
                            Value: '234',
                            Active: false,
                          },
                          {
                            ValueID: 'caa7eb49-3c04-4b2c-bc05-3e603c624b2e',
                            Value: '253',
                            Active: false,
                          },
                          {
                            ValueID: 'ccb7d18e-e13a-4981-8067-56e85c921d42',
                            Value: '213',
                            Active: false,
                          },
                          {
                            ValueID: 'cd7c58d1-84f8-4fe0-b580-4d4a8130e6c6',
                            Value: '266',
                            Active: false,
                          },
                          {
                            ValueID: 'd03f58b6-7fad-4385-91a6-58d3f5ad64ea',
                            Value: '642',
                            Active: false,
                          },
                          {
                            ValueID: 'd7b5f84f-6a4c-4ef5-b539-18e40665af9f',
                            Value: '572',
                            Active: false,
                          },
                          {
                            ValueID: 'dbacd26c-2606-4380-9424-58e1940a1311',
                            Value: '206',
                            Active: false,
                          },
                          {
                            ValueID: 'dcfbf219-7486-4f8b-a10a-6f6b263a49f0',
                            Value: '707',
                            Active: false,
                          },
                          {
                            ValueID: 'e0c5610e-0eaf-47c0-b641-61751422c5c9',
                            Value: '700',
                            Active: false,
                          },
                          {
                            ValueID: 'e17f4f3b-d587-4c68-86ca-ca7e9c84f3a2',
                            Value: '564',
                            Active: false,
                          },
                          {
                            ValueID: 'e2b715c6-8cb9-45b3-96df-e086add635eb',
                            Value: '232',
                            Active: false,
                          },
                          {
                            ValueID: 'ebf269f2-a718-4dc0-8ba4-44b3f4e99500',
                            Value: '638',
                            Active: false,
                          },
                          {
                            ValueID: 'eda71775-4691-4083-9df1-c62eb4ccf125',
                            Value: '705',
                            Active: false,
                          },
                          {
                            ValueID: 'f22cbdde-1bed-4276-8645-eb6f180cf4bc',
                            Value: '274',
                            Active: false,
                          },
                          {
                            ValueID: 'f3aad86a-7ffa-42cc-b9ee-e2e51b8ce122',
                            Value: '709',
                            Active: false,
                          },
                          {
                            ValueID: 'f4363534-93a1-4119-9c7d-5262d14901ac',
                            Value: '239',
                            Active: false,
                          },
                          {
                            ValueID: 'f586b542-c0ab-46b6-83d6-8854ec131b67',
                            Value: '564',
                            Active: false,
                          },
                          {
                            ValueID: 'f72bbffa-ea40-4e94-9cb0-77c4e40f0e96',
                            Value: '647',
                            Active: false,
                          },
                          {
                            ValueID: 'f8b21c4a-442e-4f97-9af0-9a941f517932',
                            Value: '639',
                            Active: false,
                          },
                          {
                            ValueID: 'ff3230b3-4e87-430c-a4e4-f1cc0ae3724e',
                            Value: '220',
                            Active: false,
                          },
                        ],
                      },
                    ],
                    minimumActiveChildEntities: '0',
                    maximumActiveChildEntities: '0',
                  },
                  {
                    ID: 'ID_sjybum6ha9',
                    EntityID: 'ee9dee91-8085-4a4c-8d6b-9d64ab76dc45',
                    Name: 'Mail Option',
                    Mandatory: true,
                    minimumActiveChildEntities: '0',
                    maximumActiveChildEntities: '0',
                  },
                ],
                ConfiguredValue: [
                  {
                    UseArea: 'User_Specification_Characteristics',
                    CharacteristicID: 'adcc86b8-4826-4a93-af77-4d9dd1dfbd7d',
                    Name: 'Contact Phone',
                    Mandatory: true,
                    Value: [
                      {
                        ValueDetail: 'adcc86b8-4826-4a93-af77-4d9dd1dfbd7d',
                        Value: '9999999999',
                      },
                    ],
                  },
                  {
                    UseArea: 'User_Specification_Characteristics',
                    CharacteristicID: '439708de-e4f0-4de1-9cda-91e5e522944d',
                    Name: 'User Name',
                    Mandatory: false,
                    Active: false,
                    Value: [
                      {
                        ValueDetail: '439708de-e4f0-4de1-9cda-91e5e522944d',
                        Value: '',
                      },
                    ],
                  },
                  {
                    UseArea: 'User_Specification_Characteristics',
                    CharacteristicID: '90ca58e5-4998-403a-8e96-97d37286499e',
                    Name: 'LocalPart',
                    Mandatory: false,
                    Active: false,
                    Value: [
                      {
                        ValueDetail: '90ca58e5-4998-403a-8e96-97d37286499e',
                        Value: 'in(localpart)',
                      },
                    ],
                  },
                  {
                    UseArea: 'User_Specification_Characteristics',
                    CharacteristicID: '2679b39c-a64e-4767-974a-d2af4261d51f',
                    Name: 'Password',
                    Mandatory: false,
                    Active: false,
                    Value: [
                      {
                        ValueDetail: '2679b39c-a64e-4767-974a-d2af4261d51f',
                        Value: '',
                      },
                    ],
                  },
                ],
                CharacteristicUse: [
                  {
                    UseArea: 'Order_Time_Characteristics',
                    CharacteristicID: '2f3624fc-7052-4d5d-b30f-edad66e36b4c',
                    Name: 'productPlan',
                    Mandatory: true,
                    ValidValues: [
                      {
                        ValueID: 'aea8bd53-9cb1-4312-9782-a4358bfa6827',
                        Value: '523',
                        Active: true,
                      },
                    ],
                  },
                  {
                    UseArea: 'Order_Time_Characteristics',
                    CharacteristicID: 'dc0f0945-4da8-427e-b76f-36e511c10ff9',
                    Name: 'Domain',
                    Mandatory: true,
                    ValidValues: [
                      {
                        ValueID: '90f7953f-adf0-4396-b699-86b31df252a1',
                        Value: 'frontier.com',
                        Active: true,
                      },
                    ],
                  },
                ],
                minimumActiveChildEntities: '1',
                maximumActiveChildEntities: '2',
              },
              {
                ID: 'ID_n322btvq7e',
                EntityID: '6d313c4a-a701-4df1-9553-12927e2a4594',
                Name: 'Fiber SOC / NRC Options',
                Mandatory: true,
                ChildEntity: [
                  {
                    ID: 'ID_ubjjf906bx',
                    EntityID: '4d52ed78-a15e-44d4-a4c9-00d91842ae49',
                    Name: 'Labor 1st 30 Minutes - Jack Install',
                    Mandatory: false,
                    Active: false,
                    Price: [
                      {
                        Name: 'Labor - First 30 Minutes',
                        rateNonRecurring: '35',
                      },
                    ],
                    minimumActiveChildEntities: '0',
                    maximumActiveChildEntities: '0',
                  },
                  {
                    ID: 'ID_pdwjmdu8i8',
                    EntityID: 'cd2e6f9c-1fb4-4733-84de-ae194bf13a4a',
                    Name: 'HSI Installation Types Options',
                    Mandatory: true,
                    minimumActiveChildEntities: '1',
                    maximumActiveChildEntities: '1',
                    ChildEntity: [
                      {
                        ID: 'ID_2ee3ldb69i',
                        EntityID: '481d3b4f-2c10-4787-9603-94891e58d28d',
                        Name: 'Activation Fee TI',
                        Mandatory: false,
                        Active: true,
                        minimumActiveChildEntities: '0',
                        maximumActiveChildEntities: '0',
                        Price: [{ Name: 'HSI Full Install' }],
                      },
                    ],
                  },
                ],
                minimumActiveChildEntities: '1',
                maximumActiveChildEntities: '2',
              },
            ],
            minimumActiveChildEntities: '3',
            maximumActiveChildEntities: '3',
          },
        ],
        Price: [{ Name: 'MRC - Simplified' }],
        minimumActiveChildEntities: '2',
        maximumActiveChildEntities: '3',
      },
      name: 'FiberOptic Internet 500/500M',
      id: '33f1708e-f493-4e11-95b9-a9335d9c0fe5',
      itemNumber: '0031347',
      created: '2021-05-25T18:02:45.712Z',
      description: '',
      currentValidation: {
        valid: false,
        errors: [
          {
            entityID: 'c75fb0df-6d48-4a06-bb10-3ee47a8d3d28',
            childID: '799aa79f-da6c-4e2d-99f4-4095ba14e267',
            entityUniqueCode: 'ID_dpxuexmjg1',
            errorCode: 'CharacteristicOutOfRange',
            friendlyMessage: '',
            message:
              'The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses',
            name: 'FiberOptic Internet 500/500M',
          },
          {
            entityID: 'a5df8862-e56b-45fa-8575-2db2deecf6b0',
            childID: 'adcc86b8-4826-4a93-af77-4d9dd1dfbd7d',
            entityUniqueCode: 'ID_i0ohiykmzo',
            errorCode: 'CharacteristicOutOfRange',
            friendlyMessage: '',
            message:
              'The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses',
            name: 'Email/ISP',
          },
          {
            entityID: 'cd2e6f9c-1fb4-4733-84de-ae194bf13a4a',
            childID: '106dd5ad-9dd7-4c55-8d98-29196c9b7539',
            entityUniqueCode: 'ID_pdwjmdu8i8',
            errorCode: 'CharacteristicOutOfRange',
            friendlyMessage: '',
            message:
              'The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required characteristic uses or has too many characteristic uses',
            name: 'HSI Installation Types Options',
          },
          {
            entityID: 'cd2e6f9c-1fb4-4733-84de-ae194bf13a4a',
            childID: '',
            entityUniqueCode: 'ID_pdwjmdu8i8',
            errorCode: 'GroupCardinalityNotSatisfied',
            friendlyMessage: '',
            message:
              'The cardinality set on a grouping structure is violated, because the product candidate structure is either missing required child items or has too many child items',
            name: 'HSI Installation Types Options',
          },
        ],
      },
      priceSummary: {
        RecurringCharges: {
          Period: [
            { Name: 'Monthly', MinimumTotal: '59.99', FinalTotal: '59.99' },
          ],
        },
        NonRecurringCharges: { MinimumTotal: '0', FinalTotal: '0' },
      },
    },
  ],
};
