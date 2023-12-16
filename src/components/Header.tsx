import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
  const navArr = [
    { iconSrc: "/assets/icon-nav-home.svg", endpoint: "/home" },
    { iconSrc: "/assets/icon-nav-movies.svg", endpoint: "/movie" },
    { iconSrc: "/assets/icon-nav-tv-series.svg", endpoint: "/tv-series" },
    { iconSrc: "/assets/icon-nav-bookmark.svg", endpoint: "/bookmark" },
  ];
  return (
    <>
      <Head>
        <Link to="/login" className="link-no-underline">
          <MovieIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="20"
              viewBox="0 0 25 20"
              fill="none"
            >
              <path
                d="M20 0L22.5 5H18.75L16.25 0H13.75L16.25 5H12.5L10 0H7.5L10 5H6.25L3.75 0H2.5C1.11875 0 0.0125 1.11875 0.0125 2.5L0 17.5C0 18.8813 1.11875 20 2.5 20H22.5C23.8813 20 25 18.8813 25 17.5V0H20Z"
                fill="#FC4747"
              />
            </svg>
          </MovieIcon>
        </Link>

        <NavDiv>
          {navArr.map((navObj, index) => (
            <Link to={navObj.endpoint} key={index}>
              <Home src={navObj.iconSrc}></Home>
            </Link>
          ))}
        </NavDiv>

        <Avatar src="/assets/image-avatar.png"></Avatar>
      </Head>
    </>
  );
}

const breakpoints = {
  tablet: "768px",
  large: "1440px",
};
const Avatar = styled.img`
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 24px;
  border: 1px solid var(--Pure-White, #fff);
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  @media (min-width: ${breakpoints.tablet}) {
    width: 3.2rem;
    height: 3.2rem;
  }
  @media (min-width: ${breakpoints.large}) {
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 55.5rem;
  }
`;
const Home = styled.img`
  cursor: pointer;

  &:hover {
    filter: brightness(4);
  }
  @media (min-width: ${breakpoints.tablet}) {
    width: 2rem;
    height: 2rem;
  }
`;
const NavDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  @media (min-width: ${breakpoints.large}) {
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 7.5rem;
  }
`;

const MovieIcon = styled.div`
  cursor: pointer;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 5.4rem;
  @media (min-width: ${breakpoints.tablet}) {
    height: 7.2rem;
    border-radius: 10px;
    background: var(--Semi-Dark-Blue, #161d2f);
    margin-bottom: 3rem;
    padding: 2.4rem;
  }
  @media (min-width: ${breakpoints.large}) {
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background: var(--Semi-Dark-Blue, #161d2f);
    height: fit-content;
    position: fixed;
    padding: 3rem;
    border-radius: 30px;
    left: 3rem;
  }
`;
