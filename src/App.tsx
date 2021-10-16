import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@/common/react-query";
import { ErrorBoundary } from "@/common/ErrorBoundary";
import { AppRoutes } from "@/routes";
import { __TEST__ } from "@/config";
import { Notifications } from "@/components/Notifications";
import { FullLoading } from "@/components/Loading";
import ErrorFallback from "@/components/ErrorFallback";

const App = () => {
  return (
    <React.Suspense fallback={<FullLoading loading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {!__TEST__ && <ReactQueryDevtools position={"bottom-right"} />}
          <Notifications />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;
