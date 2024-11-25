import React from "react"
import logImg from "../assets/images/logo-black.png"
import { NavLink } from "react-router-dom"

export const Footer = () => {
  return (
    <>
      <footer className='bg-[#273a40] py-5 pt-10 mt-10'>
        <div className='container grid grid-cols-4 gap-20 md:grid-cols-3 pl-0'>
          <div className='logo mb-6'>
            <img src={logImg} alt='Logo' className='w-15 h-15 mb-3' />
            <ul className='mb-6'>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>St. Alexandre Sauli</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>Sector, Muhura</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>District, Gatsibo</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>Easter Province</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>Region Easter Africa, Rwanda</NavLink>
          </ul>
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

          {/* <ul className='mb-6'>
            <h4 className='text-white text-sm font-semibold mb-5'>RESOURCES</h4>
            <NavLink to="https://www.mineduc.gov.rw/" target="_blank" rel="noopener noreferrer" className='text-[#ababb6] text-[14px] block mb-2 underline'>
              MINEDUC
            </NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>WDA</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>REB</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>NESA</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Library</NavLink>
          </ul> */}

          <ul className='mb-6'>
            <h4 className='text-white text-sm font-semibold mb-5'>SOCIAL MEDIA</h4>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Facebook</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Instagram</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2 underline'>Youtube</NavLink>
            <NavLink to="https://www.vaticannews.va/en/pope/news/2023-05/pope-to-barnabites-run-like-mad-toward-god-and-toward-others.html" target="_blank" rel="noopener noreferrer" className='text-[#ababb6] text-[14px] block mb-2 underline'>
            Vatican
            </NavLink>
          </ul>

          <ul className='mb-6'>
            <h4 className='text-white text-sm font-semibold mb-5'>CONTACT</h4>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>Phone: (+250) 788-862-998</NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>WhatsApp: (+250) 788-862-998 </NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>E-mail: </NavLink>
            <NavLink to='#' className='text-[#ababb6] text-[14px] block mb-2'>Sector: Muhura, District: Gatsibo, Province: East </NavLink>
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
