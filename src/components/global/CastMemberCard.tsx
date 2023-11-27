import { Link } from "react-router-dom";
import { CastMemberProps } from "../../../@types";

const CastMemberCard = ({ castMember }: { castMember: CastMemberProps }) => {
  console.log(castMember);

  return (
    <div
      key={castMember.id}
      className='min-w-[15rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden'
    >
      <Link to={`/person/${castMember.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
          alt={castMember.original_name}
          className='max-h-[20rem] w-full object-top object-cover'
        />
      </Link>
      <div className='p-2 text-base'>
        <Link to={`/person/${castMember.id}`}>
          <h3 className='font-semibold text-rose'>
            {castMember.original_name}
          </h3>
          <span className='text-sm text-blue-100'>{castMember.character}</span>
        </Link>
      </div>
    </div>
  );
};

export default CastMemberCard;
