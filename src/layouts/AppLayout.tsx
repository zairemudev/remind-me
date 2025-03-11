import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { useAppStore } from "../store";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  // {}
  return (
    <div>
      <div
        className={`${
          isDarkMode ? "dark" : ""
        } h-screen w-screen flex flex-col min-w-sm max-w-md mx-auto`}
      >
        {/* header */}
        <Header />
        {/* container */}
        <main className="flex flex-col flex-1 gap-6 px-4 h-full overflow-hidden bg-gray-50 dark:bg-slate-800">
          {children}
        </main>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
