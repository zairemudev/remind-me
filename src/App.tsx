import { Check, Plus, Trash2 } from "lucide-react";
import AppLayout from "./layouts/AppLayout";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppStore } from "./store";
import GoalItem from "./components/GoalItem";

function App() {
  // local state
  const [goalInput, setGoalInput] = useState<string>("");

  // global state
  const { goals, getCheckedGoal, getTotalGoal, addGoal, loadGoals } =
    useAppStore();

  // functions
  const handleAddGoal = () => {
    try {
      addGoal({
        id: uuidv4(),
        name: goalInput,
        isDone: false,
      });
    } catch (error) {
    } finally {
      setGoalInput("");
    }
  };

  const handleGoalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalInput(e.target.value);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <AppLayout>
      <div className="w-full py-6 flex flex-col gap-4 overflow-hidden dark:text-white">
        {/* banner */}
        <div className="font-poppins flex flex-col gap-6 w-full mb-6 px-6">
          {/* top */}
          <div className="flex justify-between">
            {/* username */}
            <div className="text-lg">
              Welcome,
              <span className="text-gray-500 dark:text-slate-400 ml-1">
                {"ploy"}
              </span>
            </div>
            {/* count */}
            <div className="flex gap-2 items-center">
              <div className="flex items-center justify-center border-2 border-black dark:border-slate-500 rounded-full w-8 h-8">
                {getCheckedGoal()}
              </div>
              of
              <div>{getTotalGoal()}</div>
            </div>
          </div>
          <div className="text-3xl font-bold">
            New Year Resolusion of 2025 🎉
          </div>
        </div>
        {/* add goal */}
        <div className="flex flex-1 items-center justify-end md:justify-center max-w-md relative px-6">
          <div className="items-center w-full flex border-2 border-black dark:border-slate-500 rounded-2xl p-4 shadow inset-shadow gap-2">
            <input
              type="text"
              className="w-full focus:outline-none flex-1"
              placeholder="Add your goal..."
              onChange={handleGoalInput}
              value={goalInput}
            />
            <button
              className="cursor-pointer rounded-full bg-black dark:bg-slate-600 p-1"
              onClick={handleAddGoal}
            >
              <Plus className="text-white" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-5 px-6 h-full max-w-full">
          {goals.map((goal) => (
            <GoalItem key={goal.id} data={goal} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default App;
