import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';

import { roomInputs } from '../Data/formSource';

const NewRoom = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleAddRoom = () => {
    if(room !== ''){
      setRooms([...rooms, { number: room }])
    }
    setRoom('');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.map(room => ({ number: room }));
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'heritage');
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/di5m6uq4j/image/upload", data)

          const { url } = uploadRes.data;
          return url
        })
      );
      const newRoom = {
        ...info,
        roomNumbers,
        images: list
      }
      await axios.post('/api/rooms', newRoom);
      navigate('/rooms')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-[20px] md:p-10 bg-white rounded-3xl">
      <div>
        <h1 className="text-xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Add New Room</h1>
        <div className="lg:flex lg:gap-5 ">
          <div className="lg:flex-1">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className='w-full rounded-lg object-cover'
            />
          </div>
          <div className="flex-[2] mt-5 lg:mt-0">
            <form className='w-full md:flex md:flex-wrap md:gap-[30px] justify-around items-center'>
              <div className="w-[45%]">
                <label htmlFor="file" className='flex items-center gap-10px text-xl font-semibold'>
                  Image: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {roomInputs.map((input) =>(
                <div className='lg:w-[45%] w-full mt-4 mb-4 md:mt-2 md:mb-2' key ={input.id}>
                  <TextField
                    onChange={handleChange}
                    className="w-full"
                    placeholder={input.placeholder}
                    // value={input.placeholder}
                    label={input.label}
                    variant="outlined"
                    id={input.id}
                    type={input.type}
                  />
                </div>
              ))}
              <div className='lg:w-[45%] w-full mt-4 mb-8 items-center'>
                <label>Rooms</label>
                  <div className='flex gap-1 my-3'>
                    {rooms.length > 0 && rooms.map((chip) => (
                      <Chip  key={chip.number} label={chip.number} onDelete={() => setRooms(rooms.filter((c) => c.number !== chip.number))} size='small' />
                    ))}
                  </div>
                  <TextField
                    required
                    className="w-[75%] "
                    value ={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room number and Add"
                    type='number'
                  />

                  <button type = 'button' className = 'ml-2 mt-1 w-[22%] py-[10px] px-[15px] border-1 border-color text-white bg-blue-700 self-center outline-none rounded-sm' onClick={handleAddRoom}>Add</button>
                </div>
                <div className="w-[100%] flex justify-end lg:pr-4">
                  <button className="py-[10px] px-[20px] text-white bg-teal-800 font-body cursor-pointer rounded-sm" onClick = {handleClick}>Send</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom;