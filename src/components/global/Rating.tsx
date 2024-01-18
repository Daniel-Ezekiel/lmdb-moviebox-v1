const Rating = ({
  rating,
  classNames,
}: {
  rating: number;
  classNames: string;
}) => {
  return (
    <span
      className={`absolute -bottom-4 right-1/2 translate-x-1/2 w-9 h-9 flex items-center justify-center place-self-center p-2 rounded-full font-semibold text-base text-rose ${classNames}`}
      title='Movie/TV Show Rating'
    >{`${Math.ceil(rating * 10)}%`}</span>
  );
};

export default Rating;
