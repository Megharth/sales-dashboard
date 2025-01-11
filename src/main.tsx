import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  if (process.env.NODE_ENV === "development") {
    return worker.start();
  } else {
    return worker.start({
      serviceWorker: {
        url: "/sales-dashboard/mockServiceWorker.js",
      },
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
