"use client";
import Loading from "@/app/components/Loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, DownloadIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";

const Final = () => {
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [resumeName, setResumeName] = useState("My Resume");
  // manage loading...
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContactData(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSkill(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/summary`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSummary(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExperience(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEducation(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificate`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCertificate(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);

  const targetRef = useRef();
  return (
    <>
      {loading && <Loading message="Loading data..." />}

      <div className="container md:px-20 py-8">
        <div className="font-sans">
          <div className="container mx-auto py-6 px-4 items-center">
            <Alert>
              <AlertTitle className="flex justify-center">
                <DownloadIcon className="h-4 w-4 sm:mr-1 mr-2" />
                Click
                {/* <button className='cursor-pointer mx-1 underline' onClick={() => generatePDF(targetRef, {filename: 'My Resume.pdf'})}>
          here
        </button> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="cursor-pointer mx-1 underline">
                      here
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Enter Resume Name</DialogTitle>
                      <DialogDescription>
                        Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={resumeName}
                          className="col-span-3"
                          onChange={(e) => setResumeName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() =>
                          generatePDF(targetRef, { filename: `${resumeName}` })
                        }
                        type="submit"
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                to download.
              </AlertTitle>
            </Alert>
          </div>
          <div className="container mx-auto py-4 px-4">
            <main  className="font-jost hyphens-manual">
              {/* Page ------------------------------------------------------------------------------------------------------*/}
              <section ref={targetRef} className="p-3 my-auto mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter">
                {/* Name --------------------------------------------------------------------------------------------------*/}
                <header className="inline-flex justify-between items-baseline mb-2 w-full align-top border-b-4 border-gray-300">
                  {contactData?.map((item) => (
                    <section key={item._id} className="block">
                      <h1 className="mb-0 text-5xl font-bold text-gray-700">
                        {item.name}
                      </h1>
                      {/*Location -------------------------------------------------------------------------------------------------------*/}
                      <h3 className="m-0 mt-2 ml-2 text-xl font-semibold text-gray-500 leading-snugish">
                        {item.city} , {item.country}
                      </h3>
                    </section>
                  ))}

                  {/*   Initials Block         */}
                </header>
                {/* Column ------------------------------------------------------------------------------------------------*/}
                <section className="col-gap-8 print:col-count-2 print:h-letter-col-full col-fill-balance md:col-count-2 md:h-letter-col-full">
                  <section className="flex-col">
                    {/* Contact Information -----------------------------------------------------------------------------------*/}
                    <section className="pb-2 mt-4 mb-0 first:mt-0">
                      {/* To keep in the same column ------------------------------------------------------------------------*/}
                      <section className="break-inside-avoid">
                        {contactData?.map((item) => (
                          <section
                            key={item._id}
                            className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid"
                          >
                            <ul className="pr-7 list-inside">
                              <li className="mt-1 leading-normal text-black text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md print:">
                                <a href={item.portfolio} className="group">
                                  <span className="mr-2 text-lg font-semibold text-gray-700 leading-snugish">
                                    Portfolio:
                                  </span>
                                  {item.portfolio}
                                  <span className="inline-block font-normal text-black text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black print:">
                                    ↗
                                  </span>
                                </a>
                              </li>
                              <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                                <a href={item.portfolio} className="group">
                                  <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
                                    Github:
                                  </span>
                                  {item.name}
                                  <span className="inline-block font-normal text-black text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black print:">
                                    ↗
                                  </span>
                                </a>
                              </li>
                              <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                                <a href={item.portfolio} className="group">
                                  <span className="mr-8 text-lg font-semibold text-gray-700 leading-snugish">
                                    Email:
                                  </span>
                                  {item.email}
                                  <span className="inline-block font-normal text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black">
                                    ↗
                                  </span>
                                </a>
                              </li>
                              <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                                <a href={item.portfolio}>
                                  <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
                                    Linkiden:
                                  </span>
                                  {item.linkedin}
                                </a>
                              </li>
                            </ul>
                          </section>
                        ))}
                      </section>
                    </section>
                    {/*Summary --------------------------------------------------------------------------------------------------------*/}
                    <section className="pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
                      {/* To keep in the same column */}
                      <section className="break-inside-avoid">
                        <h2 className="mb-2 text-xl font-bold tracking-widest text-gray-700 print:font-normal">
                          SUMMARY
                        </h2>
                        {summary?.map((item) => (
                          <section
                            key={item._id}
                            className="mb-2 break-inside-avoid"
                          >
                            <p className="mt-2 leading-normal text-gray-700 text-md">
                              {item.tasks}
                            </p>
                          </section>
                        ))}
                      </section>
                    </section>
                    <section className="pb-2 pb-4 mt-4 border-b-4 border-gray-300 first:mt-0">
                      {/* To keep in the same column -----------------------------------------------------------------------*/}
                      <section className="break-inside-avoid">
                        <h2 className="mb-2 text-xl font-black tracking-widest text-gray-800 print:font-normal">
                          EXPERIENCE
                        </h2>
                        {/*Job 1*/}
                        {experience?.map((item) => (
                        <section key={item._id} className="mb-2 border-b-2 border-gray-300 break-inside-avoid">
                          <header>
                            <h3 className="font-semibold text-gray-800 text-md leading-snugish">
                              {item.role}
                            </h3>
                            <p className="text-sm leading-normal text-gray-500">
                              {item.s_date} – {item.e_date} | {item.company}
                            </p>
                          </header>
                          <ul className="pl-3 mt-2 font-normal text-gray-700 text-md leading-snugish">
                            <li>
                              <span className="text-gray-500 transform -translate-y-px select-none">
                                ›
                              </span>
                             {item.tasks}
                            </li>
                          </ul>
                        </section>))}
                        {/* job 2  */}
                      </section>
                    </section>
                    {/*Education ------------------------------------------------------------------------------------------------------*/}
                    <section className="pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                      {/* To keep in the same column */}
                      <section className="break-inside-avoid">
                        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                          EDUCATION
                        </h2>
                        {/* school -------------------------------------------------------------------------*/}
                        {education?.map((item) => (
                          <section
                            key={item._id}
                            className="mt-2 border-b-2 break-inside-avoid"
                          >
                            <header>
                              <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                {item.university}
                              </h3>
                              <p className="leading-normal text-gray-500 text-md">
                                {item.degree}
                              </p>
                            </header>
                            <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
                              <li>
                                <span className="font-semibold text-md">
                                  Located:
                                </span>
                               {' '} {item.located}
                              </li>
                              <li>
                                <span className="font-semibold text-md">
                                  GPA:
                                </span>
                               {' '} {item.gpa}
                              </li>
                              <li>
                                <span className="font-semibold text-md">
                                  Skills:
                                </span>{" "}
                                {item.tasks}
                              </li>
                            </ul>
                          </section>
                        ))}
                        {/*school 2-------------------------------------------------------------------------------------------*/}

                        {/*school 3 -------------------------------------------------------------------------------*/}
                      </section>
                    </section>
                    {/*Begin Skills ---------------------------------------------------------------------------------------------------*/}
   
                    {/*Experience ----------------------------------------------------------------------------------------------------*/}
                    <section className="pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                      {/* To keep in the same column */}
                      <section className="break-inside-avoid">
                        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                          CERTIFICATION
                        </h2>
                        {/* school -------------------------------------------------------------------------*/}
                        {certificate?.map((item) => (
                          <section
                            key={item._id}
                            className="mt-2 border-b-2 break-inside-avoid"
                          >
                            <header>
                              <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                {item.course}
                              </h3>
                              <p className="leading-normal text-gray-500 text-md">
                                {item.institute}
                              </p>
                            </header>
                            <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
                              <li>
                                <span className="font-semibold text-md">
                                  Located:
                                </span>
                               {' '} {item.location}
                              </li>
                              <li>
                                <span className="font-semibold text-md">
                                  Year:
                                </span>
                               {' '} {item.year}
                              </li>
                              <li>
                                <span className="font-semibold text-md">
                                  Skills:
                                </span>{" "}
                                {item.tasks}
                              </li>
                            </ul>
                          </section>
                        ))}
                        {/*school 2-------------------------------------------------------------------------------------------*/}

                        {/*school 3 -------------------------------------------------------------------------------*/}
                      </section>
                    </section>
                    <section className="pb-6 mt-0 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                      {/* To keep in the same column */}
                      <section className="break-inside-avoid">
                        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                          SKILLS
                        </h2>
                        <section className="mb-0 break-inside-avoid">
                          <section className="mt-1 last:pb-1">
                          {skill?.map((item) => (
                            <ul key={item._id} className="flex flex-wrap -mb-1 font-bold leading-relaxed text-md -mr-1.6">
                              <li className="p-1.5 mb-1 leading-relaxed text-white bg-gray-800 mr-1.6 print:bg-white print:border-inset">
                                {item.tasks}
                              </li>
                            </ul>))}
                          </section>
                        </section>
                      </section>
                    </section>
                    {/* end Column */}
                  </section>
                  {/* end Page */}
                </section>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Final;
