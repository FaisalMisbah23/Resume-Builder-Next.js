import { Button } from '@/components/ui/button'
import { LightbulbIcon, PencilIcon, WandIcon } from 'lucide-react'
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="bg-">
      <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
              Fast. Easy. Effective.
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
            Resume Builder. The Best CV Maker Online.
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
            If a sheet of paper represents your entire work life, personality, and skills, it better be a pretty amazing
        piece of paper — Let Resume Builder do the heavy lifting.
            </p>
          </div>

          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <RegisterLink>
              <Button size="lg" className="w-full">
                Sign Up for free
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <div className="flex flex-col items-center text-center">
        <LightbulbIcon className="text-yellow-400 w-12 h-12" />
        <h3 className="font-bold mt-4">Pick a CV template.</h3>
        <p className="mt-2">Choose a sleek design and layout to get started.</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <PencilIcon className="text-blue-400 w-12 h-12" />
        <h3 className="font-bold mt-4">Fill in the blanks.</h3>
        <p className="mt-2">Type in a few words. Let the Resume Builder CV wizard fill the rest.</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <WandIcon className="text-purple-400 w-12 h-12" />
        <h3 className="font-bold mt-4">Customize your document.</h3>
        <p className="mt-2">Make it truly yours. Uniqueness in a few clicks.</p>
      </div>
    </section>
    <section className="bg-dark--500 text- p-8 text-center">
      <h2 className="text-3xl font-bold"><Link href={'/dashboard'}>Try Resume Builder's professional CV Builder now</Link> </h2>
      <Button className="mt-4" variant="secondary">
        <Link href={'/dashboard'}>Land your dream job now</Link>
      </Button>
    </section>
    <footer className="bg- p-4 text-center text-xs">
      <p>© 2024 Works Limited. All Rights Reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link className="" href="#">
          About
        </Link>
        <Link className="" href="#">
          Accessibility
        </Link>
        <Link className="" href="#">
          Contact
        </Link>
        <Link className="" href="#">
          Privacy Policy
        </Link>
        <Link className="" href="#">
          Terms of Service
        </Link>
      </div>
      <div className="mt-4">
        <Link className="" href="#">
          Call Us: 800-985-7561
        </Link>
      </div>
    </footer>
  </div>
  )
}

export default page
