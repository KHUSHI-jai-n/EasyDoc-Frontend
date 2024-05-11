"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
// import Command from '@/components/ui/command'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function CategoryList () {
  
  const [categoryList, setCategoryList] = useState([])
  const params = usePathname();
  const category = params.split('/')[2];
  useEffect(() => {
    getCategoryList();
    console.log(category)
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log(resp.data.data)
      setCategoryList(resp.data.data)
    })
  }
  return (<div className='h-screen mt-5 flex flex-col'>
  {/* <Command></Command> */}
    <Command>
  <CommandInput placeholder="Search..." />
  <CommandList className='overflow-visible'>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
    {categoryList && categoryList.map((item,index)=>(
        <CommandItem key={index}>
        <Link className={`p-2 flex gap-2 text-[14px] text-teal-600 rounded-md cursor-pointer items-center w-full ${category==item.attributes.Name&&'bg-blue-100 text-teal-900'}`}  href={'/search/'+item?.attributes?.Name}>
            <Image src={item.attributes?.Icon?.data?.attributes?.url}  alt='icon' height={25} width={25}/>
            <label>{item.attributes.Name}</label>
        </Link>
        </CommandItem>
    ))}
    </CommandGroup>
  </CommandList>
</Command>

  </div>)
}

export default CategoryList
