import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { EditRoom, EditUser, SingleDetails } from '../components';
import EditFacility from '../components/EditFacility';


const Single = ({ type }) => {
  const [edit, setEdit] = useState(false);
  const [room, setRoom] = useState('');
  const location = useLocation();
  const { data } = location.state;

  useEffect(() => {
    const getRooms = async () => {
      if (type === 'booking') {
        const roomsData = await axios.get('/api/rooms');
        const roomData = roomsData.data.find((item) => item.title === data.roomTitle);
        setRoom(roomData);
      } 
      
    } 
    getRooms();
    
  }, [type, data]);

  return (
    <div>
      <div className='m-2 md:m-10 mt-24 p-[20px] md:p-10 bg-white rounded-3xl relative'>
          {type !== 'booking' &&
              <div 
                  className="absolute top-0 right-0 p-[5px] text-sm md:text-lg md:p-[10px] text-[#7451f8] bg-[#7551f818] cursor-pointer rounded-r-lg"
                  onClick={() => setEdit(true)}
              >
                  Edit
              </div>
          }
          <h1 className="text-2xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Information</h1>
          <SingleDetails type={type} data={data} img = {room && room.images[0]}  />
      </div>
      
      {edit && <div className="m-2 md:m-10 mt-24 p-[20px] md:p-10 bg-white rounded-3xl">
        {type ===  'room' && (
          <EditRoom item={data} setEdit={setEdit} />
        )}
        {type === 'user' && (
          <EditUser item={data} setEdit={setEdit} />
        )}
        {type === 'facility' && (
          <EditFacility item={data} setEdit={setEdit} />
        )}
      </div>}
    </div>
  )
}

export default Single;