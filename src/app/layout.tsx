import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

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
        <div className="flex h-screen">
          <Sidebar />

          <div className="flex-1 ml-64">
            <Header />

            <main className="p-6 mt-16">
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
          </div>
        </div>
      </body>
    </html>
  );
}