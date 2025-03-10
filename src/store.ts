import { create } from "zustand";
import { Goal } from "./types";
import { useLocalStorage } from "./useLocalStorage";

type State = {
  isDarkMode: boolean;
  goals: Goal[];
};

type Actions = {
  getTotalGoal: () => number;
  getCheckedGoal: () => number;
  setGoals: (goals: Goal[]) => void;
  toggleDarkMode: () => void;
  addGoal: (goals: Goal) => void;
  checkGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  reset: () => void;
  loadGoals: () => void;
};

// define the initial state
const initialState: State = {
  isDarkMode: false,
  goals: [],
};

export const useAppStore = create<State & Actions>((set, get) => ({
  ...initialState,
  getTotalGoal: () => get().goals.length || 0,
  getCheckedGoal: () => get().goals.filter((goal) => goal.isDone).length || 0,
  setGoals: (goals: Goal[]) => set((state) => ({ ...state, goals: goals })),
  toggleDarkMode: () =>
    set((state) => ({ ...state, isDarkMode: !state.isDarkMode })),
  addGoal: (goal: Goal) =>
    set((state) => {
      const { setItem } = useLocalStorage("goals");
      let tempGoals = state.goals;
      tempGoals.push(goal);

      setItem(tempGoals);
      return { ...state, goals: tempGoals };
    }),
  checkGoal: (id: string) =>
    set((state) => {
      const { setItem } = useLocalStorage("goals");
      let tempGoals = [...state.goals];
      let goalIdx = state.goals.findIndex((goal: Goal) => goal.id === id);

      if (goalIdx > -1) {
        let currGoal = tempGoals[goalIdx];

        currGoal.isDone = !currGoal.isDone;

        tempGoals.splice(goalIdx, 1, currGoal);

        setItem(tempGoals);
        return { ...state, goals: tempGoals };
      }
    }),
  deleteGoal: (id: string) =>
    set((state) => {
      const { setItem } = useLocalStorage("goals");
      let tempGoals = state.goals.filter((goal: Goal) => goal.id !== id);

      setItem(tempGoals);
      return { ...state, goals: tempGoals };
    }),
  reset: () => {
    set(initialState);
  },
  loadGoals: () =>
    set((state) => {
      const { getItem } = useLocalStorage("goals");
      let tempGoals = getItem();

      return { ...state, goals: tempGoals || [] };
    }),
}));
