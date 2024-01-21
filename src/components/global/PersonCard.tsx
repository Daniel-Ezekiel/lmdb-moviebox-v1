import { Link } from "react-router-dom";
import { MovieProps, PersonProps, TVProps } from "../../../@types";
import React from "react";
import FavButton from "./FavButton";

const PersonCard = ({ person }: { person: PersonProps }) => {
  const knownFor: React.ReactNode[] = person.known_for?.map(
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
      className='relative min-w-[16.5rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden sm:min-w-[20rem]'
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
          className={`h-[40rem] w-full ${
            person.profile_path ? "object-top" : "object-center"
          } xsm:h-[30rem] object-cover`}
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
      <div
        className='w-fit absolute top-2 right-[0.8rem] bg-white p-[0.3rem] rounded-full opacity-30 hover:opacity-95 transition-opacity ease-in-out duration-300'
        title='Add to favorites'
      >
        <FavButton
          id={person.id}
          type='person'
          poster_path={person.profile_path}
          name={person.original_name}
          date={null}
          // rating={null}
        />
      </div>
    </div>
  );
};

export default PersonCard;
