import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';

import LoginText from "./components/LoginText";

function App() {
    const CLIENT_ID = "4a5d9f2f0c2e4baf95dc94840bd32fd5"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setArtists([])
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist",
                limit : "10"
            }
        })
        setArtists(data.artists.items)
        console.log(data)
    }


    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"200px"} height={"200px"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                <p>{artist.name}</p>
                <p>{artist.popularity}</p>
            </div>
        ))
    }

    return (
        <div className="App">
            <header className="App-header">
                {!token ?
                    <a className="absolute top-5 end-4 p-4 bg-green-500 rounded-full w-50 text-2xl" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button className="absolute top-5 end-4 p-4 bg-green-500 rounded-full w-50 text-2" onClick={logout}>Logout</button>}

                {token ?

                    <form onSubmit={searchArtists}>
                        <input type="text" className="text-black" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <LoginText/>
                }

                {renderArtists()} 

            </header>
        </div>
    );
}

export default App;