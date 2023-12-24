import { useQuery } from '@tanstack/react-query';
import { axios } from 'lib/axios';
import { characterSchema } from '../types';
import { z } from 'zod';

export const getSearchResults = async (query: string) => {
  try {
    const data = await axios.get(`/character/?name=${query}`);

    return z.array(characterSchema).parse(data.data.results);
  } catch (error) {
    console.error('No results found');

    return [];
  }
};

export const useSearchResults = (query: string) => {
  return useQuery({
    queryKey: ['searchResults', query],
    queryFn: () => getSearchResults(query),
    select: (data) =>
      data.map((character) => ({
        id: character.id,
        name: character.name,
        image: character.image,
        description: character.episode.length + ' Episodes',
      })),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    retry: false,
    enabled: typeof query === 'string',
  });
};
