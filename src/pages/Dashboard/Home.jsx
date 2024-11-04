import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import SpotifyWebApi from 'spotify-web-api-node';
import { CLIENT_ID } from '../../hook/useEnv';
import SpotifyWebPlayer from 'react-spotify-web-playback';

function Home() {
  const { token } = useContext(Context);
  const [tracksList, settarcksList] = useState([])

  const [play, setplay] = useState([])
  const [palying, setPlaying] = useState([])

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })

  useEffect(() => {
    if (!token) return
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    if (token) {
      spotifyApi.searchTracks("Hamdam Sobirov ").then(res => {
        settarcksList(res.body.tracks.items.map(item => {
          const data = {
            id: item.id,
            img: item.album.images[0].url,
            tracName: item.name,
            artistName: item.album.artists[0].name,
            uri: item.uri
          }
          return data
        }))

      })
    }
  }, [token])

  function handlePlay(uri) {
    setplay(uri)
    setPlaying(true)
  }


  return (
    <>
      <div className='flex overflow-x-auto justify-between gap-5 p-5'>
        {tracksList?.map(item => (
          <div onClick={() => handlePlay(item.uri)} key={item.id} className='min-w-[225px] cursor-pointer p-[21px] rounded-[8px] bg-[#1c1c1c]'>
            <img className='h-[182px] mb-[25px] rounded-[8px]' src={item.img} alt="Track img" width={"100%"} />
            <h2 className='text-white mb-2 font-bold text-[20px]'>{item.tracName}</h2>
            <p className='text-white font-normal text-[18px] opacity-[60%]'>{item.artistName}</p>
          </div>
        ))}
      </div>
      <div className='absolute bottom-0 w-full'>
        <SpotifyWebPlayer
          token={token}
          uris={play ? [play] : []}
          play={palying}
          callback={(e) => {
            if (e.isPlaying) {
              setPlaying(false)
            }
          }}
        />
      </div>

    </>

  );
}

export default Home;
