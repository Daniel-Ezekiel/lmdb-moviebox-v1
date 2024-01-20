import { Link } from "react-router-dom";
import { CastMemberProps } from "../../../@types";
import FavButton from "./FavButton";

const CastMemberCard = ({ castMember }: { castMember: CastMemberProps }) => {
  return (
    <div
      key={castMember.id}
      className='min-w-[15rem] relative shadow-lg rounded-xl border border-gray-200 overflow-hidden'
    >
      <Link
        to={`/person/${castMember.original_name
          .toLowerCase()
          .split(" ")
          .join("-")}-${castMember.id}`}
      >
        <img
          src={
            castMember.profile_path
              ? `https://image.tmdb.org/t/p/w500/${castMember.profile_path}`
              : "/movie-poster-placeholder.svg"
          }
          alt={castMember.original_name}
          className={`h-[20rem] w-full ${
            castMember.profile_path ? "object-top" : "object-center"
          } object-cover`}
        />
      </Link>
      <div className='p-2 text-base'>
        <Link
          to={`/person/${castMember.original_name
            .toLowerCase()
            .split(" ")
            .join("-")}-${castMember.id}`}
        >
          <h3 className='font-semibold text-rose'>
            {castMember.original_name}
          </h3>
          <span className='text-sm text-blue-100'>{castMember.character}</span>
          {castMember.job ? (
            <span className='text-sm text-blue-100'>{castMember.job}</span>
          ) : (
            ""
          )}
        </Link>
      </div>
      <div
        className='w-fit absolute top-2 right-[0.8rem] bg-white p-[0.3rem] rounded-full opacity-30 hover:opacity-95 transition-opacity ease-in-out duration-300'
        title='Add to favorites'
      >
        <FavButton
          id={castMember.id}
          type='person'
          poster_path={castMember.profile_path}
          name={castMember.original_name}
          date={null}
          known_for={null}
          // rating={null}
        />
      </div>
    </div>
  );
};

export default CastMemberCard;
