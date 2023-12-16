import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Trending({ movies }: MoviesProps) {
  const trendingItems: Movie[] | null = movies.filter(
    (item: Movie) => item.isTrending
  );
  const { filmnav } = useParams();

  const [filteredData, setFilteredData] = useState<Movie[] | null>(
    filmnav === "bookmark"
      ? trendingItems.filter((item: Movie) => item.isBookmarked)
      : filmnav === "movie"
      ? trendingItems.filter((item: Movie) => item.category === "Movie")
      : filmnav === "tv-series"
      ? trendingItems.filter((item: Movie) => item.category === "TV Series")
      : filmnav === "home"
      ? trendingItems
      : null
  );

  useEffect(() => {
    setFilteredData(() => {
      return filmnav === "bookmark"
        ? trendingItems.filter((item: Movie) => item.isBookmarked)
        : filmnav === "movie"
        ? trendingItems.filter((item: Movie) => item.category === "Movie")
        : filmnav === "tv-series"
        ? trendingItems.filter((item: Movie) => item.category === "TV Series")
        : filmnav === "home"
        ? trendingItems
        : null;
    });
  }, [filmnav, trendingItems]);

  const handleBookmarkToggle = (index: number) => {
    const updateMovies = [...filteredData!];
    updateMovies[index].isBookmarked = !updateMovies[index].isBookmarked;
    setFilteredData(updateMovies);

    const updatedOriginalMovies = [...trendingItems];
    const movieToUpdate = updatedOriginalMovies.find(
      (m) => m.title === updateMovies[index].title
    );

    if (movieToUpdate) {
      movieToUpdate.isBookmarked = updateMovies[index].isBookmarked;

      // Save updated status to localStorage or make an API call to update the server
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(updatedOriginalMovies)
      );
    }
  };
  return (
    <div>
      <P>Trending</P>
      <ContainerForTrend>
        <ItemForTrend>
          {trendingItems?.map((movie, index) => {
            return (
              <ContainerItems key={index}>
                <Mark onClick={() => handleBookmarkToggle(index)}>
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
                  src={movie?.thumbnail?.trending?.small}
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
        </ItemForTrend>
      </ContainerForTrend>
      ;
    </div>
  );
}
const breakpoints = {
  tablet: "768px",
  large: "1440px",
};
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
const ItemForTrend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.6rem;
  overflow-y: scroll;
  @media (min-width: ${breakpoints.tablet}) {
    gap: 4rem;
  }
`;
const ContainerForTrend = styled.div`
  display: flex;
  flex-direction: column;
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
  left: 20rem;
  padding: 0.8rem;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 32px;
  opacity: 0.5006;
  background: var(--Dark-Blue, #10141e);
  cursor: pointer;
  @media (min-width: ${breakpoints.tablet}) {
    top: 5rem;
    left: 39rem;
  }
`;
const Title = styled.h3`
  margin-top: 0.4rem;
  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  position: relative;
  top: -6rem;
  left: 2rem;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 2.4rem;
    top: -8rem;
  }
`;

const Year = styled.p``;
const Information = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: row;
  text-align: left;
  gap: 0.6rem;
  align-items: center;
  position: relative;
  top: -6rem;
  left: 2rem;

  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.5rem;
    top: -8rem;
  }
`;
const PicturesDiv = styled.img`
  border-radius: 8px;
  background: lightgray 50% / cover no-repeat;
`;

const ContainerItems = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  @media (min-width: ${breakpoints.tablet}) {
    width: 45rem;
  }
`;
