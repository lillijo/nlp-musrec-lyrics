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
  const [searchString, setSearchString] = useState("");

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
      if (!url) {
        resetSelection(search);
      }
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
      if (!url) {
        resetSelection(search);
      }
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
    if (!url) {
      resetSelection(search);
    }
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
        setRecommencation(res.data.closest);
      }
    });
  };

  const resetSelection = (search = "") => {
    setSelected(null);
    setRecommencation(null);
    setSearchString(search);
  };

  return (
    <AppWrapper>
      <SearchInput
        searching={searchBySong}
        resetting={searchString}
        title="Search Song Name"
      />
      <SearchInput
        searching={searchByArtist}
        resetting={searchString}
        title="Search Artist"
      />
      <SearchInput
        searching={searchByWords}
        resetting={searchString}
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
        />
      )}
      {selected && recommendation && (
        <SearchResultList
          list={recommendation}
          selected={selected}
          select={(k) => selectSong(k)}
          title="Recommendation"
        />
      )}
    </AppWrapper>
  );
};

export default SongSelection;
