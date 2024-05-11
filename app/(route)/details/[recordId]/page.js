'use client'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { useState } from 'react'
import React, { useEffect } from 'react'
import DoctorDetails from './_components/DoctorDetails'
import DoctorSuggestionList from './_components/DoctorSuggestionList'

function Details ({ params }) {
  const [doctor, setDoctor] = useState()
  useEffect(() => {
    getDoctorById()
  }, [])
  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then(resp => {
      console.log(resp)
      setDoctor(resp.data.data)
    })
  }
  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
      {/* Doctors details */}
        <div className='col-span-3 '>
        {doctor && 
          <DoctorDetails doctor={doctor}/>
        }
        </div>
        <div>
      {/* Doctor suggestions */}
          <DoctorSuggestionList/>
        </div>
      </div>
    </div>
  )
}

export default Details
