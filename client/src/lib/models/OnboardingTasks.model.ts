import mongoose, { Schema, model } from "mongoose";

export interface IOnboardingTask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
export interface IOnboardingTasks {
  tasks: IOnboardingTask[];
  _id: string;
  userCompleted: boolean;
}

const OnboardingTaskSchema = new Schema<IOnboardingTasks>(
  {
    _id: {
      type: String,
      required: true,
    },
    tasks: [
      {
        id: Number,
        title: String,
        description: String,
        completed: Boolean,
      },
    ],
    userCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

export default (mongoose.models
  .OnboardingTasks as mongoose.Model<IOnboardingTasks>) ||
  model<IOnboardingTasks>("OnboardingTasks", OnboardingTaskSchema);
