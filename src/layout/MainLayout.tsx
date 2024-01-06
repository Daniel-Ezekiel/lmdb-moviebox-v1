// import { twMerge } from "tailwind-merge";
import { MainLayoutProps } from "../../@types";
import { LoggedInContext } from "../../context/LoginContext";
import { ModalToggleContext } from "../../context/AuthModalContext";
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
  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(LoggedInContext);
  const { showModal }: { showModal?: boolean } = useContext(ModalToggleContext);

  return (
    <div>
      {showHeader && <Header activePage={activePage} />}

      <main
        className={`w-full min-h-[90rem] pb-6 transition-all ease-in-out duration-300 ${
          (activePage === "sign-in" || activePage === "sign-up") &&
          "min-h-[75rem] flex justify-center items-center"
        }`}
      >
        {children}
      </main>

      {showFooter && <Footer />}

      {!isLoggedIn && showModal && <AuthCheckModal />}
    </div>
  );
}

export default MainLayout;
