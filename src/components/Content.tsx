import { useEffect, useState } from "react";

import { GenreResponseProps} from "../@types/index";
import { api } from "../services/api";
import { Header } from "./Header";

import { MovieCard } from "./MovieCard";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps{
  selectedGenreId: number;
}

export function Content({selectedGenreId} : ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps); 

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return(
          <div className="container">
          
          <Header selectedGenre={selectedGenre}/>
          <main>
            <div className="movies-list">
              {movies.map(movie => (
                <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
              ))}
            </div>
          </main>

          
        </div>
  )
}