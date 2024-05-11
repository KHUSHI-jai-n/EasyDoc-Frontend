"use client"
import React from "react";
import Hero from "./_components/Hero"
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_components/_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {

  const [doctorList, setDoctorList] = useState([]);
  useEffect(()=>{
    getDoctorList();
  },[])
  const getDoctorList=()=>{
    GlobalApi.getDoctor().then(resp=>{
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    })
  }
  return (
    <div>
    {/* Hero section */} 
      <Hero/>
    {/* Search Bar + Categories */}
      <CategorySearch/>
    {/* Popular doctors list */}
      <DoctorList doctorList={doctorList}/>
    </div>
  );
}
