"use client";
import { Toaster } from "react-hot-toast";
import { LoadingScreen } from "@/components/loadingScreen/loadingScreen";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // Escolha os pesos que você precisa
});

const toasterStyleError = { background: "red", color: "white" };
const toasterStyleSucess = { background: "green", color: "white" };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LoadingScreen />
      <main className={`${poppins.className}`}>
        <Component {...pageProps} />
      </main>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: toasterStyleError,

          success: {
            style: toasterStyleSucess,
          },
        }}
      />
    </AuthProvider>
  );
}
