// import { twMerge } from "tailwind-merge";
import { MainLayoutProps } from "../../@types";
import { LoggedInContext } from "../../context/LoginContext";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AuthCheckModal from "../components/global/AuthCheckModal";
import { useContext } from "react";

function MainLayout({
  children,
  activePage,
  //   className,
  showFooter,
  showHeader,
}: MainLayoutProps) {
  const isLoggedIn = useContext(LoggedInContext);

  return (
    <div>
      {showHeader && <Header activePage={activePage} />}

      <main
        className={`w-full min-h-[90rem] pb-6 transition-all ease-in-out duration-300`}
      >
        {children}
      </main>

      {showFooter && <Footer />}

      <LoggedInContext.Provider value={false}>
        {isLoggedIn && <AuthCheckModal />}
      </LoggedInContext.Provider>
    </div>
  );
}

export default MainLayout;
