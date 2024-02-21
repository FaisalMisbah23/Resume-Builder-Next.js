"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Label } from "@/components/ui/label";
import Loading from "@/app/components/Loading";

type Form = {
  _id: string;
  role: string;
  company: string;
  s_date: string;
  e_date: string;
  tasks: string;
};

export default function Experience() {
  const [form, setForm] = useState<Form[]>([]);
  const [editForm, setEditForm] = useState<Form | null>(null);
  const [jobRole, setJobRole] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [sdate, setSDate] = useState<string>("");
  const [edate, setEDate] = useState<string>("");
  const [tasks, setTasks] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [loading,setLoading]=useState(false);
  const [savingLoading,setSavingLoading]=useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setForm(data);
        setLoading(false); // Move this line inside the .then() block
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Also handle errors and set loading to false
      });
  }, []);
  

  async function addForm() {
    if (!jobRole || !company || !sdate || !edate || !tasks) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form`, {
      method: "POST",
      body: JSON.stringify({
        role: jobRole,
        company,
        s_date: sdate,
        e_date: edate,
        tasks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSavingLoading(true)
    const data = await response.json();
    setForm([...form, data]);
    setJobRole("");
    setCompany("");
    setSDate("");
    setEDate("");
    setTasks("");
    setSavingLoading(false)
  }

  const handleEdit = (form: Form) => {
    setEditForm(form);
  };

  const handelSave = async () => {
    if (!editForm) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form`, {
      method: "PUT",
      body: JSON.stringify({
        role: editForm.role,
        company: editForm.company,
        s_date: editForm.s_date,
        e_date: editForm.e_date,
        tasks: editForm.tasks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setForm(
        form.map((item: any) =>
          item._id === editForm._id
            ? {
                ...item,
                role: editForm.role,
                company: editForm.company,
                s_date: editForm.s_date,
                e_date: editForm.e_date,
                tasks: editForm.tasks,
              }
            : item
        )
      );
      setEditForm(null);
    }
  };

  const deleteForm = async (id: string) => {
    const response = await fetch("/api/form", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setForm(form.filter((item: any) => item._id !== id));
    }
  };

  return (
    <>
      <div className="">
      {loading && <Loading message="Loading data..." />}
      {savingLoading && <Loading message="Saving..." />}
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="flex flex-col items-center p-4 space-y-4 border rounded ">
                <div className="text-center">
                  <div className="flex justify-center text-lg font-semibold">
                    <div>Your Experiences</div>

                    <button
                      onClick={() => setHide(!hide)}
                      className="focus:outline-none"
                    >
                      {hide ? (
                        <ChevronDown className="h-6 w-6" />
                      ) : (
                        <ChevronUp className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  <div className="border-b w-full my-2" />

                  {form?.map((item: any) => (
                    <div
                      key={item._id}
                      className={`${hide === true ? "hidden mb-5" : "mb-5"}`}
                    >
                      <div className="font-medium">{item.role}</div>

                      <div className="text-sm text-gray-600">
                        {item.company}
                      </div>

                      <div className="flex space-x-2 mt-2">
                        <Button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-600 text-white"
                        >
                          EDIT
                        </Button>

                        <Button
                          onClick={() => deleteForm(item._id)}
                          className="bg-red-600 text-white"
                        >
                          DELETE
                        </Button>

                        <Button
                          onClick={() => setHide(true)}
                          className="bg-gray-300 text-black hover:text-white"
                        >
                          HIDE
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2">
  {editForm ? (
    <div className="flex flex-col p-4 space-y-4 border rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">WHAT WAS YOUR ROLE AT THE COMPANY?</Label>
          <Input
            id="role"
            placeholder="Marketing Analyst"
            type="text"
            value={editForm.role}
            onChange={(e) =>
              setEditForm({ ...editForm, role: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="company">FOR WHICH COMPANY DID YOU WORK?</Label>
          <Input
            id="company"
            placeholder="Google"
            type="text"
            value={editForm.company}
            onChange={(e) =>
              setEditForm({ ...editForm, company: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="startDate">HOW LONG WERE YOU WITH THE COMPANY?</Label>
          <Input
            id="startDate"
            placeholder="February 2024"
            type="text"
            value={editForm.s_date}
            onChange={(e) =>
              setEditForm({ ...editForm, s_date: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="endDate"></Label>
          <Input
            id="endDate"
            placeholder="- February 2024"
            type="text"
            value={editForm.e_date}
            onChange={(e) =>
              setEditForm({ ...editForm, e_date: e.target.value })
            }
          />
        </div>
      </div>
      <Label htmlFor="tasks">WHAT DID YOU DO AT THE COMPANY?
</Label>
      <Textarea
        placeholder="• Organised and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
        value={editForm.tasks}
        onChange={(e) => setEditForm({ ...editForm, tasks: e.target.value })}
        id="tasks"
      />

      <Button onClick={handelSave} className="text-white">
        SAVE TO EXPERIENCE LIST
      </Button>
    </div>
  ) : (
    <div className="flex flex-col p-4 space-y-4 border rounded ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobRole">WHAT WAS YOUR ROLE AT THE COMPANY?</Label>
          <Input
            id="jobRole"
            placeholder="Marketing Analyst"
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="companyName">FOR WHICH COMPANY DID YOU WORK?</Label>
          <Input
            id="companyName"
            placeholder="Google"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="startDate">HOW LONG WERE YOU WITH THE COMPANY?</Label>
          <Input
            id="startDate"
            placeholder="February 2023"
            type="text"
            value={sdate}
            onChange={(e) => setSDate(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="endDate">To</Label>
          <Input
            id="endDate"
            placeholder="February 2024"
            type="text"
            value={edate}
            onChange={(e) => setEDate(e.target.value)}
          />
        </div>
      </div>
    <Label htmlFor="roles">WHAT DID YOU DO AT THE COMPANY?
</Label>
      <Textarea
        placeholder="• Organised and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        id="roles"
      />

      <Button onClick={addForm} className="text-white">
        ADD TO EXPERIENCE LIST
      </Button>
    </div>
  )}
</div>

          </div>

          <div className="fixed bottom-0 right-0 p-4">
            <Button className="bg-gray-300 text-black rounded-full p-4">
              <MessageCircleIcon className="text-black" />
            </Button>
          </div>

          <div className="text-right p-4 text-xs text-gray-500">
            Resume Builder v:1
          </div>
        </div>
      </div>
    </>
  );
}
