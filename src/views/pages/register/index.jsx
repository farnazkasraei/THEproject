import DynamicTable from '@/components/table';
import React from 'react';

export default function Register() {
  const headers = ['ID', 'Name', 'Email'];
  const data = [
    { ID: 1, Name: 'Alice', Email: 'alice@example.com' },
    { ID: 2, Name: 'Bob', Email: 'bob@example.com' },
    { ID: 3, Name: 'Charlie', Email: 'charlie@example.com' },
  ];
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='flex justify-center h-screen w-2/3'>
        <DynamicTable
          headers={headers}
          data={data}
          className='bg-gray-50 text-black'
          style={{ border: '2px solid black' }}
        />
      </div>
    </div>
  );
}
