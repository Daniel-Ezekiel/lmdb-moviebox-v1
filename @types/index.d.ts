// export all interfaces and types
declare module "nprogress";

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage: string;
  showHeader?: boolean;
  showFooter?: boolean;
  isLoggedIn?: boolean;
}

export interface MainLayoutContextProps {
  activePage?: string;
  setActivePage: (page: string) => void;
}

export interface MovieProps {
  id: number;
  credit_id?: string;
  backdrop_path: string;
  poster_path: string;
  media_type?: string;
  title?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  tagline: string;
  status: string;
  genres: { id: number; name: string };
  runtime: number;
  media_type: string;
  department?: string;
}

export interface TVProps {
  id: number;
  credit_id?: string;
  backdrop_path: string;
  poster_path: string;
  media_type?: string;
  name?: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  media_type: string;
  department?: string;
}

export interface PersonProps {
  id: number;
  gender: number;
  original_name: string;
  known_for_department?: string;
  profile_path: string;
  known_for: MovieProps[] | TVProps[];
  media_type?: string;
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
  job?: string;
}

export interface ToastProps {
  message?: string;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: ToastTheme;
  type?: ToastVariant;
}
