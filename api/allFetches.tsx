import axios from "axios";

// Homepage Requests
export async function getNowPlaying() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPopular(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/popular?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTrending(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTopRated(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUpcoming() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Fetch by URl
export async function getByURL(
  type: string = "movie",
  categoryParam: string | null = "now-playing"
) {
  let url: string;
  // const categoryParam: string = category?.split("-").join("_");
  if (categoryParam === "trending") {
    url = `https://api.themoviedb.org/3/${categoryParam}/${type}/week?api_key=6f687067231f0a6ceb9c0cae600a334c`;
  } else {
    url = `https://api.themoviedb.org/3/${type}/${categoryParam}?api_key=6f687067231f0a6ceb9c0cae600a334c`;
  }

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Fetch Popular people
export async function getPopularPeople() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
