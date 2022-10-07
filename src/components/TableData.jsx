import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { tableData } from '../Data/dummy';

const TableData = () => {
    
  return (
    <TableContainer component={Paper} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="dark:text-gray-200">Tracking ID</TableCell>
            <TableCell className="dark:text-gray-200">Product</TableCell>
            <TableCell className="dark:text-gray-200">Customer</TableCell>
            <TableCell className="dark:text-gray-200">Date</TableCell>
            <TableCell className="dark:text-gray-200">Amount</TableCell>
            <TableCell className="dark:text-gray-200">Payment Method</TableCell>
            <TableCell className="dark:text-gray-200">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="dark:text-gray-200">{row.id}</TableCell>
              <TableCell className="dark:text-gray-200">
                <div className="flex items-center">
                  <img src={row.img} alt="" className="w-8 h-8 rounded-full mr-5 object-cover" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="dark:text-gray-200">{row.customer}</TableCell>
              <TableCell className="dark:text-gray-200">{row.date}</TableCell>
              <TableCell className="dark:text-gray-200">{row.amount}</TableCell>
              <TableCell className="dark:text-gray-200">{row.method}</TableCell>
              <TableCell className="dark:text-gray-200">
                <span className={`p-2 rounded-md ${ row.status === 'Approved' ? 'bg-green-300 text-green-800' : 'bg-emerald-50 text-amber-500' }`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableData;