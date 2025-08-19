import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Meu Dashboard TailAdmin",
  description: "Dashboard criado com Next.js e TailAdmin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <main className="">
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </main>
        </AuthProvider>

      </body>
    </html>
  );
}