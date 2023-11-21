// import { twMerge } from "tailwind-merge";
import { MainLayoutProps } from "../../@types";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

function MainLayout({
  children,
  activePage,
  //   className,
  showFooter,
  showHeader,
}: MainLayoutProps) {
  return (
    <div>
      {showHeader && <Header activePage={activePage} />}

      <main
        className={`w-full min-h-[90rem] transition-all ease-in-out duration-300 ${
          activePage !== "home" && "bg-blue-400 text-white"
        }`}
      >
        {children}
      </main>

      {showFooter && <Footer activePage={activePage} />}
    </div>
  );
}

export default MainLayout;
