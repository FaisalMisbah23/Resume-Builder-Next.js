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
import { ChevronDown, DownloadIcon, Link, Linkedin, MailIcon, PhoneCall } from "lucide-react";
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
  
  const [imageSrc, setImageSrc] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

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
    <div className="relative mb-5">
  <input
    className="absolute right-0 top-0"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />
</div>

        <div className="container mx-auto py-4 px-4">
        <div className="bg--100 p-4">
        <div ref={targetRef} className="border-1 shadow-lg shadow--700 rounded-lg">
          {/* top content */}
          <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
          <div>
      
      {imageSrc && (
        <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
          <img src={imageSrc} alt="Uploaded Image" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
            {contactData?.map((item) => (
            <div key={item._id} className="w-2/3 sm:text-center pl-5 mt-10 text-start">
              <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                {item.name}
              </p>
              <p className="text-heading">{item.email}</p>
            </div>))}
          </div>
          {/* main content */}
          <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:mt-10">
              <div className="flex flex-col sm:w-1/3">
                {/* My contact */}
                <div className="py-3 sm:order-none order-3">
                  <h2 className="text-lg font-poppins font-bold text-top-color">My Contact</h2>
                  <div className="border-2 w-20 border-top-color my-3" />
                  {contactData?.map((item) => (
                  <div key={item._id}>
                    <div className="flex items-center my-1">
                      <a className="w-6 text--700 hover:text-orange-600">
                        <MailIcon className="h-5"/>
                      </a>
                      <div className="ml-2 truncate">{item.email}</div>
                    </div>
                    <div className="flex items-center my-1">
                      <a className="w-6 text--700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href target="_blank">
                       <PhoneCall className="h-5"/>
                      </a>
                      <div>{item.phone}</div>
                    </div>
                    <div className="flex items-center my-1">
                      <a className="w-6 text--700 hover:text-orange-600" aria-label="Visit TrendyMinds Facebook" href target="_blank">
                       <Linkedin className="h-5"/>
                      </a>
                      <div>{item.linkedin}</div>
                    </div>
                    <div className="flex items-center my-1">
                      <a className="w-6 text--700 hover:text-orange-600" aria-label="Visit TrendyMinds Twitter" href target="_blank">
                       <Link className="h-5"/>
                      </a>
                      <div>{item.portfolio}</div>
                    </div>
                  </div>))}
                </div>
                {/* Skills */}
                <div className="py-3 sm:order-none order-2">
                  <h2 className="text-lg font-poppins font-bold text-top-color">Skills</h2>
                  <div className="border-2 w-20 border-top-color my-3" />
                  <div>
                  {skill?.map((item) => (
                    <div key={item._id} className="flex items-center my-1">                     
                      <div className="ml-2">{item.tasks}</div>
                    </div>))}                   
                  </div>
                </div>
                {/* Education Background */}
                <div className="py-3 sm:order-none order-1">
                  <h2 className="text-lg font-poppins font-bold text-top-color">Education Background</h2>
                  <div className="border-2 w-20 border-top-color my-3" />
                  <div className="flex flex-col space-y-1">
                  {education?.map((item) => (
                    <div key={item._id} className="flex flex-col">
                      <p className="text-sm font-medium">
                        <span className="text-green-700">{item.degree}</span>, {item.university}
                      </p>
                      <p className="font-bold text-xs text--700 mb-2">GPA: {item.gpa}</p>
                    </div>))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
                {/* About me */}
                <div className="py-3">
                  <h2 className="text-lg font-poppins font-bold text-top-color">Summary</h2>
                  <div  className="border-2 w-20 border-top-color my-3" />
                  {summary?.map((item) => (
                  <p key={item._id}>{item.tasks}</p>
                ))}
                </div>
                {/* Professional Experience */}
                <div className="py-3">
                  <h2 className="text-lg font-poppins font-bold text-top-color">Professional Experience</h2>
                  <div className="border-2 w-20 border-top-color my-3" />
                  <div className="flex flex-col">
                  {experience?.map((item) => (
                    <div key={item._Id} className="flex flex-col">
                      <p className="text-lg font-bold text--700">{item.company} | {item.role}</p>
                      <p className="font-semibold text-sm text--700">{item.s_date} - {item.e_date}</p>
                      <p className="font-semibold text-sm text--700 mt-2 mb-1">Key Responsibilities</p>
                      <ul className="text-sm list-disc pl-4 space-y-1">
                        <li>{item.tasks}</li>
                      </ul>
                    </div>))}
                  </div>
                </div>
                {/* Projects */}
                <div className="py-3">
                  <h2 className="text-lg font-poppins font-bold text-top-color">Projects</h2>
                  <div className="border-2 w-20 border-top-color my-3" />
                  <div className="flex flex-col">
                  {summary?.map((item) => (
                    <div key={item._id} className="flex flex-col">
                      <p className="text-lg font-semibold text--700">{item.title}</p>
                      <p className="text-md font-semibold text--700">{item.organization}</p>
                      <p className="text-md font-semibold text--700">{item.url}</p>
                      <p className="font-normal text-sm text--700 mb-1 pl-2">{item.tasks}</p>
                    </div>))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Final;
