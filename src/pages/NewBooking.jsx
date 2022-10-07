import React, { useEffect, useState } from 'react';
import axios from "axios";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

import { bookingInputs } from '../Data/formSource';
import useFetch from "../hooks/useFetch";
const newDate = new Date();
const newEndDate = new Date().getTime() + 86400000;

const NewBooking = () => {
  const [info, setInfo] = useState({});
  const [dates,setDates] = useState(
      [
          {
              startDate: newDate,
              endDate: new Date(newEndDate),
              key: 'selection'
          }
      ]
  )
  const [options, setOptions] = useState(
      {
          adults: 1,
          children: 0,
          rooms: 1,
      }
  );
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([])
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]);
  const { data } = useFetch('/api/rooms');
  const navigate = useNavigate();

  useEffect(() => {
    setRooms(data);
  }, [data]);
  
  useEffect(() => {
    if(error) {
      toast.error(msg)
    }
  }, [error, msg]);
  
  
  const getDatesInRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const date = new Date(start.getTime());
  
      const dates = [];
  
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
  
      return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
      const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date).getTime())
      );
  
      return !isFound;
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
      const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
      const daydiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return daydiff;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const totalPrice = days* options.rooms * room?.price || "";

  const handleChange = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleRoom = (e) => {
      e.preventDefault();
      const single = rooms.find((item) => item._id === e.target.value);
      setRoom(single);
  }

  const updateAdultQuantity = (val) => {
      if (options.adults === 1 && val === -1) return;
      if (options.adults === 5 && val === 1) return;
      setOptions({ ...options, adults: options.adults + val });
  };

  const updateRoomsQuantity = (val) => {
      if (options.rooms === 1 && val === -1) return;
      if (options.rooms === 5 && val === 1) return;
      setOptions({ ...options, rooms: options.rooms + val });
  };
  const updateChildrenQuantity = (val) => {
      if (options.children === 0 && val === -1) return;
      if (options.children === 5 && val === 1) return;
      setOptions({ ...options, children: options.children + val });
  };

  const handleSelect = (e) => {
      const checked = e.target.checked;
      const value = e.target.value;
      const name = e.target.name;

      setSelectedRooms(
        checked
          ? [...selectedRooms, value]
          : selectedRooms.filter((item) => item !== value)
      );

      setSelectedRoomNumbers(
          checked ? [...selectedRoomNumbers, name]
          : selectedRoomNumbers.filter((item) => item !== name)
      )
  }

  const handleOpen = () => {
      setOpen(true);
  }

  const  handleClick = async(e) => {
      e.preventDefault();

      for (let val in info) {
          if (info[val] === "") {
            setMsg("You must Fill Out Every Field");
            return setError(true);
          }
      }
    
      if (isNaN(Number(info.phone))) {
          setMsg("Phone number must only contain numbers");
          return setError(true);
      }
    
      if (info.email !== info.confirmEmail) {
          setMsg("Emails must match");
          return setError(true);
      }
    
      if (/.+@.+\..+/.test(info.email) === false) {
          setMsg("Must be a valid email");
          return setError(true);
      }
      
      if(selectedRooms.length > options.rooms || selectedRooms.length < options.rooms) {
          setMsg(`you must select only ${options.rooms} rooms`);
          return setError(true);
      }
      
      const newBooking = {
          ...info,
          roomTitle: room.title,
          adults: options.adults,
          children: options.children,
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
          numberOfRooms: options.rooms,
          selectedRooms: selectedRooms,
          roomNumbers: selectedRoomNumbers,
          price: totalPrice,
      }

      try {
          await Promise.all(
              selectedRooms.map((roomId) => {
                const res = axios.put(`/api/rooms/availability/${roomId}`, {
                  dates: alldates,
                });
                return res.data;
              })
          );
          await axios.post('/api/bookings/create', newBooking);
          navigate('/bookings');
      } catch (error) {
          setMsg('Error creating a new booking please try again')
          setError(true);
      }
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-[20px] md:p-10 bg-white rounded-3xl">
      <Toaster />
      <div>
        <h1 className="text-xl md:text-3xl font-extrabold tracking tight mb-[20px] dark:text-gray-400 capitalize">Add New Booking</h1>
        <div className="lg:flex lg:gap-5 ">
          <div className="lg:flex-1 flex justify-center items-center mb-[40px] lg:mb-0">
            <div className='bg-[#dbd5cd] p-[20px] w-[100%] lg:w-[90%] m-auto flex flex-col justify-center items-center rounded-md'>
              <h1 className='text-sm md:text-xl text-gray-700 mb-[1rem]'>BOOKING SUMMARY</h1>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Room:</h4> 
                <span className='text-sm md:text-xl'>{room ? room.title :"Select a room type"}</span>
              </div>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Check-in Date:</h4>
                <span className='text-sm md:text-xl'>
                  {new Date(dates[0].startDate).toLocaleString("en-uk", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                  })}
                </span>
              </div>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Check-out Date:</h4>
                <span className='text-sm md:text-xl'>
                  {new Date(dates[0].endDate).toLocaleString("en-uk", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                  })}
                </span>
              </div>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Number of Night(s):</h4>
                <span className='text-sm md:text-xl'>{days}</span>
              </div>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Guest(s)</h4>
                <span className='text-sm md:text-xl'>
                  {options.adults} Adults{" "}
                  {options.children > 0 &&
                  `${options.children} Children`}
                </span>
              </div>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Number of Room(s):</h4>
                <span className='text-sm md:text-xl'>{options.rooms}</span>
              </div>
              <div className='flex w-[95%] md:w-[80%] justify-between mb-2'>
                <h4 className='text-sm md:text-xl'>Total</h4>
                <span className='text-sm md:text-xl' style={{ fontWeight: "bold" }}>{totalPrice ? `N${totalPrice.toLocaleString('en-US')}`: 'N0:00'}</span>
              </div>
            </div>
          </div>
          <div className="flex-[2] mt-5 lg:mt-0">
            <form className='w-full md:flex md:flex-wrap md:gap-[30px] justify-around items-center'>
              <div className="lg:w-[45%] w-full mt-4 mb-4 md:mt-2 md:mb-2 flex gap-[1rem] items-center relative">
                <div>
                  <TextField
                      value={`${format(dates[0].startDate, "dd/MM/yyyy")}`}
                      readOnly
                      disabled={true}
                      className="inputBox"
                      label="Check-in"
                      onClick={handleOpen}
                  />
                </div>
                <Box>to</Box>
                <div>
                  <TextField
                      value={`${format(dates[0].endDate, "dd/MM/yyyy")}`}
                      readOnly
                      disabled={true}
                      className="inputBox"
                      label="Check-out"
                      onClick={handleOpen}
                  />  
                </div>
                {open && (
                    <div className="absolute top-[5px] xs: md:scale-100 md:top-[50px] z-20 scale-75" onMouseLeave={() => setOpen(false)}>
                        <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        minDate={new Date()}
                        />
                    </div>
                )}
              </div>

              <div className="lg:w-[45%] w-full mt-4 mb-4 md:mt-2 md:mb-2">
                <div className="flex items-center">
                  <div className="mr-[1rem] md:mr-[2rem]">
                      <Typography>Adults</Typography>
                      <div className="flex items-center mt-[10px]">
                          <div
                            className="flex items-center justify-center border-1 outline-none p-1.5 lg:p-2 border-gray-300"
                            name="adults"
                            onClick={() => {
                            updateAdultQuantity(-1);
                            }}
                          >
                              <RemoveIcon sx={{ fontSize: { lg: '24px', xs: '14px' } }} />
                          </div>
                          <span className='px-[1rem]'>{options.adults}</span>
                          <div
                            className="flex items-center justify-center border-1 outline-none p-1.5 lg:p-2 border-gray-300"
                            name="adults"
                            onClick={() => updateAdultQuantity(1)}
                          >
                              <AddIcon sx={{ fontSize: { lg: '24px', xs: '14px' } }} />
                          </div>
                      </div>
                  </div>
                  <div>
                    <Typography>Children</Typography>
                    <div className="flex items-center mt-[10px]">
                      <div
                        className="flex items-center justify-center border-1 outline-none p-1.5 lg:p-2 border-gray-300"
                        name="children"
                        onClick={() => {
                          updateChildrenQuantity(-1);
                        }}
                      >
                          <RemoveIcon sx={{ fontSize: { lg: '24px', xs: '14px' } }} />
                      </div>
                      <span className='px-[1rem]'>{options.children}</span>
                      <div
                        className="flex items-center justify-center border-1 outline-none p-1.5 lg:p-2 border-gray-300"
                        name="children"
                        onClick={() => {
                          updateChildrenQuantity(1);
                        }}
                      >
                          <AddIcon sx={{ fontSize: { lg: '24px', xs: '14px' } }} />
                      </div>
                    </div>
                  </div>
                  <div className="ml-[1rem] md:ml-[2rem]">
                    <Typography>Rooms</Typography>
                    <div className="flex items-center mt-[10px]">
                        <div
                          className="flex items-center justify-center border-1 outline-none p-1.5 lg:p-2 border-gray-300"
                          name="adults"
                          onClick={() => {
                            updateRoomsQuantity(-1);
                          }}
                        >
                            <RemoveIcon  sx={{ fontSize: { lg: '24px', xs: '14px' } }}/>
                        </div>  
                        <span className='px-[1rem]'>{options.rooms}</span>
                        <div
                          className="flex items-center justify-center border-1 outline-none p-1.5 lg:p-2 border-gray-300"
                          name="adults"
                          onClick={() => updateRoomsQuantity(1)}
                        >
                            <AddIcon  sx={{ fontSize: { lg: '24px', xs: '14px' } }}/>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-[45%] w-full mt-4 mb-4 md:mt-2 md:mb-2">
                <select defaultValue={'#'} id="roomId" className='border-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-color block w-full p-3 ' onChange={handleRoom}>
                    <option value={'#'} disabled>Select preffered Room</option>
                    {rooms.length && 
                        rooms.map((item) => (
                            <option key={item._id} value={item._id}>{item.title}</option>
                        ))
                    }
                </select>
                {room && (
                  <div className="w-full mt-[1rem]">
                      <Typography>Select your preferred room number(s)</Typography>
                      <div className='flex flex-wrap'>
                          {room.roomNumbers.map((roomNumber) => (
                              <FormControlLabel key={roomNumber._id} 
                              
                              
                              control={ <Checkbox
                                  value={roomNumber._id}
                                  name= {roomNumber.number?.toString()}
                                  onChange={handleSelect}
                                  disabled={!isAvailable(roomNumber)}
                              />} 
                              label={roomNumber.number}
                              />
                          ))}
                      </div>
                  </div>
                )}
              </div>
              
              {bookingInputs.map((input) => (
              <div className="lg:w-[45%] w-full mt-4 mb-4 md:mt-2 md:mb-2" key={input.id}>
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

export default NewBooking;