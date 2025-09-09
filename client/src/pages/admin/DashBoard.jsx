import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading.jsx'
import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon}from 'lucide-react'
import {dummyDashboardData} from '../../assets/assets.js'
import Title from '../../components/admin/Title.jsx'

import BlurCircle from '../../components/BlurCircle.jsx'
import { dateFormate } from '../../lib/dateFormate.js'



function DashBoard() {

  // console.log(dummyDashboardData);
  

  const currency = import.meta.env.VITE_CURRENCY
  const [dashBoardData,setdashBoardData] = useState({
    totalBooking : 0,
    totalRevenue : 0,
    activeShows : [],
    totalUser : 0
  });
  const [loading,setloading] = useState(true);
  const DashBoardCards = [
    {title : "total Booking",value : dashBoardData.totalBooking || "0", icon : ChartLineIcon},
    {title : "total Revenue",value : currency + dashBoardData.totalRevenue || "0", icon : CircleDollarSignIcon},
    {title : "total shows",value : dashBoardData.activeShow || "0", icon : PlayCircleIcon},
    {title : "total Users",value : dashBoardData.totalUser || "0", icon : UserIcon}
  ]

  const fetchDashboardData = async () => {
    setdashBoardData(dummyDashboardData)
    setloading(false)
  };
  useEffect (()=>{
    fetchDashboardData();
  },[]);


  return !loading ? (
    <>
    <Title text1 = "admin" text2="Dashboard" />

    <div className='relative flex flex-wrap gap-4 mt-6'>
      <BlurCircle top="-100px" left="0px"/>
      <div className='flex flex-wrap gap-4 w-full'>
        {DashBoardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
      </div>
    </div>

    <p className='mt-10 text-lg font-medium'>Active shows</p>
    <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
      <BlurCircle top="100px" left="-10%"/>
      {dashBoardData.activeShows.map((show)=>(
        <div key={show._id} className='w-55 rounded-lg overflow overflow-hidden h-full
        pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300'>
          <img src={show.movie.poster_path} alt=""  className='h-60 w-full object-cover'/>
          <p className='font-medium p-2 truncate'>{show.movie.title}</p>
          <div className='flex items-center justify-between px-2'>
            <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
            <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
              <StarIcon className='w-4 h-4 text-primary fill-primary'/>
              {show.movie.vote_average.toFixed(1)}
            </p>
          </div>
          <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormate(show.showDateTime)}</p>
        </div>
      ))};
    </div>
    </>
  ) : <Loading/>
}

export default DashBoard