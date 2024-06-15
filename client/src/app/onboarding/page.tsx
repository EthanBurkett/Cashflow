import { setupOnboarding, getTasks } from "@/actions";
import Onboarding from "@/components/core/Onboarding";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  if (!user) return redirect("/auth/login");

  const { tasks } = await setupOnboarding();
  if (!tasks) return redirect("/");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4  flex flex-col gap-6 p-4 bg-neutral-50 shadow-xl rounded-lg">
        <div className="flex-col gap-2 flex justify-center">
          <div className="w-full h-[8px] bg-neutral-300 rounded-full flex flex-row">
            <div
              className="h-full rounded-l-full bg-gradient-to-r from-brand-200 to-blue-400 transition-[width] duration-300"
              style={{
                width: tasks.length
                  ? `${
                      (tasks.filter((task) => task.completed).length /
                        tasks.length) *
                      100
                    }%`
                  : "0%",
                borderTopRightRadius:
                  `${
                    (tasks.filter((task) => task.completed).length /
                      tasks.length) *
                    100
                  }%` == "100%"
                    ? "9999px"
                    : "0px",
                borderBottomRightRadius:
                  `${
                    (tasks.filter((task) => task.completed).length /
                      tasks.length) *
                    100
                  }%` == "100%"
                    ? "9999px"
                    : "0px",
              }}
            ></div>
          </div>

          <Onboarding tasksString={JSON.stringify(tasks)} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default page;
