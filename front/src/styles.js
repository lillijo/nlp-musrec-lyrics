import styled from "styled-components";

export const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 50%;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 10px 10px 0px;
  background: linear-gradient(0deg, #ccffcc, white);
  border: 2px solid #00ff00;
  flex-grow: 1;
  :focus {
    outline: none !important;
    box-shadow: none;
  }
`;

export const Button = styled.button`
  padding: 10px;
  margin: 10px 0px 10px 0px;
  background: linear-gradient(180deg, #00ff00, white);
  border: 2px solid #00ff00;
  font-weight: 500;
  cursor: pointer;
  :hover {
    background: linear-gradient(180deg, white, #00ff00);
  }
`;

export const ListItem = styled.div`
  cursor: pointer;
  :hover {
    background: #00ff00;
  }
  padding: 5px;
  margin: 3px;
`;

export const Ellipsis = styled.span`
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const List = styled.div`
  overflow: hidden;
  margin: 10px;
  height: 100%;

  & ${ListItem}:nth-child(odd):not(:hover) {
    background: #ffffff;
  }
  & ${ListItem}:nth-child(even):not(:hover) {
    background: #ccffcc;
  }
`;

export const SearchResultWrapper = styled.div`
  background: #99ff99;
  width: 50%;
  height: fit-content;
  max-height: 60%;
  margin: auto;
  overflow: scroll;
  border: 5px solid #99ff99;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 120%;
`;


export const SelectedSongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
`;

export const Line = styled.div`
  padding: 10px;
  margin: 10px;
  background: #fff;
  font-size: 140%;
  border: 2px solid #00ff00;
`;

export const LineTitle = styled.div`
  font-size: 12px;
`;

export const YoutubeLink = styled.div`
  color: #00ff00;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    color: #000;
  }
`;