import Link from "next/link";

export const metadata = {
    title: "Home"
}

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
}


export default async function HomePage() {
    const movies = await getMovies();
    return <div>
        {movies.map((movie: { id: number; title: string }) => (
    <li key={movie.id}>
        <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
    </li>))})
    </div>;
}