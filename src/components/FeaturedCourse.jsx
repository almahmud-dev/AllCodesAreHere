import featured1 from '../../src/assets/images/Featured-Course/featured1.png'
import featured2 from '../../src/assets/images/Featured-Course/featured2.png'
import featured3 from '../../src/assets/images/Featured-Course/featured3.png'
import featured4 from '../../src/assets/images/Featured-Course/featured4.png'
import featured5 from '../../src/assets/images/Featured-Course/featured5.png'
import featured6 from '../../src/assets/images/Featured-Course/featured6.png'

import { CiShoppingCart } from "react-icons/ci";

const FeaturedCourse = () => {
     const work = [
        {
            id: 1,
            image: featured1,
            title: 'Motion Graphics: Create a Nice Typography Animation',
            desc: '5,957 Students',
            price: '$33.99',
            desc1: '01h 49m',
        },
        {
            id: 2,
            image: featured2,
            title: 'The Complete Financial Analyst Training & Investing',
            desc: '5,957 Students',
            price: '$45.99',
            desc1: '01h 49m',
        },
        {
            id: 3,
            image: featured3,
            title: 'Education Software and PHP and JS System Script',
            desc: '5,957 Students',
            price: '$33.99',
            desc1: '01h 49m',
        },
        {
            id: 4,
            image: featured4,
            title: 'Marketing 2023: Complete Guide To Instagram Growth',
            desc: '5,957 Students',
            price: '$33.99',
            desc1: '01h 49m',
        },
        {
            id: 5,
            image: featured5,
            title: 'Advance PHP knowledge with JS to make smart web',
            desc: '5,957 Students',
            price: '$33.99',
            desc1: '01h 49m',
        },
        {
            id: 6,
            image: featured6,
            title: 'Learn 3D Modelling and Design for Beginners',
            desc: '5,957 Students',
            price: '$33.99',
            desc1: '01h 49m',
        },
    ]
  return (
    <>
     <section className='bg-[linear-gradient(180deg,#D9ECFF_0%,#F0F3FF00_70%)] py-10 lg:py-30'>
        <div className="container">
            <h3 className='text-[#323232] text-[45px] font-rowdies leading-17.5 font-normal tracking-[-3px] text-center pb-12'>Featured <span className='text-[#2AAA94]'>Course</span></h3>
            <p className='text-[16px] sm:text-[20px] lg:text-[25px] text-[#4E596B] leading-relaxed lg:leading-8.75 font-saira text-center mx-auto w-full md:w-3/4 lg:w-172.5 pb-10 lg:pb-23'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporidunt ut labore veniam...</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-11">
                {
                    work.map(item => (
                <div key={item} className='bg-[#FFFFFF] rounded-[20px] filter drop-shadow-[0px_4px_4px_#D9ECFF80]'>
                    <img src={item.image} className='w-full' alt="" />
                    <div className='px-7.75 pb-8.75'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[#4E596B] sm:text-[14px] text-[14px] font-saira font-medium sm:leading-5 leading-8.75 pt-7.25'>{item.desc}</p>
                            <p className='text-[#4E596B] sm:text-[14px] text-[14px] font-saira font-medium sm:leading-5 leading-8.75 mt-8'>{item.desc1}</p>
                        </div>
                        <h3 className='text-[#324361] sm:text-[17px] text-[25px] font-saira font-semibold leading-5 pt-5.25'>{item.title}</h3>
                        <div className='flex justify-between items-center w-full'>
                            <p className='text-[#324361] sm:text-[19px] text-[22px] font-saira font-semibold leading-5 pt-8.75'>{item.price}</p>
                            <CiShoppingCart className='w-6.5 h-6.5 mt-8'/>
                        </div>
                    </div>
                </div>
                    ))
                }
            </div>
            <div className='flex justify-center pt-10 lg:pt-27'>
                <button className="signup py-5 px-9 bg-linear-to-br from-[#083f9b] to-[#7f56d9] text-white rounded-lg font-saira ">
              Explore courses
            </button>
            </div>
        </div>
    </section>
    </>
  )
}

export default FeaturedCourse