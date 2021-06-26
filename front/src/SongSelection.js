import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import SearchResultList from "./SearchResultList";
import SearchInput from "./SearchInput";
import SelectedSong from "./SelectedSong";
import Navigation from "./Navigation";

const AppWrapper = styled.div`
  background: #ddffdd;
  width: 100vw;
  height: 100vh;
`;

const BASE_URL = "http://localhost:8000/";
const SONGS_URL = `${BASE_URL}songs/`;
const GENRE_URL = `${BASE_URL}genres/`;

const SongSelection = () => {
  const [selected, setSelected] = useState(null);
  const [selection, setSelection] = useState([]);
  const [recommendation, setRecommencation] = useState(null);
  const [navs, setNavs] = useState(null);

  const searchBySong = (search, url = null) => {
    url = url ?? `${SONGS_URL}?limit=10&song_search=${search}`;
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.count) {
          setSelection(res.data.results);
          if (res?.data?.count > 10) {
            setNavs([res.data.previous, res.data.next]);
          }
        } else {
          setSelection([]);
        }
      })
      .catch((err) => setSelection([]));
    resetSelection();
  };


  const searchByArtist = (search, url = null) => {
    url = url ?? `${SONGS_URL}?limit=10&artist_search=${search}`;
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.count) {
          setSelection(res.data.results);
          if (res?.data?.count > 10) {
            setNavs([res.data.previous, res.data.next]);
          }
        } else {
          setSelection([]);
        }
      })
      .catch((err) => setSelection([]));
    resetSelection();
  };


  const searchByWords = (search, url = null) => {
    url = url ?? `${SONGS_URL}?limit=10&real_words=${search}`;
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.count) {
          setSelection(res.data.results);
          if (res?.data?.count > 10) {
            setNavs([res.data.previous, res.data.next]);
          }
        } else {
          setSelection([]);
        }
      })
      .catch((err) => setSelection([]));
    resetSelection();
  };

  const selectSong = (song) => {
    const url = `${GENRE_URL}${song.genre}`;
    axios
      .get(url)
      .then((res) => {
        if (res?.data) {
          const songWithGenre = { ...song, genre: res.data.name };
          setSelected(songWithGenre);
        } else {
          setSelected(song);
        }
      })
      .catch(() => setSelected(song));
  };

  const findMostSimilar = () => {
    const url = `${SONGS_URL}${selected.music_id}/closest`;
    axios.get(url).then((res) => {
      if (res?.data) {
        const similars = res.data.filter((x) => x.title !== selected.title);
        setRecommencation(similars);
      }
    });
  };

  const openYoutubeLink = (song) => {
    const url = `https://www.youtube.com/results?search_query=${song.artist} ${song.title}`;
    window.open(url, "_blank");
  };

  const resetSelection = () => {
    setSelected(null);
    setRecommencation(null);
  };

  return (
    <AppWrapper>
      <SearchInput
        searching={searchBySong}
        title="Search Song Name"
      />
      <SearchInput
        searching={searchByArtist}
        title="Search Artist"
      />
      <SearchInput
        searching={searchByWords}
        title="Search Word or List of Words"
      />
      {!selected && (
        <SearchResultList
          list={selection}
          selected={selected}
          select={(k) => selectSong(k)}
          title="Search Results"
        />
      )}
      {!selected && navs && navs.length && (
        <Navigation navs={navs} goToPage={(e) => searchBySong("", e)} />
      )}
      {selected && (
        <SelectedSong
          resetSelection={resetSelection}
          selected={selected}
          findMostSimilar={findMostSimilar}
          openYoutubeLink={() => openYoutubeLink(selected)}
        />
      )}
      {selected && recommendation && (
        <SearchResultList
          list={recommendation}
          selected={selected}
          select={(k) => openYoutubeLink(k)}
          title="Recommendation"
        />
      )}
    </AppWrapper>
  );
};

export default SongSelection;
