import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import BookAppointment from './BookAppointment'

function DoctorDetails ({ doctor }) {
  const socialMediaList = [
    {
      id: 1,
      icon: '/twitter.png',
      url: ''
    },
    {
      id: 2,
      icon: '/linkedin.png',
      url: ''
    },
    {
      id: 3,
      icon: '/facebook.png',
      url: ''
    }
  ]
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
        <div>
          {/* doctor image */}
          <Image
            src={doctor.attributes?.Image?.data[0].attributes?.url}
            width={200}
            height={200}
            alt='doctor-image'
            className='rounded-md h-[280px] object-cover w-full '
          />
        </div>
        <div className='col-span-2 mt-5 flex flex-col gap-3 items-baseline md:px-10'>
          {/* doctor info */}
          <h2 className='font-bold text-2xl'>{doctor.attributes?.Name}</h2>
          <h2 className='flex gap-2 text-gray-500 text-md'>
            <GraduationCap />
            <span>
              {doctor.attributes?.Years_of_Experience} years of experience
            </span>
          </h2>
          <h2 className='flex gap-2 text-gray-500 text-md'>
            <MapPin />
            <span>{doctor.attributes.Address}</span>
          </h2>
          <h2 className='text-[12px] bg-blue-50 p-1 font-medium text-teal-600 rounded-full px-2'>
            {doctor.attributes?.category?.data?.attributes?.Name}
          </h2>
          <div className='flex gap-3'>
            {socialMediaList.map((item, index) => (
              <Image
                src={item.icon}
                key={index}
                height={30}
                width={30}
                alt='icon'
              />
            ))}
          </div>
          <BookAppointment doctor={doctor}/>
        </div>
      </div>
      {/* About doctor */}
      <div className='p-3 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>About</h2>
        <p className='text-gray-500 tracking-wide mt-2'>
          {doctor.attributes?.About[0].children[0].text}
        </p>
      </div>
    </>
  )
}

export default DoctorDetails
