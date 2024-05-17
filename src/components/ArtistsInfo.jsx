import React, { useState } from "react";
import axios from "axios";
import NotFound from '../img/notfound.png'

const ArtistsInfo = ({ token }) => {
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
    const [selectedArtistAlbums, setSelectedArtistAlbums] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(null);

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
              limit: "6",
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
        } catch (error) {
          console.error("Error fetching artist albums:", error);
        }
      };

      const renderArtists = () => {
        return artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-green-500 mx-auto p-4 m-4 rounded-2xl w-10/12 h-auto text-wrap text-start"
          >
            {artist.images.length ? (
              <img
                className="size-[200px] m-auto rounded-full p-4 object-cover"
                src={artist.images[0].url}
                alt="d"
              />
            ) : (
                <img
                className="size-[200px] m-auto rounded-full p-4 object-cover"
                src={NotFound}
                alt="d"
              />
            )}
            <p>
              <b>Artiste :</b> {artist.name}
            </p>
            {artist.genres.length ? (
              <p>
                <b>genre :</b> {artist.genres[0]}, {artist.genres[1]}{" "}
              </p>
            ) : (
              <p>genre musicale : Oups, cette artiste n'a pas de genres</p>
            )}
    
            <p>
              <b>followers</b>: {artist.followers.total}
            </p>
            <div className=" flex justify-around mt-4">
              <button className="block bg-green-800 hover:bg-black transition-all px-4 rounded-full">
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir l'artiste
                </a>
              </button>
    
              <button
                className="block bg-green-800 hover:bg-black transition-all px-4 rounded-full"
                onClick={() => getArtistAlbums(artist.id)}
              >
                Voir les Albums
              </button>
            </div>
    
            {selectedArtistAlbums.length > 0 && artist.id === selectedArtistId && (
              <div>
                <h2>Albums de {artist.name}</h2>
                <div className="bg-green-400 w-[290px] m-auto flex flex-row overflow-x-scroll border-green-700 border-8 mt-2">
                  {selectedArtistAlbums.map((album) => (
                    <div key={album.id} className="bg-green-700 p-4 m-4">
                      {album.images.length ? (
                        <div>
                          <img
                            src={album.images[0].url}
                            alt="cover de 'l'album"
                            className="size-40 rounded-2xl max-w-none"
                          />
                          <p>
                            <b>titre:</b> {album.name}
                          </p>
                          <p>
                            <b>date:</b> {album.release_date}
                          </p>
                          <p>
                            <b>Piste:</b> {album.total_tracks}
                          </p>
                        </div>
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
        <div>
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
          {renderArtists()}
        </div>
      );
}

export default ArtistsInfo;
