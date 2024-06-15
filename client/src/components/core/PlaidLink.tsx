"use client";
import React, { useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "@/actions/plaid";
import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  className?: string;
  userId: string;
  connected: () => void;
};

const PlaidLink = (props: Props) => {
  const [token, setToken] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(props.userId);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [props.userId]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        userId: props.userId,
      });

      await props.connected();
    },
    [props.userId]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      className={props.className}
      onClick={() => open()}
      disabled={!ready}
    >
      Connect Bank
    </Button>
  );
};

export default PlaidLink;
