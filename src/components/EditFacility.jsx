import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { TextField } from '@mui/material';

const EditFacility = ({ item, setEdit }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState(item.title);
  const navigate = useNavigate();

  const facilityInput = {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: item.title,
  }
  const handleClick = async(e) => {
    e.preventDefault();
    if(file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'heritage');
      try {
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/di5m6uq4j/image/upload", data)
        const { url } = uploadRes.data;
        const newFacility = {
          title,
          img: url,
        }

        await axios.put(`/api/facilities/${item._id}`, newFacility);
        navigate('/facilities');
      } catch (error) {
        console.log(error);
      }
    } else {
      const newFacility = {
        ...item, title,
      }
      axios.put(`/api/facilities/${item._id}`, newFacility);
      navigate('/facilities');
    } 
  }
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Edit Facility</h1>
      <div className="lg:flex lg:gap-5 ">
        <div className="lg:flex-1">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : item.img ? item.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
            className='w-full rounded-lg object-cover'
          />
        </div>
        <div className="flex-[2] mt-5 lg:mt-0">
          <form className='w-full md:flex md:flex-wrap md:gap-[30px] justify-between px-3'>
            <div className="w-[45%] lg:w-[25%]">
              <label htmlFor="file" className='flex items-center gap-10px text-xl font-semibold'>
                Image: <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className='lg:w-[65%] w-full mt-4 mb-4'>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                value={facilityInput.placeholder}
                className="w-full"
                placeholder={facilityInput.placeholder}
                label={facilityInput.label}
                variant="outlined"
                id={facilityInput.id}
                type={facilityInput.type}
              />
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

export default EditFacility;