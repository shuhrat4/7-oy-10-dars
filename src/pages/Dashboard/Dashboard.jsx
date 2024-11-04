import React, { useContext, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import CustomRoutes from '../../routes/CustomRoutes';
import Activity from "../../components/Activity";
import Navbar from "../../components/Navbar";
import { Context } from "../../context/Context";

function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const { setToken } = useContext(Context);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, [accessToken, setToken]); 

  return (
    <div className='flex justify-between'>
      <Navbar />
      <div className='login-bg relative w-[60%] overflow-y-auto h-[100vh]'>
        <CustomRoutes />
      </div>
      <Activity />
    </div>
  );
}

export default Dashboard;
