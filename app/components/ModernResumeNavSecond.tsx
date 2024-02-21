"use client";
import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const resumeItems = [
  { name: "Contact", href: "/modern-resume-two/contact" },
  { name: "Experience", href: "/modern-resume-two/experience" },
  { name: "Project", href: "/modern-resume-two/project" },
  { name: "Education", href: "/modern-resume-two/education" },
  { name: "Certifications", href: "/modern-resume-two/certifications" },
  { name: "Skills", href: "/modern-resume-two/skills" },
  { name: "Summary", href: "/modern-resume-two/summary" },
  { name: "Finish Up", href: "/modern-resume-two/final" },
];

export function ModernResumeNavSecond() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-wrap justify-center">
      {resumeItems.map((item, index) => (
        <li key={index} className="m-2">
          <Link
            className={cn(
              "text-center block border rounded py-2 px-4 hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "bg-transparent"
            )}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
