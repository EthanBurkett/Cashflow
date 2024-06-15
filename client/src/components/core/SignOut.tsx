"use client";
import { useClerk } from "@clerk/nextjs";
import React from "react";

type Props = {};

const SignOut = (props: Props) => {
  const { signOut } = useClerk();
  return (
    <div
      onClick={async () => await signOut()}
      className="cursor-pointer text-light-700 transition-all from-brand-200 to-blue-400 bg-gradient-to-tr bg-clip-text hover:text-transparent"
    >
      Logout
    </div>
  );
};

export default SignOut;
