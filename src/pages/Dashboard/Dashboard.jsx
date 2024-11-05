import React, { useContext, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import CustomRoutes from '../../routes/CustomRoutes';
import Activity from "../../components/Activity";
import Navbar from "../../components/Navbar";
import { Context } from "../../context/Context";
import SpotifyWebPlayer from 'react-spotify-web-playback';

function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const { token, setPlaying, setToken, play, palying } = useContext(Context);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [accessToken, setToken]);

  return (
    <>
      <div className='flex relative justify-between'>
        <Navbar />
        <div className='login-bg relative w-[60%] overflow-y-auto h-[100vh]'>
          <CustomRoutes />
        </div>
        <Activity />
      </div>
      <div className='absolute w-full bottom-0'>
        <SpotifyWebPlayer
          token={token}
          uris={play ? [play] : []}
          play={palying}
          callback={e => {
            if (e.isPlaying) {
              setPlaying(false)
            }
          }}
        />
      </div>
    </>
  );
}

export default Dashboard;
