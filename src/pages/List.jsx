import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Datatable, Header } from '../components';

const List = ({ columns }) => {
    const location = useLocation(); 
    const path = location.pathname.split("/")[1];
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        <div className="flex justify-between items-center">
            <Header category={path} title = {`All ${path}`} />
            <Link to={`/${path}/new`} className="text-sm md:text-lg text-green-800 p-1 border-1 border-green-800 rounded-lg hover:text-white hover:bg-green-800">
                Add New
            </Link>
        </div>
        <Datatable columns = {columns} path = {path} />
    </div>
  )
}

export default List