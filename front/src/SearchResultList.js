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
          <a href={`https://www.youtube.com/results?search_query=${item.artist} ${item.title}`}>
            <Ellipsis>{item.title}</Ellipsis>
            </a>
            {" -- "}
            <Ellipsis>{item.artist}</Ellipsis>
          </ListItem>
        ))}
      </List>
    </SearchResultWrapper>
  );
};

export default SearchResultList;
