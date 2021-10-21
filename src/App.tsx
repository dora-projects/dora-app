import * as React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/common/ErrorBoundary";
import { AppRoutes } from "@/routes";
import { Notifications } from "@/components/Notifications";
import { FullLoading } from "@/components/Loading";
import ErrorFallback from "@/components/ErrorFallback";

const App = () => {
  return (
    <React.Suspense fallback={<FullLoading loading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Notifications />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;
