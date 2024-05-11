import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointments from './CancelAppointments'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { toast } from 'sonner'

function BookingList ({ bookingList, expired, updateRecord }) {
  const onDeleteBooking=(item)=>{
      GlobalApi.deleteBooking(item.id).then(resp=>{
        console.log(resp);
        if(resp){
          toast('Appointment Cancelled')
          updateRecord()
        }
      })
  }
  return (
    <div>
      {bookingList&&bookingList.map((item, index) => (
          <div className='flex gap-4 items-center m-3 p-3 border rounded-md' key={index}>
            <Image
              src={item.attributes.doctor.data.attributes?.Image?.data[0].attributes?.url}
              alt='doctor-image'
              className='rounded-full object-cover h-[70px] w-[70px]'
              width={70}
              height={70}
            />
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] items-center flex justify-between'>{item.attributes.doctor.data.attributes.Name}
              {!expired&&<CancelAppointments onContinueClick={()=>onDeleteBooking(item)}/>}
              </h2>
              <h2 className='flex gap-2 text-[14px] text-gray-500'><MapPin className='text-teal-600 size-5'/>{item.attributes.doctor.data.attributes.Address}</h2>
              <h2 className='flex gap-2 text-[14px]'><Calendar className='text-teal-600 size-5'/>Appointment on: {moment(item.attributes.Date).format('DD-MMM-YYYY')}</h2>
              <h2 className='flex gap-2 text-[14px]'><Clock className='text-teal-600 size-5'/> At time: {item.attributes.Time}</h2>
            </div>
          </div>
        )) }
    </div>
  )
}

export default BookingList
