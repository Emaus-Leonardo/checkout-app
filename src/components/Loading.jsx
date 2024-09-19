import React from 'react'
import { MoonLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-2'>
      <MoonLoader color="#10B981" size={60} />
      <div className="font-bold text-2xl">Finalizando a Compra...</div>
    </div>
  )
}
