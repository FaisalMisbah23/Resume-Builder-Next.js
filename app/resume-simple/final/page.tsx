"use client";
import Loading from "@/app/components/Loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const[resumeName,setResumeName]=useState('My Resume')
  // manage loading...
  const [loading,setLoading]=useState(false);

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
        {/* <div className="container mx-auto py-6 px-4">
          <div className="flex flex-wrap justify-evenly">
            <ul className="flex flex-wrap justify-center">
              <li className="m-2">
                <p
                  className={cn(
                    "text-center block border rounded py-2 px-4 hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Hello
                </p>
              </li>
              <li className="m-2">
                <p
                  className={cn(
                    "text-center block border rounded py-2 px-4 hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  THis
                </p>
              </li>
            </ul>
          </div>
        </div> */}
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
      <button className='cursor-pointer mx-1 underline'>
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
            <Input id="name" value={resumeName} className="col-span-3" onChange={(e)=>setResumeName(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => generatePDF(targetRef, {filename: `${resumeName}`})} type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        to download.
      </AlertTitle>
    </Alert>
    </div>
        <div className="container mx-auto py-4 px-4">
          <div ref={targetRef} id="pdf" className=" p-6 rounded-lg shadow-lg">
            {contactData?.map((item) => (
              <>
                {" "}
                <h1 key={item._id} className="text-3xl font-semibold">
                  {item.name}
                </h1>
                <p className="  ">{item.email}</p>
              </>
            ))}
            <hr className="my-4" />
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            {summary?.map((item) => (
              <p key={item._id} className="  ">
                {item.tasks}
              </p>
            ))}
            <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
            <ul className="list-disc list-inside   ">
              {skill?.map((item) => (
                <li key={item._id}>{item.tasks}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
            {experience?.map((item) => (
              <div key={item._id} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {item.role}, {item.company}
                </h3>
                <p className="  ">{item.tasks}</p>
                <p className="  ">
                  {item.s_date} - {item.e_date}
                </p>
              </div>
            ))}
            <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
            {education?.map((item) => (
              <div key={item._id} className="mb-4">
                <h3 className="text-lg font-semibold">{item.degree}</h3>
                <p className="  ">{item.university}</p>
                <p className="  ">{item.located}</p>
              </div>
            ))}
            <h2 className="text-xl font-semibold mt-4 mb-2">Certifications</h2>
            {certificate?.map((item) => (
              <div key={item._id} className="mb-4">
                <h3 className="text-lg font-semibold">{item.course}</h3>
                <p className="  ">{item.insitute}</p>
                <p className="  ">{item.location}</p>
              </div>
            ))}
            <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
            {contactData?.map((item) => (
              <ul key={item._id} className="list-disc list-inside   ">
                <li>
                  Email:{" "}
                  <a
                    href={item.email}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </a>
                </li>
                <li>
                  LinkedIn:{" "}
                  <a
                    href={item.linkedin}
                    className="text-blue-500 hover:underline"
                  >
                    {item.linkedin}
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href={item.portfolio}
                    className="text-blue-500 hover:underline"
                  >
                    {item.portfolio}
                  </a>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Final;
