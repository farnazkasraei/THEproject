import DynamicTable from '@/components/table';
import P from '@/components/translate';
import { Button } from '@/components/ui/button';
import { toggleSideBar } from '@/store/slices/sideBar';
import { Plus } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function Register() {
  const dispatch = useDispatch();

  const headers = ['name', 'lastName', 'dob', 'email', 'gender', 'uni', 'bio'];

  return (
    <div className='flex flex-col items-center justify-center py-20 px-44'>
      <div className='flex flex-col my-4 w-full'>
        <Button
          variant='solid'
          size='lg'
          className='bg-blue-500 text-white w-10'
          onClick={() => dispatch(toggleSideBar('register'))}
        >
          <Plus />
        </Button>
      </div>
      <div className='flex justify-center h-screen w-full'>
        <DynamicTable
          headers={headers}
          className='bg-gray-50 text-black overflow-x-auto rounded-lg'
          style={{ border: '1px solid #b9b9b9' }}
        />
      </div>
    </div>
  );
}
