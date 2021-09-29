import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ libraryState, setLibraryState }) {
  const libraryStateHandler = () => {
    setLibraryState(!libraryState)
  };
  return (
    <div className="nav">
      <h1>Air</h1>
      <button onClick={libraryStateHandler}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
}

export default Nav;
