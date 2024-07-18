import { Button } from '@/components/ui/button'
import { LightbulbIcon, PencilIcon, WandIcon } from 'lucide-react'
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from 'next/link'
import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
  <>
  <section className="body-font">
  <div className="container mx-auto flex sm:px-12 sm:py-24 py-12 md:flex-row flex-col items-start">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-7xl text-3xl mb-4 font-bold"><span className='text-primary'> Create</span>
        <br className="hidden lg:inline-block sm:text-3xl font=semibold" /> a career in tech.
      </h1>
      <p className="mb-8 leading-relaxed">The template includes carefully structured sections for personal information, summary or objective, work experience, education, skills, projects, certifications, and more. You can easily customize these sections to fit your unique background.
</p>
      <div className="flex justify-center">
{  !user?    <RegisterLink> <Button className="inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">Create Resume for free</Button></RegisterLink>
:      <Link href="/dashboard"> <Button className="inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">Create Resume for free</Button></Link>
}      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full">
      <div className='flex flex-col gap-4'>
        <div className='flex items-start gap-6 border-[1px] p-4'>
          <div><img src="/Avatar.png" alt="" /></div>
          <div className='flex flex-col gap-2'>
            <div >
              <h1 className='font-semibold'>John Doe</h1>
              <p className='font-light'>Frontend Developer</p>
            </div>
            <div>
              <h1 className='font-semibold' >Bio</h1>
              <p className='font-light'>I’m a frontend developer with 3years experience in ReactJs and VueJs
</p>
            </div>
          </div>
        </div>
        <div className='border-[1px] p-4'>
        <h1 className='font-bold mb-4'>Work History</h1>
        <h1 className='font-semibold'>Cloud Engineer | Yep!, USA</h1>
        <h1 className='font-semibold mb-4'>March 2022 - Present</h1>
              <p className='font-light'>
              I am Christian Chiemela <br />
a cloud engineer, a Nigerian with the passion for creating stunning and user-friendly websites and applications. With 3years plus experience in the industry, I have honed skills in HTML, CSS, Javascript, as well as modern frontend frameworks such as ReactJs And VueJs.<br />
I began my career at Esoft response a United Kingdom base company where I quickly develop the interest in frontend development. Years later I moved to YEP! a United States of America base company where I am responsible for the development and maintenance of several high-traffic websites.<br />
I have the ability of turning complex design concepts into highly optimized and accessible user interfaces, which are up to date with the latest trends and technologies in the industry. I am always looking for ways to improve the user experience and performance of my projects.<br />
              </p>
        </div>

      </div>
    </div>
  </div>
</section>
<section className=" body-font">
        <h1 className=" text-center pb-5 sm:text-3xl text-2xl font-semibold text-primary">Features</h1>
        <div className="container sm:px-15 py-10 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img alt="feature" className="object-cover object-center h-full w-full" src="/image 2.png" />
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className=" text-lg title-font font-medium mb-3">Templates</h2>
                <p className="leading-relaxed text-base">A variety of pre-designed and customizable resume templates catering to different industries, roles, and design preferences.</p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className=" text-lg title-font font-medium mb-3">Free Cover Letter</h2>
                <p className="leading-relaxed text-base">With each of our professionally designed resume templates, you shall receive a FREE cover letter template thats perfectly matched to your chosen resume style. Our cover letter templates are designed to help you:</p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="flex-grow">
                <h2 className=" text-lg title-font font-medium mb-3">Customization Options</h2>
                <p className="leading-relaxed text-base">Ability to customize templates by changing colors, layouts, and adding personal branding elements, drag-and-drop functionality to rearrange sections and content blocks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="body-font">
        <div className="container mx-auto flex sm:px-20 py-8 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">Join the
              <br className="hidden lg:inline-block" />ceVBuilder family
            </h1>
            <p className="mb-8 leading-relaxed">We are thrilled to welcome you to the ceVBuilder family, where your journey to crafting exceptional resumes begins!</p>
            <div className="flex justify-center">
{ !user?      <RegisterLink> <Button className="inline-flex  border-0 py-2 px-6 rounded text-lg">Join ceVBuilder</Button></RegisterLink>
:             <Link href={'/dashboard'}> <Button className="inline-flex  border-0 py-2 px-6 rounded text-lg">Join ceVBuilder</Button></Link>
}            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full">
            <img className="object-cover object-center rounded" alt="hero" src="/image 3.png" />
          </div>
        </div>
      </section>
      <section className="body-font">
        <div className="container mx-auto sm:px-28 py-8">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary">About ceVBuilder
            </h1>
            <p className="mb-8 leading-relaxed">Are you ready to take your career journey to the next level? Look no further than our state-of-the-art Resume Builder application! We understand that crafting a compelling resume is your ticket to landing your dream job, and our platform is designed to empower you in this endeavor.</p>
  
        </div>
      </section>

      <footer className="body-font  border-t-2">
        <div className="container sm:px-15 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center ">
              <span className="text-xl">Resume Builder</span>
            </a>
            <p className="mt-2 text-sm">Updates right to your Inbox</p>
          </div>
          <div className="flex-grow flex md:pl-20 sm:-mb-4 -mb-20 md:mt-0 mt-10 md:text-left text-center sm:justify-end">
            <div className="lg:w-1/4 md:w-1/2 w-full sm:px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">Our story</h2>
              <nav className="list-none mb-10">
                <li>
                  <a >FAQ</a>
                </li>
                <li>
                  <a >Contact</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full sm:px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">Services</h2>
              <nav className="list-none mb-10">
                <li>
                  <a >Build Resume</a>
                </li>
                <li>
                  <a >Cover Letters</a>
                </li>
                <li>
                  <a >Template</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full sm:px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">About us</h2>
              <nav className="list-none mb-10">
                <li>
                  <a >Developers</a>
                </li>
                <li>
                  <a >Meet our team</a>
                </li>
                <li>Join ceVBuilder
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto sm:px-15 flex flex-wrap flex-col sm:flex-row">
            <p className="text-sm text-center sm:text-left">© ceVBuilder 2023
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-primary">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a className="ml-3 text-primary">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a className="ml-3 text-primary">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a className="ml-3 text-primary">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
</>
  )
}

export default page
