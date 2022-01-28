import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { ErrorBoundary } from "@/utils/ErrorBoundary";
import { Notifications } from "@/components/Notifications";
import { FullLoading } from "@/components/Loading";
import ErrorFallback from "@/components/ErrorFallback";
import { AppRoutes } from "@/routes";

const App = () => {
  return (
    <Provider store={store}>
      <React.Suspense fallback={<FullLoading loading />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Notifications />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ErrorBoundary>
      </React.Suspense>
    </Provider>
  );
};

export default App;
