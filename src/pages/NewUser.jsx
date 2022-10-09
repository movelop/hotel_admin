import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { userInputs } from '../Data/formSource';

const NewUser = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSelect = (e) => {
    const checked = e.target.checked;

    checked ? setIsAdmin(true) : setIsAdmin(false);
  }

  const handleClick = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'heritage');
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/di5m6uq4j/image/upload", data);
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        isAdmin,
        img: url,
      }

      await axios.post('/api/auth/register', newUser);
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  }

  console.log(isAdmin);

  return (
    <div className="m-2 md:m-10 mt-24 p-[20px] md:p-10 bg-white rounded-3xl">
      <div>
        <h1 className="text-xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Add New User</h1>
        <div className="lg:flex lg:gap-5 ">
          <div className="lg:flex-1">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className='w-full rounded-lg object-cover'
            />
          </div>
          <div className="flex-[2] mt-5 lg:mt-0">
            <form className='w-full md:flex md:flex-wrap md:gap-[30px] justify-between'>
              <div className="w-[45%]">
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

              {userInputs.map((input) =>(
                <div className='lg:w-[45%] w-full mt-4 mb-4 md:mt-2 md:mb-2' key={input.id}>
                  <TextField
                    onChange={handleChange}
                    className="w-full"
                    placeholder={input.placeholder}
                    label={input.label}
                    variant="outlined"
                    id={input.id}
                    type={input.type}
                  />
                </div>
              ))}
              <div className='lg:w-[45%] w-full mt-4 mb-4 md:mt-0 md:mb-2'>
                <FormControlLabel
                    label="Admin"
                    labelPlacement="start"
                    control={
                      <Checkbox
                        onChange={handleSelect }
                      />
                    }
                  />
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

export default NewUser;