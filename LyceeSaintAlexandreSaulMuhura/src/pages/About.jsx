import React from "react"
import aboutImg from "../components/assets/images/about.jpg"
// import aboutImgBanner from "../components/assets/images/about-banner.jpg"
import { AiOutlineCheck } from "react-icons/ai"

export const About = () => {
  return (
    <>
      <section className='about py-4'>
        <div className='container'>
          <div className='heading text-center py-1'>
            <span className='text-sm mt-2 block text-red-500 font-bold'>REASONS TO CHOOSE</span>
            <h1 className='text-6xl font-bold text-gray-800 tracking-tight'>St. Saint Alexandre Sauli Secondary School</h1>
          </div>
          {/* <div className='grid grid-cols-4 gap-5 mt-5 md:grid-cols-2'>
            <AboutCard color='bg-[#2D69F0]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#DD246E]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#8007E6]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#0CAE74]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
          </div> */}
        </div>
      </section>
      <AboutContent />
    </>
  )
}
export const AboutCard = (props) => {
  return (
    <div className={`box shadow-md p-5 py-8 rounded-md text-white ${props.color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300 `}>
      <div className='icon'>{props.icon}</div>
      <div className='text mt-5'>
        <h4 className='text-lg font-semibold my-3'>{props.title}</h4>
        <p className='text-sm'>{props.desc}</p>
      </div>
    </div>
  )
}

export const AboutContent = () => {
  return (
    <section className='mb-16'>
      <div className='container flex md:flex-col'>
        <div className='left w-1/3 md:w-full mr-8 md:mr-0 relative'>
          <img src={aboutImg} alt='aboutImg' className=' rounded-xl' />
          {/* <img src={aboutImgBanner} alt='aboutImg' className='rounded-xl absolute -bottom-12 -left-24 h-56 md:left-80' /> */}
          <div className='img-group ml-24 mt-3'>
          </div>
          <span className='text-sm mt-2 block text-black text-center w-full'>Père Mario Maria Falconi</span>
          <span className='text-sm mt-2 block'>Co-founder and Former Head Master</span>
        </div>
        <div className='right w-3/4 md:w-full md:mt-16'>
          <div className='heading' style={{ width: '99%' }}>
            <h1 className='text-2xl font-semibold text-black relative inline-block'>
              Vision and Values
              <span className='block w-1/5 h-1 bg-green-500 absolute left-0 bottom-0'></span>
            </h1><br></br>
            <div className='text-sm mt-2 leading-6 w-full text-crimson mb-4'>
              Lycée Saint Alexandre Sauli Muhura is a secondary school funded by the Barnabite Fathers of the Catholic Church, focused on helping students achieve high academic standards in a supportive, Christian environment. Guided by the Church, students develop strong morals, a sense of community, and a commitment to service, preparing them for success in their education and future contributions to society.
            </div>
            <h1 className='text-2xl font-semibold text-black relative inline-block'>
            History & Location
              <span className='block w-1/5 h-1 bg-green-500 absolute left-0 bottom-0'></span>
            </h1><br></br>

            <div className='text-sm mt-2 leading-6 w-full text-crimson'>
              Now known as Lycée Saint Alexandre Sauli de Muhura, was founded on September 17, 1990, by the Barnabite Fathers, who initiated the project with the local mayor's support. Initially operating under the name ASSOPEM, the school aimed to serve the community, apply the Barnabite charism, and support the country’s sustainable development. The school opened with two academic tracks in <b>Law</b>, <b>Administration</b> and <b>Economics</b>.
            </div>

            <div className='text-sm mt-2 leading-6 w-full text-crimson'>
            In 1991, the Barnabite Fathers sought full control to establish it as a private, subsidized institution. By 1992, the government recognized it as such, and on October 7, 1992, the foundations were laid for new facilities. Since then, the school has focused on practical, skill-based education to prepare students for independent work and entrepreneurship, offering programs in:
            </div>
            
            <ul className='my-5'>
              <li className='text-sm flex items-center gap-5 text-black'>
                <AiOutlineCheck className='text-green-500' /> Accounting
              </li>
              <li className='text-sm flex items-center gap-5 text-black'>
                <AiOutlineCheck className='text-green-500' /> Fashion Design / (FAD)

              </li>
              <li className='text-sm flex items-center gap-5 text-black'>
                <AiOutlineCheck className='text-green-500' /> Software Development / (SWD)
              </li>
              <li className='text-sm flex items-center gap-5 my-2 text-black'>
                <AiOutlineCheck className='text-green-500' /> Network and Internet Technology / (NIT)
              </li>
              <li className='text-sm flex items-center gap-5 text-black'>
                <AiOutlineCheck className='text-green-500' /> Computer System and Architecture / (CSA)
              </li>
            </ul>
            <div className='text-sm mt-2 leading-6 w-full text-crimson'>
            Today, Lycée Saint Alexandre Sauli Muhura serves 657 students, fostering job readiness and reducing unemployment in the community. The school officially received accreditation in 2010, marking a milestone in its mission to provide quality education aligned with the Barnabite Fathers’ values.
            </div>
            <button style={{ backgroundColor: 'brown', color: 'white' }} className='px-5 py-2 border border-gray-300 rounded-md text-sm'>
              More News &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
