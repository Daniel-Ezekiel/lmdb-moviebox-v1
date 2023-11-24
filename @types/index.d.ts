// export all interfaces and types
declare module "nprogress";

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export interface MainLayoutContextProps {
  activePage?: string;
  setActivePage: (page: string) => void;
}

export interface MovieProps {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  overview: string;
  release_date?: string;
  vote_average: number;
}

export interface TVProps {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name?: string;
  overview: string;
  first_air_date?: string;
  vote_average: number;
}

export interface PersonProps {
  id: number;
  gender: number;
  original_name: string;
  known_for_department: string;
  profile_path: string;
  known_for: MovieProps[] | TVProps[];
}
