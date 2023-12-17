import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import router from "./router";

function App() {
  return (
    <ErrorBoundary FallbackComponent={fallbackRender}>
      <Suspense fallback={<></>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

function fallbackRender({ error }: { error: { message: string } }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default App;
