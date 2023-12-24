import { Multiselect } from '@components/UI/MultiSelect/MultiSelect';
import { useSearchResults } from '../api/getSearchResults';
import { useEffect, useState } from 'react';
import { useInputQuery } from 'store/store';

const DEBOUNCE_TIME = 300;

export const RickAndMortySelection = () => {
  const inputQuery = useInputQuery();
  const [debouncedQuery, setDebouncedValue] = useState('');

  const searchResultsQuery = useSearchResults(debouncedQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(inputQuery);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timeoutId);
  }, [inputQuery]);

  return (
    <div className="max-w-lg">
      <Multiselect
        inputPlaceholder="Search for a character"
        values={searchResultsQuery.data ?? []}
        isLoading={searchResultsQuery.isFetching}
      />
    </div>
  );
};
