import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeformate from '../lib/isotimeformate';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';

function SeatLayout() {
  const grouprows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const { id, date } = useParams();
  const [selectedseats, setselectedseats] = useState([]);
  const [selectedtime, setselectedtime] = useState(null);
  const [show, setshow] = useState(null)

  const navigate = useNavigate()



  const getshow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    if (show) {
      setshow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }
  useEffect(() => {
    getshow()
  }, []);

  const peta = (dummyDateTimeData?.['2025-07-24']);

  // peta.map((item)=>(
  //   console.log(item.time)

  // ));


  const handleSeatclick = (seatid) => {
    if (!selectedtime) {
      return toast(`please Select time Fiest`)
    }
    if (!selectedseats.includes(seatid) && selectedseats.length > 5) {
      return toast(`You can Only Select 5 seats`)
    }
    setselectedseats(prev => prev.includes(seatid) ? prev.filter(seat !== seatid) : [...prev, seatid])
  }


  const renderseat = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatid = `${row}${i + 1}`;
          return (
            <button key={seatid} onClick={(seatid) => handleSeatclick(seatid)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedseats.includes(seatid) && "bg-primary text-white"}`}>
              {seatid}
            </button>
          );
        })}
      </div>
    </div>
  );
  return show ? (




    // <h1>dkj</h1>
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Avalable Timings */}


      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10
      h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Avalable Timings</p>
        <div className='mt-t aspect-y-1'>



          <div className='mt-4 aspect-y-1'>
            {peta?.length > 0 ? (
              peta.map((item) => (
                <div
                  key={item.time}
                  onClick={() => setselectedtime(item)}
                  className={`flex items-center gap-2 px-2 py-2 w-max
          rounded-r-md cursor-pointer transition 
          ${selectedtime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
                  <ClockIcon className='w-4 h-4' />
                  <p className='text-sm'>{isoTimeformate(item.time)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm px-6 text-gray-500">No timings available for selected date.</p>
            )}
          </div>



        </div>
      </div>

      {/* Seat layout */}

      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100' left='-100' />
        <BlurCircle bottom='0' right='0' />
        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-10 text-x5 text-gray-300'>
          <div className='grid grid-col-2 md:grid-cols-1 gap-8 md:gap-2 md-6'>
            {grouprows[0].map((row) => renderseat(row))}
          </div>


          <div className='grid grid-cols-2 gap-11 pt-8'>
            {grouprows.slice(1).map((group, index) => (
              <div key={index}>
                {group.map((row) => renderseat(row))}
              </div>
            ))}
          </div>
        </div>

        <button onClick={()=>navigate('/my-booking ')} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
          Proceed to Chechout
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4'/>
        </button>

      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout