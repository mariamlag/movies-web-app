import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AllMovies({ movie }: any) {
  return (
    <Main>
      <ContainerItems>
        <Mark>
          <img
            src={
              movie?.isBookmarked
                ? "/assets/icon-bookmark-full.svg"
                : "/assets/icon-bookmark-empty.svg"
            }
            alt=""
          />
        </Mark>
        <PicturesDiv src={movie?.thumbnail?.regular?.small}></PicturesDiv>

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
    </Main>
  );
}

const breakpoints = {
  tablet: "768px",
  large: "1440px",
};
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
  justify-content: space-around;
  flex-wrap: wrap;
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
