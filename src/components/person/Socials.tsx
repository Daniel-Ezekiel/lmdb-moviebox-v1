import { FacebookRounded, Instagram, Twitter } from "@mui/icons-material";
import { getPersonExternalLinks } from "../../../api/allFetches";
import { useQuery } from "@tanstack/react-query";

interface ExternalLinksProps {
  id: number;
  imdb_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  tiktok_id: string;
  youtube_id: string;
}

const Socials = ({ personId }: { personId: number }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`${personId}-details`],
    queryFn: () => getPersonExternalLinks(personId),
  });

  const links: ExternalLinksProps = !isLoading && !isError && data;

  return (
    <>
      {!isLoading && !isError && (
        <div className='flex gap-2'>
          <a
            href={`https://facebook.com/${links.facebook_id}`}
            className='hover:animate-bounce'
            target='_blank'
            rel='noreferrer'
          >
            <FacebookRounded className='text-rose' sx={{ fontSize: 28 }} />
          </a>
          <a
            href={`https://instagram.com/${links.instagram_id}`}
            className='hover:animate-bounce'
            target='_blank'
            rel='noreferrer'
          >
            <Instagram className='text-rose' sx={{ fontSize: 28 }} />
          </a>
          <a
            href={`https://twitter.com/${links.twitter_id}`}
            className='hover:animate-bounce'
            target='_blank'
            rel='noreferrer'
          >
            <Twitter className='text-rose' sx={{ fontSize: 28 }} />
          </a>
        </div>
      )}
    </>
  );
};

export default Socials;
