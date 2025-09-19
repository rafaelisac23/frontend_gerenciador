"use client";
import { Toaster } from "react-hot-toast";
import { LoadingScreen } from "@/components/loadingScreen/loadingScreen";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const toasterStyle = { background: "red", color: "white" };
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LoadingScreen />
      <Component {...pageProps} />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: toasterStyle,
        }}
      />
    </AuthProvider>
  );
}
