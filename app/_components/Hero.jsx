import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'

function Hero () {
  return (
    <section>
      <script src='https://cdn.botpress.cloud/webchat/v2/inject.js'></script>
      <script src='https://mediafiles.botpress.cloud/d1771933-8586-4e1c-9556-1640a2b4c1dc/webchat/v2/config.js'></script>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16'>
          <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full'>
            <Image
              alt='doctor'
              src='/doctors.jpg'
              width={700}
              height={600}
              className='absolute inset-0 h-full w-full object-cover rounded-l'
            />
          </div>

          <div className='lg:py-24'>
            <h2 className='text-3xl font-bold sm:text-4xl'>
              Find & Book <span className='text-teal-600'>Appointment</span>{' '}
              with your Favourite <span className='text-teal-600'>Doctors</span>
            </h2>

            <p className='mt-4 text-gray-600 tracking-wide'>
            Welcome to EasyDoc, your go-to solution for hassle-free medical appointment booking! With EasyDoc, scheduling your next doctor's visit is as simple as a few clicks. Say goodbye to long waiting times and endless phone calls! Our platform connects you with trusted healthcare providers in your area, allowing you to choose the perfect appointment time that fits your schedule.<br/><br />
            Whether you need to see a specialist, a family physician, or a dentist, EasyDoc has you covered!
            </p>

            <Button className='mt-10'>Explore Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
