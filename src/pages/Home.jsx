import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; 
import { TbCurrencyNaira } from 'react-icons/tb';

import { useStateContext } from '../context/ContextProvider';
import { BarChart, LineChart, Piechart, Table } from '../components';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';


const Home = () => {
  const { currentColor, } = useStateContext();
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState([]);
  const [yearlyPerc, setYearlyPerc] = useState(0);
  
  const MONTHS = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );


  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get('/api/bookings/income/month');
        setIncome(res.data);
        setPerc((res.data[0].count * 100) / res.data[1].count - 100);
      } catch (error) {
        
      }
    }

    getIncome();
  }, [])

  useEffect(() => {
    const getYearlyIncome = async () => {
      try {
        const res = await axios.get('/api/bookings/income/year');
        setYearlyIncome(res.data);
        setYearlyPerc((res.data[0].count * 100) / res.data[1].count - 100 );
      } catch (error) {
        
      }
    }

    getYearlyIncome();
  }, [])
  

  console.log(yearlyIncome, yearlyPerc);

  return (
    <div className='mt-24'>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl flex items-center"><TbCurrencyNaira/>{income[0]?.total.toLocaleString('en-us')}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <TbCurrencyNaira />
            </button>
          </div>
          {/* <div className="mt-6">
            <Button
              color='white'
              bgColor= { currentColor }
              text= "Download"
              borderRadius= '10px'
            />
          </div> */}
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            <div 
              className='bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 rounded-2xl'
            >
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <MdOutlineSupervisorAccount />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{income[0]?.count.toLocaleString('en-us')}</span>
                <span className={`text-sm text-${perc < 0 ? 'red-800': 'green-800'} ml-2`}>
                  {perc} %
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{MONTHS[income[0]?._id - 1]} Reservations</p>
            </div>
            <div 
              className='bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 rounded-2xl'
            >
              <button
                type="button"
                style={{ color: 'rgb(228, 106, 118)', backgroundColor: '#E5FAFB' }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                <FiBarChart />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{yearlyIncome[0]?.count.toLocaleString('en-us')}</span>
                <span className={`text-sm text-${perc < 0 ? 'red-800': 'green-800'} ml-2`}>
                  {yearlyPerc} %
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{yearlyIncome[0]?._id} Reservations</p>
            </div>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center m-3">
        <div>
          <div className="rounded-2xl md:w-400 p-4 m-3" style={{ backgroundColor: currentColor}}>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-white text-2xl">Earnings</p>
              <div>
                <p className="flex items-center text-2xl text-white font-semibold mt-8"><TbCurrencyNaira/>{income[0]?.total.toLocaleString('en-us')}</p>
                <p className="text-gray-200">{MONTHS[income[0]?._id - 1]} Revenue</p>
              </div>
            </div>
            <div className='mt-4'>
              <BarChart />
            </div>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10'>
            <div>
            <p className="flex items-center text-2xl font-semibold"><TbCurrencyNaira/>{yearlyIncome[0]?.total.toLocaleString('en-us')}</p>
              <p className="text-gray-400">{yearlyIncome[0]?._id} Revenue</p>
            </div>
            <div className='w-40'>
              <Piechart />
            </div>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 m-3">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Bookings Overview</p>
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart data = {yearlyIncome} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex flex-col bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760 lg:w-[75%] m-3">
        <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Recent Transactions</p>
          </div>
          <div className="md:w-full overflow-auto">
            <Table />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;