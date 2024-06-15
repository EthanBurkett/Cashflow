import {
  Configuration,
  PlaidApi,
  Products,
  PlaidEnvironments,
  CountryCode,
  LinkTokenCreateRequestStatements,
} from "plaid";
import { v4 } from "uuid";
// import { env } from "./utils";
import moment from "moment";

export const Plaid: {
  Products: Products[];
  CountryCodes: CountryCode[];
  RedirectUri: string;
  AccessToken: string | null;
  PublicToken: string | null;
  ItemId: string | null;
  AccountId: string | null;
  PaymentId: string | null;
  AuthorizationId: string | null;
  TransferId: string | null;
} = {
  Products: (process.env.PLAID_PRODUCTS || Products.Transactions).split(
    ","
  ) as Products[],
  CountryCodes: (process.env.PLAID_COUNTRY_CODES || "US").split(
    ","
  ) as CountryCode[],
  RedirectUri: process.env.PLAID_REDIRECT_URI!,
  AccessToken: null,
  PublicToken: null,
  ItemId: null,
  AccountId: null,
  PaymentId: null,
  AuthorizationId: null,
  TransferId: null,
};

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV!],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
