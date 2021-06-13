import React from "react";
import { SearchResultWrapper, Title, List, ListItem, Ellipsis } from "./styles";

const SearchResultList = ({ list, selected, select, title }) => {
  if (list.length === 0) {
    return <div>The {title} list is empty</div>;
  }

  return (
    <SearchResultWrapper>
      <Title>{title}</Title>
      <List>
        {list.map((item) => (
          <ListItem
            onClick={() => select(item)}
            selected={item.music_id === selected}
            key={item.music_id}
          >
            <Ellipsis>{item.title}</Ellipsis>
            {" -- "}
            <Ellipsis>{item.artist}</Ellipsis>
          </ListItem>
        ))}
      </List>
    </SearchResultWrapper>
  );
};

export default SearchResultList;
