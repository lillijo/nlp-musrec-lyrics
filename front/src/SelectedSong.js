import React from "react";
import {
  SelectedSongWrapper,
  Button,
  Line,
  LineTitle,
  YoutubeLink,
} from "./styles";

const SelectedSong = ({
  selected,
  findMostSimilar,
  resetSelection,
  openYoutubeLink,
}) => {
  return (
    <SelectedSongWrapper>
      <Button onClick={() => resetSelection()}>back to results</Button>
      <Line>
        <LineTitle>Song Title</LineTitle>
        {selected.title}
        <YoutubeLink onClick={() => openYoutubeLink()}>
        youtube</YoutubeLink>
      </Line>
      <Line>
        <LineTitle>Artist Name</LineTitle>
        {selected.artist}
      </Line>
      <Line>
        <LineTitle>Genre</LineTitle>
        {selected.genre !== "Music" ? selected.genre : "?"}
      </Line>
      <Line>
        <LineTitle>Song ID</LineTitle>
        {selected.music_id}
      </Line>
      <Button onClick={() => findMostSimilar()}>recommend similar songs</Button>
    </SelectedSongWrapper>
  );
};

export default SelectedSong;
