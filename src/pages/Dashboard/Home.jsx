import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import Loading from "../../assets/images/loading.png";
import MusicLists from '../../components/MusicLists';
import SpotifyWebApi from 'spotify-web-api-node';
import { CLIENT_ID } from '../../hook/useEnv';

const LazyMusicLists = lazy(() => new Promise(resolve => {
  return setTimeout(() => resolve(import("../../components/MusicLists")), 1000);
}));

function Home() {
  const { token } = useContext(Context);
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });
  
  const [trendMusicList, setTrendMusic] = useState([]);

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token); // token o'rnatish
      spotifyApi.searchAlbums("Konsta")
        .then(res => {
          setTrendMusic(res.body.albums.items.slice(0, 6).map(item => ({
            id: item.id,
            img: item.images[0]?.url,
            trackName: item.name,
            artistName: item.artists[0]?.name,
            uri: item.uri,
          })));
        })
        .catch(err => console.error("Error fetching albums:", err));
    }
  }, [token]);
   
  return (
    <Suspense fallback={<img className='absolute inset-0 m-auto' src={Loading} alt='Loading...' width={100} height={100} />}>
    <div className='p-5 '>
      <h2 className='text-[39px] mb-[29px] text-white font-bold'>Good afternoon</h2>
      <ul className='flex mb-[50px] gap-4 flex-wrap justify-between'>
        {trendMusicList.map(item => (
          <li className='flex trends-item overflow-hidden rounded-[6px] w-[48%] items-center space-x-[21px]'  key={item.id}>
            <img className='h-[82px]' src={item.img} alt="Trend img" width={82} height={82} />
            <h2 className='text-white font-bold text-[22px]'>{item.trackName}</h2>
          </li>
        ))}
      </ul>
      <div className='p-5 '>
          <LazyMusicLists artistName={"Konsta"} key="konsta" />
          <MusicLists artistName={"Toxir Sodiqov"} key="toxir-sodiqov" />
          <MusicLists artistName={"Shoxrux"} key="shoxrux" />
      </div>
    </div>
    </Suspense>
  );
}

export default Home;
