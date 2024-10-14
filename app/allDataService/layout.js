import Navbar from "@/app/component/Navbar";
import { Inter } from "next/font/google";
import BarChart from "./chart";
import PartChart from "./partChart"
import "./layout.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
          {children}
        <div className="chart-container">
          <BarChart/>
          <PartChart/>
          
        </div>
      </body>
    </html>
  );
}
