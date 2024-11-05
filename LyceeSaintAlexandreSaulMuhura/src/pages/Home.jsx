import React from "react"
import heroImg from "../components/assets/images/hero.png"
import { BsFillLightningChargeFill } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { About } from "./About"
import { Courses } from "./WhyLycee"
import { Instructor } from "./ContactUs"
import { Blog } from "./NewsEvent"
import { FaDesktop } from "react-icons/fa";
import { FaPlug } from "react-icons/fa";


export const Home = () => {
  return (
    <>
      <HomeContent />
      <About />
      <br />
      <br />
      <br />
      <Courses />
      <Instructor />
      <Blog />
    </>
  )
}
export const HomeContent = () => {
  return (
    <>
      <section className='bg-secondary py-10 h-[92vh] md:h-full'>
        <div className='container'>
          <div className='flex items-center justify-center md:flex-col'>
            <div className='left w-1/2 text-black md:w-full'>
              <h1 className='text-4xl leading-tight text-black font-semibold'>
                Welcome To<br /> Lycée Saint Alexandre Sauli de Muhura <br />
              </h1>

              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="/degrees" className="text-green-700 hover:underline">
                      Barnabite Fathers
                    </a>
                  </li>
                  <li>
                    <a href="/campus" className="text-green-700 hover:underline">
                      Academic
                    </a>
                  </li>
                </ul>
              </nav>

              <h3 className='text-lg mt-10'>INNOVATE TOGETHER FOR  SUCCESS</h3>

            </div>

            <div className='right w-1/2 md:w-full relative'>
              <div className='images relative'>
                {/* <img src={heroImgback} alt='' className=' absolute top-32 left-10 w-96 md:left-10' /> */}
                <div className='img h-[95vh] w-full'>
                  <img src={heroImg} alt='' className='h-[95%] w-[93%] object-contain z-20 relative rounded-lg' />
                </div>

              </div>
              <div className='content'>
                <button className='bg-white shadow-md absolute top-56 left-0 z-30 p-2 flex items-center rounded-md'>
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400'>
                    <BsFillLightningChargeFill size={19} />

                  </div>
                  <div className='text flex flex-col items-start px-4'>
                    <span className='text-sm text-black'>Computer System and Architecturee </span>
                  </div>
                </button>
                
                <button className='bg-white shadow-md absolute bottom-32 left-48 z-30 p-2 flex items-center rounded-md pr-8' style={{ width: '328px' }}>
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-blue-400'>

                    <FaPlug size={20} />
                  </div>
                  <div className='text flex flex-col items-start px-2'>
                    <span className='text-sm text-black'>Network and Internet Technology</span>
                  </div>
                </button>

                <button className='bg-white shadow-md absolute top-56 -right-32 z-30 p-2  md:top-96 md:-right-5 flex items-center rounded-md'>
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400'>
                    <FaUsers size={23} />
                  </div>
                  <div className='text flex flex-col items-start px-0'>
                    <span className='text-sm text-black'> Accounting</span>
                    {/* <span className='text-[12px]'>Tomorrow is our</span> */}
                  </div>
                </button>
                <button className='bg-white shadow-md absolute top-32 right-32 z-30 p-2 flex items-center rounded-md'>
                  <div className='icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-indigo-400'>
                    <FaDesktop size={20} /> {/* Replace the previous icon with the computer icon */}
                  </div>
                  <div className='text flex flex-col items-start px-2'>
                    <span className='text-sm text-black'>Software Development</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
