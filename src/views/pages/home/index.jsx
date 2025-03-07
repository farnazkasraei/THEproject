import P from '@/components/translate';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  return (
    <div className='flex w-full h-screen flex-col justify-center items-center'>
      <h2>
        <P translate>welcome</P>
      </h2>
    </div>
  );
}
