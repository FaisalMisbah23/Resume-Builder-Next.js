"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const resumeItems = [
  { name: "Contact", href: "/resume-simple/contact" },
  { name: "Experience", href: "/resume-simple/experience" },
  { name: "Project", href: "/resume-simple/project" },
  { name: "Education", href: "/resume-simple/education" },
  { name: "Certifications", href: "/resume-simple/certifications" },
  { name: "Skills", href: "/resume-simple/skills" },
  { name: "Summary", href: "/resume-simple/summary" },
  { name: "Finish Up", href: "/resume-simple/final" },
];

export function ResumeNav() {
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
