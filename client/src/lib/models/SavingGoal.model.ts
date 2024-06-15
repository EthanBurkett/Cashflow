import mongoose, { Schema, model } from "mongoose";

export interface IGoal {
  name: string;
  amount: number;
  _id: string;
  goalDate: Date;
}

export interface IGoals {
  goals: IGoal[];
  _id: string;
}

const BudgetSchema = new Schema<IGoals>(
  {
    _id: {
      type: String,
      required: true,
    },
    goals: {
      default: [],
      type: [
        {
          name: String,
          amount: Number,
          goalDate: Date,
        },
      ],
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: true,
  }
);

export default (mongoose.models.SavingGoals as mongoose.Model<IGoals>) ||
  model<IGoals>("SavingGoals", BudgetSchema);
