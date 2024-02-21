import { ReactNode } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ResumeNav } from "../components/ResumeNav";
import { ModernResumeNavSecond } from "../components/ModernResumeNavSecond";

export default async function ResumeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }

  return (
    <div>
      <ModernResumeNavSecond/>
        <div>{children} </div>
    </div>
  );
}
