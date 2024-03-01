import {  FileQuestion } from 'lucide-react'
import React from 'react'

interface IappProps {
  title: string;
  description: string
}

const NoItem = ({title, description}: IappProps) => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10'>
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
            <FileQuestion className='w-10 h-10 text-primary'/>
        </div>

        <h2 className='mt-6 text-xl font-semibold'>{title} </h2>
        <p className='text-center mt-2 text-sm text-muted-foreground'>{description}</p>
    </div>

  )
}

export default NoItem