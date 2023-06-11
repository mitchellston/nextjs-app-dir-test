import "./globals.css";
import { Inter } from "next/font/google";
import { AudioPlayer } from "~/components/client/audioPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Super cool streaming app",
  description: "A app to play music",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " dark"}>
        <main className="">
          <div className="max-w-[100vw] overflow-auto">
            <AudioPlayer />
          </div>

          {props.children}
        </main>
      </body>
    </html>
  );
}
