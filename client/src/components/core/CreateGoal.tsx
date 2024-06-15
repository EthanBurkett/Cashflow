import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

type Props = {
  onSubmit: (name: string, amount: number, date: Date) => void | Promise<void>;
};

const CreateGoal = (props: Props) => {
  const [goalName, setGoalName] = React.useState<string>("");
  const [goalAmount, setGoalAmount] = React.useState<string>("0");

  const formatNumber = (num: string) => {
    if (num === "") return "0";
    return parseInt(num.replace(/,/g, "")).toLocaleString();
  };

  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    if (goalName == "" || goalAmount == "0" || !date) setDisabled(true);
    else setDisabled(false);
  }, [goalName, goalAmount, date]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        onChange={(e) => {
          setGoalName(e.target.value);
        }}
        value={goalName}
        placeholder="Savings Goal Name"
        className="text-black"
      />
      <div className="flex flex-row gap-2 justify-center items-center border-[1px] border-neutral-200 pl-2 bg-white outline-2 ring-offset-red-500 ring-offset-4">
        <span className="text-black text-lg">$</span>
        <Input
          placeholder="Goal Amount"
          type="text"
          className="text-black rounded-l-none border-none"
          value={goalAmount}
          onChange={(e) => {
            // dont allow characters but allow to be empty
            if (isNaN(parseInt(e.target.value)) && e.target.value !== "")
              return;
            if (
              parseInt(e.target.value.replace(/,/g, "")) < 0 ||
              parseInt(e.target.value.replace(/,/g, "")) > 1000000000
            )
              return;
            setGoalAmount(formatNumber(e.target.value));
          }}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal text-light-900"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a end-goal date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="flex flex-row gap-2 justify-start items-center">
        <Button
          onClick={() =>
            props.onSubmit(
              goalName,
              parseInt(goalAmount.replace(/,/g, "")),
              date || new Date()
            )
          }
          disabled={disabled}
          className="button-gradient"
        >
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
};

export default CreateGoal;
