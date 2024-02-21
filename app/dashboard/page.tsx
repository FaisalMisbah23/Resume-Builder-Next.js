import React from 'react'
import Link from 'next/link'

const DashboardPage = () => {
  return (
    <section className=" body-font">
    <div className="container px-5 mx-auto">
    <h1 className="title-font text-3xl font-medium text-center pb-10">Explore Templates</h1>
      <div className="flex flex-wrap -m-4">
        <div className="p-4 md:w-1/3">
        <Link href='/resume-simple/contact'>
          <div className="h-full border-2 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://tailwindflex.com/public/images/thumbnails/simple-resume-card/canvas.min.webp" alt="img" />
            <div className="p-6">
              <h1 className="title-font text-lg font-medium text-center mb-2">Simple Resume</h1>
            </div>
          </div>
          </Link>
        </div>
        <div className="p-4 md:w-1/3">
        <Link href='/modern-resume/contact'>
          <div className="h-full border-2 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://tailwindflex.com/public/images/thumbnails/tailwind-one-page-resume-cv-template/canvas.min.webp" alt="img" />
            <div className="p-6">
              <h1 className="title-font text-lg font-medium text-center mb-2">Modern Resume</h1>
            </div>
          </div>
          </Link>
        </div>
        <div className="p-4 md:w-1/3">
        <Link href='/modern-resume-two/contact'>
          <div className="h-full border-2 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://tailwindflex.com/public/images/thumbnails/modern-resume-template/canvas.min.webp" alt="img" />
            <div className="p-6">
              <h1 className="title-font text-lg font-medium text-center mb-2">Modern Resume</h1>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}

export default DashboardPage