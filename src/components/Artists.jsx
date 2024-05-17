// src/components/Artists.js
import React from "react";
import ArtistsInfo from "./ArtistsInfo";

const Artists = ({ token }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <ArtistsInfo token={token} />
    </div>
  );
};

export default Artists;
