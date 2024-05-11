import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import LoginText from "./components/LoginText";

function App() {
  const CLIENT_ID = "4a5d9f2f0c2e4baf95dc94840bd32fd5";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtistAlbums, setSelectedArtistAlbums] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken && hash) {
      storedToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", storedToken);
    }

    setToken(storedToken);
  }, []);

  const logout = () => {
    setArtists([]);
    setSelectedArtistAlbums([]);
    setSelectedArtistId(null);
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
          limit: "3",
        },
      });
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  const getArtistAlbums = async (artistId) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedArtistAlbums(data.items);
      setSelectedArtistId(artistId);
      console.log(selectedArtistAlbums);
      console.log(selectedArtistId);
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img
            width={"200px"}
            height={"200px"}
            src={artist.images[0].url}
            alt=""
          />
        ) : (
          <div>No Image</div>
        )}
        <p>{artist.name}</p>
        {/* <p>{artist.popularity}</p> */}

        <button onClick={() => getArtistAlbums(artist.id)}>
          Voir les Albums
        </button>

        {selectedArtistAlbums.length > 0 && artist.id === selectedArtistId && (
          <div>
            <h2>Albums de {artist.name}</h2>
            <div className="bg-green-400 w-auto flex flex-row overflow-x-scroll border-yellow-300 border-8">
              {" "}
              {selectedArtistAlbums.map((album) => (
                <div key={album.id} className="bg-red-500 m-4   ">
                  {album.images.length ? (
                    <img
                    //   width={"125px"}
                    //   height={"125px"}
                      src={album.images[0].url}
                      alt="cover de 'l'album"
                      className="w-40 h-40 rounded-2xl"
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a
            className="absolute top-5 end-4 p-4 bg-green-500 rounded-full w-50 text-2xl"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button
            className="absolute top-5 end-4 p-4 bg-green-500 rounded-full w-50 text-2"
            onClick={logout}
          >
            Logout
          </button>
        )}

        {token ? (
          <form onSubmit={searchArtists}>
            <input
              type="text"
              className="text-black"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="recherchez votre artiste"
            />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <LoginText />
        )}

        {renderArtists()}
      </header>
    </div>
  );
}

export default App;
