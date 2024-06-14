import React from "react";

type Props = {};
import { GrFormNextLink } from "react-icons/gr";
import { Button } from "../ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import SignOut from "./SignOut";
import { UserButton } from "@clerk/nextjs";

const Navbar = async (props: Props) => {
  const user = await currentUser();
  return (
    <div className="w-full my-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Cashflow Logo
        </Link>
        <ul className="flex items-center gap-12 font-bold justify-center h-full">
          <div className="flex flex-row gap-6">
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/updates">Updates</NavLink>
            {user ? (
              <UserButton
                appearance={{
                  variables: {
                    fontSize: "1rem",
                    fontWeight: {
                      bold: "800",
                      medium: "700",
                    },
                  },
                }}
              />
            ) : (
              <NavLink to="/auth/login">Login</NavLink>
            )}
          </div>
          <Link
            href="/get-started"
            className="px-4 py-2 text-base button-gradient from-brand-200 to-blue-400 bg-gradient-to-tr text-white rounded-full cursor-pointer flex flex-row gap-1 items-center justify-center "
          >
            Get started for free
            <GrFormNextLink className="-rotate-45" size={24} />
          </Link>
        </ul>
      </div>
    </div>
  );
};

const NavLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => (
  <Link
    href={to}
    className="cursor-pointer text-light-700 transition-all from-brand-200 to-blue-400 bg-gradient-to-tr bg-clip-text hover:text-transparent"
  >
    {children}
  </Link>
);

export default Navbar;
