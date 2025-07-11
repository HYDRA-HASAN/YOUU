import { create } from "zustand";
import { compliments } from "../compliments";

interface ComplimentsState {
  compliments: string[];
  currentCompliment: string;
  currentIndex: number;
  
  nextCompliment: () => void;
  getRandomCompliment: () => string;
}

export const useCompliments = create<ComplimentsState>((set, get) => ({
  compliments,
  currentCompliment: compliments[0],
  currentIndex: 0,
  
  nextCompliment: () => {
    set((state) => {
      const nextIndex = (state.currentIndex + 1) % compliments.length;
      return {
        currentIndex: nextIndex,
        currentCompliment: compliments[nextIndex]
      };
    });
  },
  
  getRandomCompliment: () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    return compliments[randomIndex];
  }
}));
