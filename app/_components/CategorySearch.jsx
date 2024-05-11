"use client"
import React, { useEffect } from 'react'
import {useState} from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Search } from 'lucide-react'
import GlobalApi from './_utils/GlobalApi'
import Link from 'next/link'

function CategorySearch() {

  const [categoryList, setCategoryList]= useState([]);
  useEffect(()=>{
    getCategoryList(); 
  },[])

  const getCategoryList=()=>{
    GlobalApi.getCategory().then(resp=>{
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    })
  }

  return (
    <div className='mb-10 px-5 items-center flex flex-col gap-4'>
      <h2 className='font-bold text-4xl'>Search <span className='text-teal-600'>Doctors</span></h2>
      <h2 className='text-gray-500 text-xl'>Search Your Doctor and Book Appointment in one click</h2>
      <div className="flex w-full max-w-sm  mt-3 items-center space-x-2">
    </div>
      {/* Display List of Category */}

      <div className='grid  grid-cols-3 md:grid-cols-4 lg-grid-cols-6'>
      {categoryList.length>0 ? categoryList.map((item,index)=>(
        <Link href={'/search/'+item.attributes.Name} key={index} className='flex flex-col text-center items-center p-5 bg-blue-50 m-2 rounded-md gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer'>
          <Image src={item.attributes?.Icon?.data?.attributes?.url} alt='icon' width={40} height={40}/>
          <label className='text-teal-600 text-sm'>{item?.attributes?.Name}</label>
        </Link>
      ))
      :
      [1,2,3,4,5,6,7].map((item,index)=>(
        <div className='h-[100px] w-[150px] m-2 bg-slate-200 animate-pulse rounded-md '>

        </div>
      ))
      }
      </div>
    </div>
  )
}

export default CategorySearch
