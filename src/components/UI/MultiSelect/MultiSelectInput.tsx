import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { LoadingSpinner } from '../LoadingSpinner';
import { ResizablePanel } from '../ResizablePanel';
import { useRef } from 'react';
import { MultiSelectValue } from './MultiSelect';
import {
  useAppActions,
  useInputQuery,
  useSelectedNavigationIndex,
  useSelectedResults,
  useShowResultContainer,
} from 'store/store';
import { getHotkeyHandler } from '@mantine/hooks';

interface MultiSelectInputProps {
  values: MultiSelectValue[];
  inputPlaceholder?: string;
  isLoading?: boolean;
}

export const MultiSelectInput = ({
  values,
  inputPlaceholder,
  isLoading,
}: MultiSelectInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputQuery = useInputQuery();
  const selectedNavigationIndex = useSelectedNavigationIndex();
  const showResultContainer = useShowResultContainer();
  const selectedResults = useSelectedResults();

  const {
    setInputQuery,
    setSelectedNavigationIndex,
    setShowResultContainer,
    setSelectedResults,
  } = useAppActions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowResultContainer(e.target.value.length > 0);

    setInputQuery(e.target.value);
  };

  const handleInputKeyDown = getHotkeyHandler([
    [
      'ArrowDown',
      () => {
        if (!showResultContainer) {
          setShowResultContainer(true);
        }

        const nextIndex =
          selectedNavigationIndex + 1 === values.length
            ? 0
            : selectedNavigationIndex + 1;

        const element = document.querySelector(
          `#resultList li:nth-child(${nextIndex + 1})`
        );

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }

        setSelectedNavigationIndex(nextIndex);
      },
    ],
    [
      'ArrowUp',
      () => {
        const nextIndex =
          selectedNavigationIndex - 1 === -1
            ? values.length - 1
            : selectedNavigationIndex - 1;

        const element = document.querySelector(
          `#resultList li:nth-child(${nextIndex + 1})`
        );

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }

        setSelectedNavigationIndex(nextIndex);
      },
    ],
    ['escape', () => setShowResultContainer(false)],
    [
      'enter',
      () => {
        const currentSelectedResult = values[selectedNavigationIndex];
        if (!currentSelectedResult) return;

        setSelectedResults(
          selectedResults.find((item) => item.id === currentSelectedResult.id)
            ? selectedResults.filter(
                (item) => item.id !== currentSelectedResult.id
              )
            : [...selectedResults, currentSelectedResult]
        );
      },
    ],
  ]);

  return (
    <motion.div
      key="input"
      className={cn(
        'relative rounded-2xl p-3 text-slate-900 shadow-lg ring-1 ring-inset ring-slate-400 z-[1] bg-neutral-50 overflow-hidden',
        'focus-within:ring-inset focus-within:ring-slate-500'
      )}
      onClick={() => {
        if (document.activeElement === inputRef.current) return;

        inputRef.current?.focus();
        setShowResultContainer(true);
      }}
    >
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 w-full">
              {selectedResults.map((result) => {
                return (
                  <div className="bg-slate-200 px-2 py-1 text-slate-600 rounded-lg flex items-center gap-1">
                    <span>{result.name}</span>
                    <button
                      className="flex justify-center items-center bg-slate-400 text-slate-50 rounded size-5"
                      onClick={() =>
                        setSelectedResults(
                          selectedResults.filter(
                            (item) => item.id !== result.id
                          )
                        )
                      }
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              <input
                ref={inputRef}
                value={inputQuery}
                onFocus={() => setShowResultContainer(true)}
                onChange={handleInputChange}
                type="text"
                placeholder={inputPlaceholder ?? ''}
                className="border-none bg-transparent focus-within:ring-0 py-0 px-0 placeholder:text-slate-400 relative font-semibold flex-1"
                onKeyDown={handleInputKeyDown}
              />
            </div>
            {isLoading ? (
              <LoadingSpinner className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </AnimatePresence>
      </ResizablePanel>
    </motion.div>
  );
};
