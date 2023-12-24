import { useClickOutside } from '@mantine/hooks';
import { AnimatePresence } from 'framer-motion';
import { useAppActions, useShowResultContainer } from 'store/store';
import { MultiSelectInput } from './MultiSelectInput';
import { MultiSelectResults } from './MultiSelectResults';

export interface MultiSelectValue {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface MultiSelectProps {
  inputPlaceholder?: string;
  values: MultiSelectValue[];
  isLoading?: boolean;
}

export const Multiselect = ({
  inputPlaceholder,
  values,
  isLoading,
}: MultiSelectProps) => {
  const showResultContainer = useShowResultContainer();
  const { setShowResultContainer } = useAppActions();

  const wrapperRef = useClickOutside(() => {
    setShowResultContainer(false);
  }) as React.RefObject<HTMLDivElement>;

  return (
    <div ref={wrapperRef} className="space-y-2">
      <MultiSelectInput
        values={values}
        inputPlaceholder={inputPlaceholder}
        isLoading={isLoading}
      />

      <AnimatePresence>
        {showResultContainer && values.length > 0 && (
          <MultiSelectResults values={values} />
        )}
      </AnimatePresence>
    </div>
  );
};
