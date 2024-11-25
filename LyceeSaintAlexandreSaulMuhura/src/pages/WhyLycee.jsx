import React from "react";
import { courses } from "../components/assets/data/dummydata";
import { GiBookshelf } from "react-icons/gi";
// import { FaBook } from "react-icons/fa";
// import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export const Courses = () => {
  return (
    <>
      <section className='courses bg-[#F3F4F8] py-8'>
        <div className='w-4/5 m-auto'>
          <div className='heading mb-16'>
            <h1 className='text-3xl font-semibold text-black'>
              Supporting Your Success <br />
            </h1>
            <span className='text-sm mt-2 block'>A Place to Grows</span>
          </div>
          <div className='grid grid-cols-3 gap-8 md:grid-cols-1'>
            {courses.map((item) => (
              <div key={item.id} className='box rounded-lg shadow-shadow1 bg-white'>
                <div className='images rounded-t-lg relative overflow-hidden h-40 w-full'>
                  <img
                    src={item.cover}
                    alt=''
                    className='rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300'
                  />
                  <div className='categ flex gap-4 absolute top-0 m-3'>
                    <span className='text-[14px] bg-blue-700 p-1 px-3 text-white shadow-md'>
                      {item.CourseName} {/* Display CourseName dynamically */}
                    </span>
                    {/* If you want another fixed category, uncomment and adjust this line */}
                    <span className='text-[14px] bg-pink-700 p-1 px-3 text-white shadow-md'>
                      Lifestyle {/* This can be another category or static text */}
                    </span>
                  </div>
                </div>
                <div className='text p-3'>
                  <div className='flex justify-between items-center'>

                  </div>
                  <div className='flex items-center'>
                  <GiBookshelf className='mr-2' /> {/* Add margin to the right of the icon */}
                    <h3 className='text-black font-medium h-13'>{item.title}</h3>
                  </div>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 p-3'>
                  <span className='text-sm text-primary'>OPTION</span>
                  <NavLink to='/' className='text-[14px] ml-2 flex items-center'>
                  Explore More<HiOutlineArrowNarrowRight />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
