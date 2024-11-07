import React from "react"
// import { FaGraduationCap, FaUsers } from "react-icons/fa"
// import { GiEvilBook, GiWorld } from "react-icons/gi"


const items = [
  {
    cover: "../images/Accounting.jpg",
  }

];

export const Instructor = () => {
  return (
    <>
      <section className='instructor mb-16'>
        <div className='container'>
          <div className='flex flex-wrap md:flex-col items-center'>
            {/* Left Side (Text) */}
            <div className='flex-1 p-4 w-[60%]'>
              <h1 className='text-2xl font-semibold text-black mb-4'>Transforming Lives, Every Day</h1>
              <div className='text-[14px] mt-2 block'>
                <p>
                  At Lycée Saint Alexandre Sauli, we are dedicated to making a positive impact on our students' lives every day. Through quality education and strong support, we help students grow academically and personally. Our caring community fosters respect, compassion, and service, empowering students to reach their full potential. Together, we are transforming lives for a brighter future.
                </p>
              </div>
            </div>

            {/* Right Side (Images) */}
            <div className='flex-1 p-4 w-[40%]'>
              {items.map((item, index) => (
                <div key={index} className='images rounded-lg relative overflow-hidden h-52 w-full mb-4'>
                  <img
                    src={item.cover}
                    alt=''
                    className='rounded-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const InstructorCard = (props) => {
  return (
    <div className={`box p-5 py-5 rounded-md`}>
      <div className={`${props.color}`}>{props.icon}</div>
      <div className='text mt-2'>
        <h4 className='text-lg font-semibold text-black'>{props.title}</h4>
        <p className='text-[15px]'>{props.desc}</p>
      </div>
    </div>
  )
}
