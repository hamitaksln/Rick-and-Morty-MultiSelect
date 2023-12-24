import { MultiSelectValue } from '@components/UI/MultiSelect/MultiSelect';
import { create } from 'zustand';

interface AppState {
  inputQuery: string;
  selectedNavigationIndex: number;
  showResultContainer: boolean;
  selectedResults: MultiSelectValue[];
  actions: {
    setInputQuery: (query: string) => void;
    setSelectedNavigationIndex: (index: number) => void;
    setShowResultContainer: (show: boolean) => void;
    setSelectedResults: (results: MultiSelectValue[]) => void;
  };
}

export const useAppStore = create<AppState>()((set) => ({
  inputQuery: '',
  selectedNavigationIndex: -1,
  showResultContainer: false,
  selectedResults: [],
  actions: {
    setInputQuery: (inputQuery) => set({ inputQuery }),
    setSelectedNavigationIndex: (selectedNavigationIndex) =>
      set({ selectedNavigationIndex }),
    setShowResultContainer: (showResultContainer) => {
      if (!showResultContainer) set({ selectedNavigationIndex: -1 });

      set({ showResultContainer });
    },
    setSelectedResults: (selectedResults) => set({ selectedResults }),
  },
}));

export const useInputQuery = () => useAppStore((state) => state.inputQuery);
export const useSelectedNavigationIndex = () =>
  useAppStore((state) => state.selectedNavigationIndex);
export const useShowResultContainer = () =>
  useAppStore((state) => state.showResultContainer);
export const useSelectedResults = () =>
  useAppStore((state) => state.selectedResults);

export const useAppActions = () => useAppStore((state) => state.actions);
