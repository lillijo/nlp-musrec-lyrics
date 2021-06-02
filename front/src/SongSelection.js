import React, { useState } from "react";

const SongSelection = (props) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div>
      <label htmlFor="searchField" title="Search a Song" />
      <input
        id="searchField"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>selected: {selected}</div>
    </div>
  );
};

export default SongSelection;
