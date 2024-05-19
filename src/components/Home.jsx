// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import LoginText from "./LoginText";

const Home = ({ token, logout }) => {
  const CLIENT_ID = "4a5d9f2f0c2e4baf95dc94840bd32fd5";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      {!token ? (
        <a
          className="absolute top-5 end-4 p-4 bg-green-500 rounded-full w-50 text-2xl"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button
          className="absolute top-5 end-4 p-4 bg-green-500 rounded-full w-50 text-2 border border-white shadow-lg shadow-white/40"
          onClick={logout}
        >
          Logout
        </button>
      )}

      {token ? (
        <Link to="/artists">
          <button className="p-4 bg-green-500 rounded-full w-50 text-2xl">
            Go to Artists
          </button>
        </Link>
      ) : <LoginText />}
    </div>
  );
};

export default Home;
