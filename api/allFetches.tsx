import axios from "axios";

export async function getNowPlaying() {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=6f687067231f0a6ceb9c0cae600a334c"
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
