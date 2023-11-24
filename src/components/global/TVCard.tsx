import { Link } from "react-router-dom";
import { TVProps } from "../../../@types";

const TVCard = ({ tv }: { tv: TVProps }) => {
  const formatDate: (inputDate: string | undefined) => string = (
    inputDate: string | undefined
  ) => {
    const date = new Date(inputDate || "");
    return new Intl.DateTimeFormat("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div
      key={tv.id}
      className='min-w-[18rem] min-h-[32rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden sm:min-w-[20rem]'
    >
      <Link to={`/tv/${tv.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
          alt={tv.name}
          className='min-h-[27.8rem] min-w-full object-cover'
        />
      </Link>
      <div className='p-2 text-base'>
        <Link to={`/tv/${tv.id}`}>
          <h3 className='font-semibold'>{tv.name}</h3>
        </Link>
        <span>{formatDate(tv.first_air_date)}</span>
      </div>
    </div>
  );
};

export default TVCard;
