import React, { useState } from "react";
import styled from "styled-components";
import data from "../data/data.json";
import AllMovies from "./AllMovies";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState<Movie[]>([]);

  const handleSearch = () => {
    // Perform the search logic here
    const filteredItems = data.filter((item) =>
      searchTerm
        ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

    // Update the search results state
    setSearchItems(filteredItems as Movie[]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Call the search function when Enter key is pressed
      handleSearch();
    }
  };

  return (
    <Main>
      <Searchs>
        <Input
          placeholder="Search for movies or TV series"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Searchs>
      <P>
        {searchItems.length !== 0
          ? `Found ${searchItems.length} result${
              searchItems.length !== 1 ? "s" : ""
            } for "${searchTerm}"`
          : null}
      </P>
      <ContSearch>
        {searchItems.map((movie, index) => {
          return <AllMovies key={index} movie={movie} />;
        })}
      </ContSearch>
    </Main>
  );
}

const breakpoints = {
  tablet: "768px",
  large: "1440px",
};
const P = styled.p`
  margin-top: 1.5rem;
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
const Main = styled.div`
  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 1rem;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
`;
const ContSearch = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
const Input = styled.input`
  background-color: rgba(16, 20, 30, 1);
  background-image: url(/assets/icon-search.svg);
  background-repeat: no-repeat;
  background-position: left;
  width: 100%;
  border-style: hidden;
  text-align: left;
  padding-left: 5rem;

  color: var(--Pure-White, #fff);
  font-family: "Outfit";
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 2.4rem;
  }
`;
const Searchs = styled.div`
  height: 2.4rem;
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 2.4rem;
  }
`;
