import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function DoctorList({doctorList, heading='Popular Doctors'}) {
  return (
    <div className='mb-10 px-8'>
      <h2 className='font-bold text-2xl'>{heading}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4'>
        {doctorList.length>0 ? doctorList.map((doctor,index)=>(
            <div className='border-[1px] rounded-md p-3 cursor-pointer hover:border-teal-400 hover:shadow-sm transition-all ease-in-out' key={index}>
                <Image src={doctor.attributes?.Image?.data[0].attributes?.url} alt='doctor' height={200} width={500} className='h-[200px] w-full object-cover rounded-lg'/>
                <div className='mt-3 items-baseline flex flex-col gap-1'>
                    <h2 className='text-[12px] bg-blue-50 p-1  text-teal-600 rounded-full px-2'>{doctor.attributes?.category?.data?.attributes?.Name}</h2>
                    <h2 className='font-bold'>{doctor.attributes.Name}</h2>
                    <h2 className='text-teal-600 text-sm'>{doctor.attributes?.Years_of_Experience} years</h2>
                    <h2 className='text-gray-500 text-sm'>{doctor.attributes?.Address}</h2>
                    <Link href={'/details/'+doctor.id} className='w-full'>
                    <h2 className='p-2 px-3 border-[1px] text-teal-600 border-teal-600 rounded-full w-full text-center text-[15px] mt-2 cursor-pointer hover:bg-teal-600 hover:text-white'>Book Now</h2>
                    </Link>
                </div>
            </div>
        ))
        : 
        //Skeleton effect
        [1,2,3,4,5,6].map((item,index)=>(
          <div className='h-[220px] bg-slate-100 w-full rounded-md animate-pulse'></div>
        ))
        }
        
      </div>
    </div>
  )
}

export default DoctorList
