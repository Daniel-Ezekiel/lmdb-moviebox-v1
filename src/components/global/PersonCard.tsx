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

  return (
    <div
      key={person.id}
      className='shadow-lg rounded-xl border border-gray-200 overflow-hidden sm:min-w-[20rem]'
    >
      <Link
        to={`/person/${person.original_name
          .toLowerCase()
          .split(" ")
          .join("-")}-${person.id}`}
      >
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : "/movie-poster-placeholder.svg"
          }
          alt={person.original_name}
          className={`h-[20rem] w-full ${
            person.profile_path ? "object-top" : "object-center"
          } object-cover`}
        />
      </Link>
      <div className='p-2 text-base'>
        <Link
          to={`/person/${person.original_name
            .toLowerCase()
            .split(" ")
            .join("-")}-${person.id}`}
        >
          <h3 className='font-semibold'>{person.original_name}</h3>
          {knownFor}
        </Link>
      </div>
    </div>
  );
};

export default PersonCard;
