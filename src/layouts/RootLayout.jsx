import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh p-5">{children}</main>
      <Footer />
    </>
  );
}
