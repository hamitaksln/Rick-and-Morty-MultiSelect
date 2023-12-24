import { RickAndMortySelection } from '@features/rick-and-morty/components/RickAndMortySelection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-neutral-100 p-8">
        <h1 className="text-4xl font-semibold mb-4">Rick&Morty MultiSelect</h1>
        <RickAndMortySelection />
      </div>
    </QueryClientProvider>
  );
}

export default App;
