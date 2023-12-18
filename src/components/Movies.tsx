import { useParams } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "./Search";
import Trending from "./Trending";
import { Link } from "react-router-dom";
export default function Movies({ movies, setMovies }: MoviesProps) {
  const { filmnav } = useParams();

  const [filteredData, setFilteredData] = useState<Movie[] | null>(null);
  console.log(filteredData);

  useEffect(() => {
    setFilteredData(() => {
      return filmnav === "bookmark"
        ? movies.filter((item: Movie) => item.isBookmarked)
        : filmnav === "movie"
        ? movies.filter((item: Movie) => item.category === "Movie")
        : filmnav === "tv-series"
        ? movies.filter((item: Movie) => item.category === "TV Series")
        : filmnav === "home"
        ? movies
        : null;
    });
  }, [filmnav, movies]);

  const handleBookmarkToggle = (title: string) => {
    const updatedOriginalMovies = [...movies];
    const movieToUpdate = updatedOriginalMovies.find((m) => m.title === title);

    if (movieToUpdate) {
      movieToUpdate!.isBookmarked = !movieToUpdate?.isBookmarked;
      setMovies(updatedOriginalMovies);

      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(updatedOriginalMovies)
      );
    }
  };

  return (
    <div>
      <Main>
        <Link to="/search" className="link-no-underline">
          <Search></Search>
        </Link>

        {filmnav === "home" && (
          <Trending movies={movies} setMovies={setMovies} />
        )}
        <P>
          {filmnav === "home"
            ? "Recommended for you"
            : filmnav === "movie"
            ? "Movies"
            : filmnav === "tv-series"
            ? "TV Series"
            : filmnav === "bookmark"
            ? "Bookmarked Movies"
            : null}
        </P>
        <Mov>
          {filteredData?.map((movie, index) => {
            return (
              <ContainerItems key={index}>
                <Mark onClick={() => handleBookmarkToggle(movie.title)}>
                  <img
                    src={
                      movie?.isBookmarked
                        ? "/assets/icon-bookmark-full.svg"
                        : "/assets/icon-bookmark-empty.svg"
                    }
                    alt=""
                  />
                </Mark>
                <PicturesDiv
                  src={movie?.thumbnail?.regular?.small}
                ></PicturesDiv>

                <Information>
                  <Year>{movie?.year}</Year>.
                  <Icons
                    src={
                      movie?.category === "Movie"
                        ? "/assets/icon-nav-movies.svg"
                        : "/assets/icon-nav-tv-series.svg"
                    }
                    alt=""
                  />
                  <div>
                    <p>{movie?.category}</p>
                  </div>
                  .<p>{movie?.rating}</p>
                </Information>
                <Title>{movie?.title}</Title>
              </ContainerItems>
            );
          })}
        </Mov>
      </Main>
    </div>
  );
}
const breakpoints = {
  tablet: "768px",
  large: "1440px",
};
const Mov = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    gap: 2rem;
  }
`;
const Icons = styled.img`
  width: 1rem;
  height: 1rem;
  filter: brightness(3);
`;
const Mark = styled.div`
  position: relative;
  text-align: center;
  top: 4rem;
  left: 12.4rem;
  padding: 0.8rem;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 32px;
  opacity: 0.5006;
  background: var(--Dark-Blue, #10141e);
  cursor: pointer;
  @media (min-width: ${breakpoints.tablet}) {
    left: 17.2rem;
    top: 5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    left: 23.2rem;
    top: 5rem;
  }
`;
const Title = styled.h3`
  margin-top: 0.4rem;
  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.8rem;
  }
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;
const Year = styled.p``;
const Information = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: row;
  text-align: left;
  gap: 0.6rem;
  align-items: center;

  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`;
const PicturesDiv = styled.img`
  border-radius: 8px;
  background: lightgray 50% / cover no-repeat;
`;

const ContainerItems = styled.div`
  width: 16.4rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  @media (min-width: ${breakpoints.tablet}) {
    width: 22rem;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 28rem;
  }
`;
const P = styled.p`
  margin-top: 1rem;
  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.312px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 3.2rem;
  }
`;
