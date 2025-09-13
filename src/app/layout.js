import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "فروشگاه اینترنتی قهوه",
  description: "next coffee project",
  icons: {
    icon: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0ce5270f-1299-4c69-b907-d60cfff514d9.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
