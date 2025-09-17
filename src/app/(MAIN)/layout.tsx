import Footer from "@/components/elements/Footer";
import NavBar from "@/components/elements/NavBar";
import Header from "@/components/pages/Home/Header";
import React from "react";


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
      <>
        {/* Add shared UI here, e.g., a header or sidebar */}
        <main>
          {" "}
          <Header />
          {children}
          <NavBar />
          <Footer />
        </main>
      </>
    );
}