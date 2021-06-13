import React from "react";
import { SearchWrapper, Input, Button } from "./styles";

const SearchInput = ({ search, setSearch, searchSong }) => {
  return (
    <SearchWrapper>
      <Input
        id="searchField"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="button" onClick={() => searchSong()}>
        search
      </Button>
    </SearchWrapper>
  );
};

export default SearchInput;
