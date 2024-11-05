import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SpotifyWebApi from 'spotify-web-api-node';
import { Context } from '../../context/Context';
import { CLIENT_ID } from '../../hook/useEnv';
import { LikeInner } from '../../assets/Icon';

function Single() {
  const { id } = useParams();
  const { token, setplay, setplaying } = useContext(Context);
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  const [trackInfo, setTrackInfo] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);

  useEffect(() => {
    if (token) {
      spotifyApi.getTrack(id).then(res => {
        const data = {
          artistName: res.body.artists[0].name,
          trackName: res.body.name,
          img: res.body.album.images[0].url,
          time: String(((res.body.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":")
        };
        setTrackInfo(data);

        spotifyApi.searchTracks(res.body.artists[0].name, { limit: 10 }).then(res => {
          const tracks = res.body.tracks?.items || [];
          setArtistTracks(tracks.map(item => ({
            id: item.id,
            img: item.album?.images[0]?.url,
            trackName: item.name,
            artistName: item.artists[0].name,
            uri: item.uri,
            time: "2:23",
            isLiked: false,
            isPlaying: false
          })));
        }).catch(error => console.error("Error fetching artist tracks:", error));
      }).catch(err => console.error("Error fetching track info:", err));
    }
  }, [token, id]);


  function handleTrackClick(item, evt) {
    if (evt.target.id === "like") {
   
      item.isLiked = !item.isLiked;
      setArtistTracks([...artistTracks]); 
    } else {
     
      const updatedTracks = artistTracks.map(track => {
        if (track.id === item.id) {
          track.isPlaying = !track.isPlaying;
        } else {
          track.isPlaying = false;
        }
        return track;
      });
      setArtistTracks(updatedTracks);
      setplay(item.uri); 
      setplaying(true);   
    }
  }

  return (
    <div className='p-5 music-single overflow-y-auto'>
      <div className='flex items-center space-x-8'>
        <img className='h-[297px] rounded-md' src={trackInfo.img} alt="" width={297} height={297} />
        <div>
          <p className='text-[22px] font-bold text-white'>{trackInfo.artistName}</p>
          <h2 className='text-[60px] text-white font-bold'>{trackInfo.trackName}</h2>
          <strong className='text-white font-semibold text-[20px]'>{trackInfo.time}</strong>
        </div>
      </div>
      <table className='w-full mt-[30px]'>
        <thead>
          <tr>
            <th className='text-[#B3B3B3] text-[18px] py-2'>#</th>
            <th className='text-[#B3B3B3] text-start px-3 text-[18px] py-2'>ALBUM</th>
            <th className='text-[#B3B3B3] text-start text-[18px] py-2'>TITLE</th>
            <th className='text-[#B3B3B3] text-end text-[18px] py-2'>DATA</th>
            <th className='text-[#B3B3B3] text-end text-[18px] py-2'>TIME</th>
          </tr>
        </thead>
        <tbody>
          {artistTracks.map((item, index) => (
            <tr onClick={(evt) => handleTrackClick(item, evt)} className='cursor-pointer' key={item.id}>
              <td className='text-white text-[18px] p-3'>{index + 1}</td>
              <td className='p-3'>
                <div className='flex items-center space-x-[21px]'>
                  <img src={item.img} alt="" width={52} height={52} />
                  <div>
                    <p className={`text-[22px] font-semibold ${item.isPlaying ? "text-green-500" : "text-white"}`}>
                      {item.trackName}
                    </p>
                    <h3 className='text-[18px] text-[#B3B3B3]'>{item.artistName}</h3>
                  </div>
                </div>
              </td>
              <td className='p-3 text-white text-start'>{item.trackName}</td>
              <td className='p-3 text-white text-start'></td>
              <td className='p-3 space-x-[43px] flex items-center text-end'>
                <button id="like" className={`${item.isLiked ? "text-green-400" : "text-white"}`}><LikeInner /></button>
                <p className='text-white'>{item.time}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Single;
