import { isOnboarded } from "@/actions";
import Navbar from "@/components/core/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { GrFormNextLink } from "react-icons/gr";

export default async function Home() {
  const user = await currentUser();
  const onboarded = (await isOnboarded(user?.id!)) || false;
  return (
    <div className="w-full h-full my-2 flex flex-col justify-center items-center gap-12">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col gap-1 items-center justify-center">
          <h1 className="text-7xl font-black">Say hello to</h1>
          <h1 className="text-9xl font-black from-brand-200  to-blue-400 bg-gradient-to-tr bg-clip-text text-transparent">
            Cashflow.
          </h1>
        </div>
        <div className="w-1/2 text-center text-xl text-light-600">
          <p>
            Cashflow streamlines finances with transaction categorization,
            spending insights, and goal-driven budgeting.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <Link
          href={`${onboarded ? "/dashboard" : "/onboarding"}`}
          className="px-4 py-2 text-xl shadow-xl font-bold button-gradient from-brand-200 to-blue-400 bg-gradient-to-tr text-white rounded-full cursor-pointer flex flex-row gap-1 items-center justify-center"
        >
          Get started for free
          <GrFormNextLink className="-rotate-45" size={24} />
        </Link>
      </div>
    </div>
  );
}
