import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { MultiSelectValue } from './MultiSelect';
import {
  useAppActions,
  useInputQuery,
  useSelectedNavigationIndex,
  useSelectedResults,
} from 'store/store';

interface MultiSelectResultProps {
  values: MultiSelectValue[];
}

export const MultiSelectResults = ({ values }: MultiSelectResultProps) => {
  const inputQuery = useInputQuery();
  const selectedResults = useSelectedResults();
  const selectedNavigationIndex = useSelectedNavigationIndex();

  const { setSelectedResults } = useAppActions();

  const handleResultClick = (result: MultiSelectValue) => {
    setSelectedResults(
      selectedResults.find((item) => item.id === result.id)
        ? selectedResults.filter((item) => item.id !== result.id)
        : [...selectedResults, result]
    );
  };

  return (
    <motion.div
      key={'result'}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      className="ring-1 ring-slate-400 rounded-xl bg-neutral-50 overflow-hidden z-10"
    >
      <div className="overflow-y-auto overflow-x-hidden max-h-[360px]">
        <ul id="resultList" className="divide-slate-400 divide-y-[1px]">
          {values.map((result) => {
            const valueParts = result.name
              .split(new RegExp(`(${inputQuery})`, 'i'))
              .filter(Boolean);

            return (
              <li
                key={result.id}
                data-testid={`result-${result.id}`}
                className={cn(
                  'py-3 px-3 cursor-pointer flex items-center gap-2',
                  {
                    'bg-slate-200':
                      selectedNavigationIndex === values.indexOf(result),
                  }
                )}
                onClick={(e) => {
                  if (e.target instanceof HTMLInputElement) return;

                  handleResultClick(result);
                }}
              >
                <input
                  type="checkbox"
                  onChange={() => handleResultClick(result)}
                  checked={
                    selectedResults.find((item) => item.id === result.id)
                      ? true
                      : false
                  }
                  className="rounded"
                />
                <img
                  src={result.image}
                  alt={result.name}
                  className="rounded-lg h-10 w-10"
                />
                <div>
                  <div>
                    {valueParts.map((value, i) => (
                      <span
                        key={value + i}
                        className={cn('text-slate-700', {
                          'font-semibold':
                            value.toLowerCase() === inputQuery.toLowerCase(),
                        })}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-600 text-sm">
                    {result.description}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};
