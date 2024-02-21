"use client";
import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const resumeItems = [
  { name: "Contact", href: "/modern-resume/contact" },
  { name: "Experience", href: "/modern-resume/experience" },
  { name: "Project", href: "/modern-resume/project" },
  { name: "Education", href: "/modern-resume/education" },
  { name: "Certifications", href: "/modern-resume/certifications" },
  { name: "Skills", href: "/modern-resume/skills" },
  { name: "Summary", href: "/modern-resume/summary" },
  { name: "Finish Up", href: "/modern-resume/final" },
];

export function ModernResumeNav() {
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
