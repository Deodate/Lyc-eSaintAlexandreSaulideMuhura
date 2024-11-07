import React from "react"
import logImg from "../assets/images/logo-black.png"
import { NavLink } from "react-router-dom"

export const Footer = () => {
  return (
    <>
      <footer className='bg-[#F3F4F8] py-5 pt-10 mt-10'>
      <div className='container grid grid-cols-4 gap-5 md:grid-cols-2'>
        <div className='logo mb-6'>
          <img src={logImg} alt='Logo' className='h-5 mb-3' />
          <span className='text-[14px]'>
            Great lesson ideas and lesson plans for ESL teachers! Educators can customize lesson plans to best.
          </span>
        </div>

        <ul className='mb-6'>
          <h4 className='text-black text-sm font-semibold mb-5'>INFORMATION FOR</h4>
          <NavLink to='#' className='text-[14px] block mb-2'>Contact</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Portfolio</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Blog</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Our team</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Get in Touch</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>FAQ</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Latest news</NavLink>
        </ul>

        <ul className='mb-6'>
          <h4 className='text-black text-sm font-semibold mb-5'>RESOURCES</h4>
          <NavLink to='#' className='text-[14px] block mb-2'>Shop</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Pricing</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Blog</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Landing</NavLink>
        </ul>

        <ul className='mb-6'>
          <h4 className='text-black text-sm font-semibold mb-5'>SOCIAL MEDIA</h4>
          <NavLink to='#' className='text-[14px] block mb-2'>About us</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Contact</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Reviews</NavLink>
          <NavLink to='#' className='text-[14px] block mb-2'>Services</NavLink>
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
