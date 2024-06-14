import React from "react";

type Props = {};
import { GrFormNextLink } from "react-icons/gr";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = async (props: Props) => {
  return (
    <div className="w-full m-4 px-6 py-4 ">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Cashflow Logo</div>
        <ul className="flex items-center gap-12 font-bold">
          <div className="flex flex-row gap-6">
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/updates">Updates</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
          </div>
          <Link
            href="/get-started"
            className="px-4 py-2 button-gradient from-brand-200 to-blue-400 bg-gradient-to-tr text-white rounded-full cursor-pointer flex flex-row gap-1 items-center justify-center"
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
