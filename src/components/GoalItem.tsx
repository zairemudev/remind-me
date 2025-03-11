// import { useAppStore } from "../store";
import { Trash2, Check } from "lucide-react";
import { Goal } from "../types";
import { useAppStore } from "../store";

type GoalItemProps = {
  data: Goal;
};

const GoalItem = ({ data }: GoalItemProps) => {
  // global state
  const { checkGoal, deleteGoal } = useAppStore();

  const handleDeleteGoal = (id: string) => {
    try {
      deleteGoal(id);
    } catch (error) {}
  };

  const handleCheckGoal = (id: string) => {
    try {
      checkGoal(id);
    } catch (error) {}
  };
  return (
    <div className="relative p-4 flex items-center justify-between gap-2 border-2 border-black bg-white rounded-2xl text-black">
      <button
        className={`cursor-pointer rounded-full border-2 p-1 flex-none w-8 h-8 flex items-center justify-center ${
          data.isDone ? "border" : "border-dashed border-black"
        } dark:border-slate-500`}
        onClick={() => handleCheckGoal(data.id)}
      >
        {data.isDone && (
          <Check strokeWidth={4} size={18} className="text-green-600" />
        )}
      </button>

      <div
        className={`${
          data.isDone ? "italic line-through" : "not-italic"
        } flex-1`}
      >
        {data.name}
      </div>

      <button className="cursor-pointer flex items-center justify-center flex-none p-1 w-6 h-6 rounded-full bg-black dark:bg-slate-600">
        <Trash2
          className="text-white"
          size="14"
          onClick={() => handleDeleteGoal(data.id)}
        />
      </button>
    </div>
  );
};

export default GoalItem;
