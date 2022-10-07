import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { TextField } from '@mui/material';

const EditUser = ({ item, setEdit }) => {
  const [file, setFile] = useState('');
  const [info, setInfo] = useState(item);
  const navigate = useNavigate();

  const userInputs = [
    {
      id: 'firstname',
      label: 'First Name',
      type: 'text',
      placeholder: item.firstname,
    },
    {
      id: 'lastname',
      label: 'Last Name',
      type: 'text',
      placeholder: item.lastname,
    },
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: item.username,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: item.email,
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: item.phone,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "country",
      label: "Country",
      type: "text",
      placeholder: item.counrty,
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async(e) => {
    e.preventDefault();
    if(file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'heritage');
      try {
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/di5m6uq4j/image/upload", data);
        const { url } = uploadRes.data;

        const newUser = {
          ...info,
          img: url,
        }

        await axios.put(`/api/users/${item._id}`, newUser);
        navigate(`/users`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios.put(`/api/users/${item._id}`, info);
        navigate(`/users`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Edit User</h1>
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
          <form className='w-full md:flex md:flex-wrap md:gap-[30px] justify-around items-center'>
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
                  value={input.placeholder}
                  className="w-full"
                  placeholder={input.placeholder}
                  label={input.label}
                  variant="outlined"
                  id={input.id}
                  type={input.type}
                />
              </div>
            ))}
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

export default EditUser;