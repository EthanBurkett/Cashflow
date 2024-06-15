"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
// import { generateEnvTypes } from "../lib/utils";
import OnboardingTasks, { IOnboardingTask } from "@models/OnboardingTasks";

import "@/actions/plaid";
import { revalidatePath } from "next/cache";
import SavingGoal from "@models/SavingGoal";
// import { generateEnvTypes } from "@/lib/utils";

export const ready = async () => {
  // generateEnvTypes();
};

export const setupOnboarding = async (): Promise<{
  success: boolean;
  message?: string;
  tasks?: IOnboardingTask[];
}> => {
  try {
    const userId = auth().userId;
    if (!userId) return { success: false, message: "User not found" };

    const user = await OnboardingTasks.findById(userId);
    if (user?.userCompleted)
      return {
        success: false,
        message: "User has already completed onboarding",
      };

    let tasks = [
      {
        id: 0,
        description: "Link your bank account with Plaid",
        title: "Link Bank Account",
        completed: false,
      },
      {
        id: 1,
        description: "Create your first savings goal to work towards!",
        title: "Create Goal",
        completed: false,
      },
    ];

    const existingTasks = await OnboardingTasks.findOne({
      _id: userId,
    });
    if (existingTasks) tasks = existingTasks.tasks;

    await OnboardingTasks.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        tasks,
      },
      {
        upsert: true,
      }
    );

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: false,
      },
    });

    return {
      success: true,
      tasks,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const completeTask = async (userId: string, taskId: number) => {
  try {
    const tasks = await getTasks(userId);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completed = true;

    await OnboardingTasks.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        tasks,
      }
    );

    revalidatePath("/onboarding");
  } catch (err: any) {
    console.log(err);
  }
};

export const getTasks = async (userId: string): Promise<IOnboardingTask[]> => {
  const tasks = await OnboardingTasks.findById(userId);
  return tasks?.tasks || [];
};

export const completeOnboarding = async (userId: string) => {
  try {
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    const user = await OnboardingTasks.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        userCompleted: true,
      }
    );

    revalidatePath("/onboarding");
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const isOnboarded = async (userId: string) => {
  const user = await OnboardingTasks.findById(userId);
  return user?.userCompleted || false;
};

export const createSavingGoal = async (
  userId: string,
  name: string,
  goal: number,
  date: Date
) => {
  try {
    await SavingGoal.findByIdAndUpdate(
      userId,
      {
        $push: {
          goals: {
            name,
            amount: goal,
            goalDate: date,
          },
        },
      },
      {
        upsert: true,
      }
    );
    return { success: true };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: err.message };
  }
};
