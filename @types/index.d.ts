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
  release_date: string;
  vote_average: number;
  tagline: string;
  status: string;
  genres: { id: number; name: string };
  runtime: number;
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

export interface MovieDetailsProps {
  id: number;
  original_title: string;
  overview: string;
  tagline: string;
  release_date: string;
  runtime: number;
  backdrop_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export interface TVDetailsProps {
  id: number;
  original_title: string;
  overview: string;
  tagline: string;
  release_date: string;
  runtime: number;
  backdrop_path: string;
  vote_average: number;
  genres: [];
}

export interface CastMemberProps {
  id: number;
  cast_id: number;
  credit_id: string;
  name: string;
  original_name: string;
  character: string;
  profile_path: string;
}
