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
        className={`w-full min-h-[90rem] pb-6 transition-all ease-in-out duration-300`}
      >
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default MainLayout;
