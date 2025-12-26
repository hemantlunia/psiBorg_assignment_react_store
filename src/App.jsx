import { RouterProvider } from "react-router";
import { Index } from "./routes";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { ErrorFallBack } from "./components/error/ErrorFallBack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  const router = Index();
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<ErrorFallBack />}>
            <RouterProvider router={router} />
          </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}
export default App;
