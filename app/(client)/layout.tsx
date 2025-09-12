import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import React from "react";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            {children}
            <Footer/>
        </div>
    );
}