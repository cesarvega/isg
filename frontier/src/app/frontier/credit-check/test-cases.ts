import { creditCheckInterface } from '../services/interfaces/customer/credit-check-form';


export const creditCheckTestCases: creditCheckInterface[] = [
  {
    alias: "WILLIAM Credit A",
    identityForm: {
      ssn: "666363985",
      dateOfBirth: "01/13/1952",
    },
    accountForm: {
      firstName: "WILLIAM",
      lastName: "SKNNKSRXZ",
      email: "jane@msn.com",
      phoneNumber: "3195553434"
    }

  },
  {
    alias: "Arlene Berrone",
    identityForm: {
      ssn: "666397620",
      dateOfBirth: "08/29/1974",
    },
    accountForm: {
      firstName: "Arlene",
      lastName: "Berrones",
      email: "jane@msn.com",
      phoneNumber: "3195553434"
    }

  },
  {
    alias: 'P Credit Score - SUKARI DCMMLKSP',
    identityForm: {
      ssn: "666252250",
      dateOfBirth: "09/28/1985",
    },
    accountForm: {
      firstName: "SUKARI",
      lastName: "DCMMLKSP",
      email: "jane@msn.com",
      phoneNumber: "3195553434"
    }

  },
  {
    alias: 'P Credit Score - KARYN QGRKPGK',
    identityForm: {
      ssn: "666728310",
      dateOfBirth: "02/04/1973",
    },
    accountForm: {
      firstName: "KARYN",
      lastName: "QGRKPGK",
      email: "jane@msn.com",
      phoneNumber: "3195553434"
    },
  }, {
    alias: 'P Credit Score - DONALD EDGAR',
    identityForm: {
      ssn: "666553607",
      dateOfBirth: "03/19/1966",
    },
    accountForm: {
      firstName: "DONALD",
      lastName: "EDGAR",
      email: "jane@msn.com",
      phoneNumber: "3195553434"
    },
  }
]


