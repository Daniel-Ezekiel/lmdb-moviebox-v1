import axios from "axios";

// Homepage Requests
export async function getNowPlaying() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getPopular(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/popular?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getTrending(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getTopRated(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getUpcoming() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

// Fetch by URl
export async function getByURL(
  type: string = "movie",
  categoryParam: string | null = "now-playing",
  { pageParam }: { pageParam: number }
) {
  let url: string;
  // const categoryParam: string = category?.split("-").join("_");
  if (categoryParam === "trending") {
    url = `https://api.themoviedb.org/3/${categoryParam}/${type}/week?page=${pageParam}&api_key=6f687067231f0a6ceb9c0cae600a334c`;
  } else {
    url = `https://api.themoviedb.org/3/${type}/${categoryParam}?page=${pageParam}&api_key=6f687067231f0a6ceb9c0cae600a334c`;
  }

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Fetch Popular people
export async function getPopularPeople({ pageParam }: { pageParam: number }) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/popular?page=${pageParam}&api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get single movie details
export async function getMovieOrTvDetails(
  type: string,
  movieID: number | string
) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movieID}?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get movie credit details
export async function getMovieOrTvCredits(type: string, movieID: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movieID}/credits?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get trailer video
export async function getTrailerVideo(title: string) {
  try {
    const res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?q=${title}+trailer&key=AIzaSyDJ7tq6AzfN5SOm2ZL9Clov3kmdGzq35y4`
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get recommendations
export async function getSimilarRecommendations(type: string, id: number) {
  const url: string = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get Person details
export async function getPersonDetails(id: number) {
  const url: string = `https://api.themoviedb.org/3/person/${id}?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getPersonExternalLinks(id: number) {
  const url: string = `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get person movie credits
export async function getPersonMovieCredits(id: number) {
  const url: string = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get person tv credits
export async function getPersonTvCredits(id: number) {
  const url: string = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get person combined credits
export async function getPersonComboCredits(id: number) {
  const url: string = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}

// Get search results by URL
export async function searchByURL(
  type: string,
  searchTerm: string,
  { pageParam }: { pageParam: number }
) {
  const url: string = `https://api.themoviedb.org/3/search/${type}?page=${pageParam}&api_key=6f687067231f0a6ceb9c0cae600a334c&query=${searchTerm}&include_adult=false`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
}
