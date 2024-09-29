import { Inter } from "next/font/google";
import './global.css';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import 'flowbite/dist/flowbite.css'; // Import Flowbite CSS
import { UserProvider } from "./userContext"; // Make sure the import path is correct

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
