
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia"
const items = [
    {
        id: "01",
        title: "How much time does it take?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: <IoMdAdd />
    },
    {
        id: "02",
        title: "What is your class naming convention?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: <IoMdAdd />
    },
    {
        id: "03",
        title: "How do you communicate?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: <IoMdAdd />
    },
    {
        id: "04",
        title: "I have a bigger project. Can you handle it?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: <IoMdAdd />
    },
    {
        id: "05",
        title: "What is your class naming convention?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: <IoMdAdd />
    },
]
const Faq = () => {
    const [activeId, setActiveId] = useState(null)
    const handleToggle = (id) => {
        setActiveId(activeId === id ? null : id);
    }
    return (
        <div>
            <div className="container">
                <div className="flex flex-col md:flex-row lg:gap-10">
                    <div data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1500" className='w-full md:w-5/12 xl:w-4/12 xl:pr-24'>
                        <h2 className='text-[38px] leading-14 font-semibold mb-4'>Frequently asked questions</h2>
                        <p className='text-lg leading-8 font-medium text-[#2405F2] pb-6 lg:pb-0'>Contact us for more info</p>
                    </div>
                    <div className='w-full md:w-7/12 xl:w-8/12'>
                        {
                            items.map((item) => {
                                return(
                                    <div data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1500" key={item.id}>
                                        <div className={`border-t-2 transition-all duration-300 ease-in-out ${activeId === item.id ? 'border-t-transparent pb-10' : 'border-t-[#ECECF1]'}`}>
                                            <div onClick={() => handleToggle(item.id)} className="flex justify-between items-center py-8">
                                                <div className="flex gap-5 lg:gap-15">
                                                    <div className="text-xl sm:text-2xl sm:leading-9 font-medium text-[#2405F2]">{item.id}</div>
                                                    <div className="text-xl sm:text-2xl sm:leading-9 font-medium cursor-pointer">{item.title}</div>
                                                </div>
                                                <div className={`text-3xl transition-all duration-300 cursor-pointer ${activeId === (item.id) ? 'rotate-180 text-[#2405f2]' : '' }`}>
                                                    {activeId === item.id ? <LiaTimesSolid /> : <IoMdAdd />}
                                                </div>
                                            </div>
                                            <div className={`pl-10 lg:pl-22 lg:pr-40 overflow-hidden transition-all duration-300 ease-in-out ${activeId === (item.id) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                {activeId === item.id && <p>{item.answer}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq
