"use client";
import { IOnboardingTask } from "@models/OnboardingTasks";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { completeOnboarding, completeTask, createSavingGoal } from "@/actions";
import PlaidLink from "./PlaidLink";
import CreateGoal from "./CreateGoal";

type Props = {
  tasksString: any;
  userId: string;
};

const Onboarding = (props: Props) => {
  const tasks = JSON.parse(props.tasksString) as IOnboardingTask[];
  const router = useRouter();
  const [currentTask, setCurrentTask] = React.useState<IOnboardingTask>(
    tasks.filter((t) => !t.completed)[0] || []
  );

  const updateTaskCompletion = async (refreshPage: boolean) => {
    await completeTask(props.userId, currentTask.id);
    if (refreshPage) window.location.reload();
  };

  return (
    <div className="flex gap-8 flex-col">
      <div className="flex flex-col gap-4 justify-center">
        <h1 className="text-4xl font-black flex flex-row gap-4 items-center">
          Onboarding{" "}
          <a className="text-3xl text-light-600 ">
            {Math.round(
              (tasks.filter((t) => t.completed).length / tasks.length) * 100
            ).toFixed(0)}
            % Done
          </a>
        </h1>
        <p className="text-2xl text-light-700 font-semibold">
          {currentTask.title}
        </p>
        <p className="text-lg text-light-800">{currentTask.description}</p>
      </div>
      <div className="flex flex-row gap-2 text-light-default font-bold">
        {currentTask.id == 0 && (
          <PlaidLink
            userId={props.userId}
            connected={async () => {
              await updateTaskCompletion(true);
              setCurrentTask(tasks.filter((t) => !t.completed)[0] || []);
            }}
            className="button-gradient px-4 py-2 rounded-lg"
          >
            Connect with plaid
          </PlaidLink>
        )}
        {currentTask.id == 1 && (
          <CreateGoal
            onSubmit={async (name: string, amount: number, date: Date) => {
              await completeOnboarding(props.userId);
              setCurrentTask(tasks.filter((t) => !t.completed)[0] || []);
              await updateTaskCompletion(false);
              console.log({
                name,
                amount,
                date,
              });
              await createSavingGoal(props.userId, name, amount, date);

              window.location.href = "/";
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
