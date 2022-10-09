import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';

const EditRoom = ({ item, setEdit }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState(item);
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState(item.roomNumbers);
  const navigate = useNavigate();

  const roomInputs = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: item.title,
    },
    {
      id: "desc",
      label: "Description",
      type: "text",
      placeholder: item.desc,
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      placeholder: `N${item.price}`,
    },

    {
      id: "size",
      label: "Size",
      type:"text",
      placeholder: item.size,
    },

    {
      id: "bedding",
      label: "Bedding",
      type:"text",
      placeholder: item.bedding,
    },

    {
      id: "maxPeople",
      label: "Max People",
      type: "number",
      placeholder: item.maxPeople,
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleAddRoom = () => {
    if(room !== ''){
      setRooms([...rooms, { number: room }])
    }
    setRoom('');
  };
  const handleClick = async(e) =>{
    e.preventDefault();

    const roomNumbers = rooms;
    
    if(files) {
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
        await axios.put(`/api/rooms/${item._id}`, newRoom);
        navigate('/rooms')
      } catch (error) {
        console.log(error);
      }
    } else {
      await axios.put(`/api/rooms/${item._id}`, { ...info, roomNumbers });
      navigate('/rooms');
    }
  }

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Edit Room</h1>
      <div className="lg:flex lg:gap-5 ">
        <div className="lg:flex-1">
          <img
            src={
              files
                ? URL.createObjectURL(files[0])
                : item.images? item.images[0] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
            className='w-full rounded-lg object-cover'
          />
        </div>
        <div className="flex-[2] mt-5 lg:mt-0">
          <form className='w-full md:flex md:flex-wrap md:gap-[30px] justify-between px-3'>
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
                  value={input.placeholder}
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
            <div className="w-[100%] flex flex-row-reverse justify-start gap-[10px] lg:pr-4">
              <button className="py-[10px] px-[20px] text-white bg-teal-800 font-body cursor-pointer rounded-sm" onClick = {handleClick}>Send</button>
              <button className="py-[10px] px-[20px] text-white bg-red-400 font-body cursor-pointer rounded-sm" onClick = {() => setEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRoom;