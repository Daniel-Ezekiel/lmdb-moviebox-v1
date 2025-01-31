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

  const linksArray = Object.entries(links).filter(
    ([socialName, value]) =>
      value &&
      (socialName === "facebook_id" ||
        socialName === "instagram_id" ||
        socialName === "twitter_id" ||
        socialName === "tiktok_id")
  );

  const socialLinks: React.ReactNode[] = linksArray.map(
    ([socialName, value], i) => (
      <a
        key={i}
        href={`https://${socialName.slice(0, -3)}.com/${
          socialName.includes("tiktok") ? `@${value}` : value
        }`}
        className='hover:animate-bounce'
        target='_blank'
        rel='noreferrer'
      >
        {socialName === "facebook_id" ? (
          <FacebookRounded className='text-rose' sx={{ fontSize: 28 }} />
        ) : socialName === "instagram_id" ? (
          <Instagram className='text-rose' sx={{ fontSize: 28 }} />
        ) : socialName === "twitter_id" ? (
          <Twitter className='text-rose' sx={{ fontSize: 28 }} />
        ) : socialName === "tiktok_id" ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='22'
            width='22'
            viewBox='0 0 448 512'
            fill='#be123c'
          >
            <path d='M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z' />
          </svg>
        ) : null}
      </a>
    )
  );

  return (
    <>
      {!isLoading && !isError && (
        <div className='flex items-center gap-2'>{socialLinks}</div>
      )}
    </>
  );
};

export default Socials;
