import React from 'react'
import { axiosPrivate } from '../../api/axios'

const Dashboard = () => {
  async function refresh() {
    const req = await axiosPrivate.get("/sppd")
    const res = req.data
    console.log(res);
    
  }
  return (
    <>
      <div>Dashboard</div>
      <button onClick={refresh}>refresh</button>
    </>
  )
}

export default Dashboard