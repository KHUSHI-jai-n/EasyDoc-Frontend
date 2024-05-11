'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getTime } from 'date-fns'

function MyBooking () {
  const { user } = useKindeBrowserClient()
  const [bookingList, setBookingList] = useState([])
  useEffect(() => {
    user && getUserBookingList()
  }, [user])
  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then(resp => {
      console.log(resp.data.data)
      setBookingList(resp.data.data)
    })
  }
  /**
   * Used to filter User Booking
   * @param {} type 
   * @returns 
   */
  const filterUserBooking = type => {
    const result = bookingList.filter(item =>
      type == 'upcoming'
        ? new Date(item.attributes.Date) >= new Date() 
        : new Date(item.attributes.Date) <= new Date()
    )
    console.log(result)
    return result
  }
  return (
    <div className='px-4 sm:px-10 mt-10'>
      <h2 className='font-bold text-2xl'>My Booking</h2>
      <Tabs defaultValue='account' className='w-full mt-5'>
        <TabsList className='w-full justify-start'>
          <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
          <TabsTrigger value='expired'>Expired</TabsTrigger>
        </TabsList>
        <TabsContent value='upcoming'>
          <BookingList bookingList={filterUserBooking('upcoming')} expired={false} updateRecord={()=>getUserBookingList()}/>
        </TabsContent>
        <TabsContent value='expired'>
          <BookingList bookingList={filterUserBooking('expired')} expired={true} updateRecord={()=>getUserBookingList()}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyBooking
