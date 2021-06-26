import React, {useState} from "react";
import { SearchWrapper, Input, Button } from "./styles";

const SearchInput = ({ searching, title }) => {

  const [search, setSearch] = useState("");
  return (
    <SearchWrapper>
      <Input
        id="searchField"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="button" onClick={() => searching(search)}>
        {title}
      </Button>
    </SearchWrapper>
  );
};

export default SearchInput;
