import React from "react"
import logImg from "../assets/images/logo-black.png"
import { NavLink } from "react-router-dom"

export const Footer = () => {
  return (
    <>
      <footer className='bg-[#273a40] py-5 pt-10 mt-10'>
        <div className='container grid grid-cols-4 gap-5 md:grid-cols-2'>
          <div className='logo mb-6'>
            <img src={logImg} alt='Logo' className='h-5 mb-3' />
            <span className='text-[14px]'>
              Great lesson ideas and lesson plans for ESL teachers! Educators can customize lesson plans to best.
            </span>
          </div>

          <ul className='mb-6'>
            <h4 className='text-white text-sm font-semibold mb-5'>INFORMATION FOR</h4>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>School Chapel (Opening Hours)</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Accommodation</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Current Students</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Our Staff</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>School Space</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Football Team</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Handball Team</NavLink>
          </ul>

          <ul className='mb-6'>
            <h4 className='text-white text-sm font-semibold mb-5'>RESOURCES</h4>
            <NavLink to="https://www.mineduc.gov.rw/" target="_blank" rel="noopener noreferrer" className='text-[#ababb6] text-[14px] block mb-2 underline'>
              MINEDUC
            </NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>WDA</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>REB</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>NESA</NavLink>
          </ul>

          <ul className='mb-6'>
            <h4 className='text-white text-sm font-semibold mb-5'>SOCIAL MEDIA</h4>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Facebook</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Instagram</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Youtube</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Google</NavLink>
          </ul>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className='bg-[#E5E7EB] text-center py-4'>
        <p className='text-[12px] text-gray-600'>
          &copy; {new Date().getFullYear()} The Lycée Saint Alexandre Sauli Muhura. All rights reserved.
        </p>
      </div>

    </>
  )
}
