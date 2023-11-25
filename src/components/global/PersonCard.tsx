import { Link } from "react-router-dom";
import { MovieProps, PersonProps, TVProps } from "../../../@types";
import React from "react";

const PersonCard = ({ person }: { person: PersonProps }) => {
  const knownFor: React.ReactNode[] = person.known_for.map(
    (knownFor, i, arr) => (
      <span key={knownFor.id}>
        {(knownFor as TVProps).name || (knownFor as MovieProps).title}
        {i + 1 !== arr.length && ", "}
      </span>
    )
  );

  console.log(person);

  return (
    <div
      key={person.id}
      className='min-w-[17rem] min-h-[32rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden sm:min-w-[20rem]'
    >
      <Link to={`/person/${person.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={person.original_name}
          className='min-h-[27.8rem] min-w-full object-cover'
        />
      </Link>
      <div className='p-2 text-base'>
        <Link to={`/person/${person.id}`}>
          <h3 className='font-semibold'>{person.original_name}</h3>
          {knownFor}
        </Link>
      </div>
    </div>
  );
};

export default PersonCard;
