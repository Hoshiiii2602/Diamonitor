// 1. Import the extendTheme function
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../theme";
import App from "./App";
import { ClinicProvider } from "./Context/SelectedClinic";
import "./index.css";

// Ensure Chakra/Emotion styles override global CSS like Tailwind in production
const emotionCache = createCache({ key: "chakra", prepend: false });

// // Only register service worker in production
// if ("serviceWorker" in navigator && import.meta.env.MODE === "production") {
//   navigator.serviceWorker
//     .register(`https://vmi2087236.contaboserver.net/firebase-messaging-sw.js`)
//     .then((registration) => {
//       console.log("Service Worker registered:", registration);
//     })
//     .catch((err) => {
//       console.error("Service Worker registration failed:", err);
//     });
// }

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 150000,
    },
  },
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/admin">
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <QueryClientProvider client={queryClient}>
            <ClinicProvider>
              <App />
            </ClinicProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);
