import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { CalendarDays, Clock } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { toast } from 'sonner'

function BookAppointment ({doctor}) {
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState([]) 
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const[note, setNote]=useState([]);
  const {user} = useKindeBrowserClient();
  useEffect(()=>{
    getTime();
  },[])
  const getTime = () =>{
    const timeList = [];
    for(let i = 8 ; i<=12 ; i++){
        timeList.push({
            time: i+':00 AM'
        })
        timeList.push({
            time: i+':30 AM'
        })
    }
    for(let i = 1 ; i<=6 ; i++){
        timeList.push({
            time: i+':00 PM'
        })
        timeList.push({
            time: i+':30 PM'
        })
    }
    setTimeSlot(timeList)
  }
  const isPastDay=(day)=>{
    return day<=new Date();
  }
  const saveBooking=()=>{
    const data = {
        data:{
          Username:user?.given_name+" "+user?.family_name,
          Email: user?.email,
          Date : date,
          Time : selectedTimeSlot,
          Note: note,
          doctor : doctor?.id
        }
    }
    GlobalApi.bookAppointment(data).then(resp=>{
      console.log(resp);
      if(resp){
        // GlobalApi.sendEmail(data).then(resp=>{
        //   console.log(resp);
        // })
        console.log(resp)
        toast("Booking Confirmed")
      }
    })
  }
  console.log("form note ", note)
  return (
    <Dialog>
      <DialogTrigger>
        <Button className='mt-3 rounded-full bg-teal-600 hover:bg-teal-400 '>
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div className='w-4 md:w-full'>
              <div className='grid md:grid-cols-2 mt-5'>
                {/* Calender */}
                <div className='flex flex-col gap-3 items-baseline'>
                <h2 className='flex gap-2 items-center'>
                <CalendarDays className='text-teal-600 h-5 w-5'/>
                Select Date
                </h2>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className='rounded-md border'
                  />
                </div>
                {/* Time slot */}
                <div className='mt-3 md:mt-0'>
                    <h2 className='flex gap-2 mb-3 items-center'><Clock className='text-teal-600 h-5 w-5'/> Select Time Slot</h2>
                    <div className='grid grid-cols-3 gap-2 border rounded-lg p-3'>
                        {timeSlot.map((item,index) => (
                            <h2 onClick = {()=>setSelectedTimeSlot(item.time)}className={`p-2 border text-center hover:bg-teal-600 hover:text-white cursor-pointer rounded-full ${item.time==selectedTimeSlot&& 'bg-teal-600 text-white'}`}>{item.time}</h2>
                        ))}
                    </div>
                </div>
              </div>
            </div>
            <div>
                {/* <textarea onChange={setNote((e)=>e.target.value)} placeholder='Note' rows={3} cols={85} id="" className='rounded-lg'></textarea> */}
                <input type="text" placeholder='Note' value={note} onChange={(e)=>{setNote(e.target.value)}} className='rounded-lg h-10 w-full'/>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
          <>
            <Button type="button" className="text-red-500 border-red-500 hover:text-red-500 hover:scale-105 transition-all ease-in-out" variant="outline">
              Close
            </Button>
            <Button type="button" disabled={!(date&&selectedTimeSlot)} className="bg-teal-600 text-white" onClick={()=>saveBooking()}>
              Submit
            </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
