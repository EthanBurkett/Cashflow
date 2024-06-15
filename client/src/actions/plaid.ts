"use server";
import { Plaid, plaidClient } from "@/lib/plaid";
import { parseStringify } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

export const createLinkToken = async (userId: string) => {
  const user = await clerkClient.users.getUser(userId);
  if (!user) return { success: false, message: "User not found" };

  try {
    const tokenParams = {
      user: {
        client_user_id: userId,
      },
      client_name:
        (user.fullName
          ? user.fullName
          : user.primaryEmailAddress?.emailAddress) || "User",
      products: Plaid.Products,
      language: "en",
      country_codes: Plaid.CountryCodes,
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({
      linkToken: response.data.link_token,
      success: true,
    });
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

export const exchangePublicToken = async ({
  publicToken,
  userId,
}: {
  publicToken: string;
  userId: string;
}): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const { access_token, item_id } = response.data;

    const accountsResponse = await plaidClient.accountsGet({
      access_token,
    });

    const accountData = accountsResponse.data.accounts[0];

    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        plaidAccessToken: access_token,
        plaidItemId: item_id,
        plaidAccountId: accountData.account_id,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const getBankAccounts = async (
  userId: string
): Promise<{
  accounts?: any;
  success: boolean;
  message?: string;
}> => {
  const user = await clerkClient.users.getUser(userId);
  if (!user) return { success: false, message: "User not found" };

  const plaidAccessToken = user.privateMetadata?.plaidAccessToken as string;
  if (!plaidAccessToken)
    return { success: false, message: "Plaid Access Token not found" };

  try {
    const response = await plaidClient.accountsGet({
      access_token: plaidAccessToken,
    });

    return {
      accounts: response.data.accounts,
      success: true,
    };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};
