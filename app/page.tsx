import Image from "next/image";
import LoginPage from "./login/page";
import HomePage from "./index";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Add padding at the top to account for the fixed navbar */}
      <div className="pt-20 w-full overflow-hidden inline-block rounded-lg">
      </div>
      <HomePage></HomePage>
    </div>
  );
}