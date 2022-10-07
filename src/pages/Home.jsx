import React from 'react';
import { TbCurrencyNaira } from 'react-icons/tb';

import { useStateContext } from '../context/ContextProvider';
import { BarChart, Button, LineChart, Piechart, Table } from '../components'
import { earningData } from '../Data/dummy';


const Home = () => {
  const { currentColor, } = useStateContext();
  return (
    <div className='mt-24'>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl flex items-center"><TbCurrencyNaira/>63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <TbCurrencyNaira />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color='white'
              bgColor= { currentColor }
              text= "Download"
              borderRadius= '10px'
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div 
              key={item.title}
              className='bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 rounded-2xl'
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center m-3">
        <div>
          <div className="rounded-2xl md:w-400 p-4 m-3" style={{ backgroundColor: currentColor}}>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-white text-2xl">Earnings</p>
              <div>
                <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>
            <div className='mt-4'>
              <BarChart />
            </div>
          </div>
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10'>
            <div>
              <p className="text-2xl font-semibold">$43,246</p>
              <p className="text-gray-400">Yearly Bookings</p>
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
            <LineChart />
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