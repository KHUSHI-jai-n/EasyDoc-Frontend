import GlobalApi from '@/app/_components/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

function DoctorSuggestionList() {
  const [doctorList,setDoctorList]=useState([]);
  useEffect(()=>{
    getDoctorList();
  },[]);
  const getDoctorList=()=>{
    GlobalApi.getDoctor().then(resp=>{
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    })
  }
  return (
    <div className='p-4 border-[1px] mt-5 md:ml-5'>
      <h2 className='mb-3 font-bold'>Suggestions</h2>
        {doctorList.map((doctor,index)=>(
            <Link href={'/details/'+doctor.id}><div className='mb-4 p-3 shadow-sm w-full cursor-pointer hover:bg-slate-100 rounded-lg flex items-center gap-3'>

              <Image src={doctor.attributes?.Image?.data[0].attributes?.url} height={70} width={70} alt='doctor-image' className='w-[70px] h-[70px] rounded-full'/>

              <div className='mt-3 flex-col flex gap-2'>
              <h2 className='font-normal text-xs bg-blue-50 p-1 text-teal-600 rounded-full'>{doctor.attributes?.category?.data?.attributes?.Name}</h2>
                <h2 className='text-[14px] font-bold'>{doctor.attributes?.Name}</h2>
                <h2 className='text-sm text-teal-600'>{doctor.attributes?.Years_of_Experience} years </h2>
              </div>
              
            </div>
            </Link>
        ))}
    </div>
  )
}

export default DoctorSuggestionList
