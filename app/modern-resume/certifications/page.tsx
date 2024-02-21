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
  course: string;
  insitute: string;
  location: string;
  year: string;
  tasks: string;
};

export default function Experience() {
  const [form, setForm] = useState<Form[]>([]);
  const [editForm, setEditForm] = useState<Form | null>(null);
  const [jobcourse, setJobcourse] = useState<string>("");
  const [insitute, setinsitute] = useState<string>("");
  const [sdate, setSDate] = useState<string>("");
  const [edate, setEDate] = useState<string>("");
  const [tasks, setTasks] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [loading,setLoading]=useState(false);
  const [savingLoading,setSavingLoading]=useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificate`)
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
    if (!jobcourse || !insitute || !sdate || !edate || !tasks) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificate`, {
      method: "POST",
      body: JSON.stringify({
        course: jobcourse,
        insitute,
        location: sdate,
        year: edate,
        tasks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
setSavingLoading(true)
    const data = await response.json();
    setForm([...form, data]);
    setJobcourse("");
    setinsitute("");
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificate`, {
      method: "PUT",
      body: JSON.stringify({
        course: editForm.course,
        insitute: editForm.insitute,
        location: editForm.location,
        year: editForm.year,
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
                course: editForm.course,
                insitute: editForm.insitute,
                location: editForm.location,
                year: editForm.year,
                tasks: editForm.tasks,
              }
            : item
        )
      );
      setEditForm(null);
    }
  };

  const deleteForm = async (id: string) => {
    const response = await fetch("/api/certificate", {
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
                    <div>Your Certifications</div>

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
                      <div className="font-medium">{item.course}</div>

                      <div className="text-sm text-gray-600">
                        {item.insitute}
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
          <Label htmlFor="course">WHAT WAS THE CERTIFICATE NAME?</Label>
          <Input
            id="course"
            placeholder="Web Development"
            type="text"
            value={editForm.course}
            onChange={(e) =>
              setEditForm({ ...editForm, course: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="insitute">WHERE DID YOU GET THE CERTIFICATE?</Label>
          <Input
            id="insitute"
            placeholder="Google"
            type="text"
            value={editForm.insitute}
            onChange={(e) =>
              setEditForm({ ...editForm, insitute: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="startDate">WHERE WAS THE INSITUTE LOCATED?</Label>
          <Input
            id="startDate"
            placeholder="February 2024"
            type="text"
            value={editForm.location}
            onChange={(e) =>
              setEditForm({ ...editForm, location: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="endDate">WHEN DID YOU GET THE CERTIFICATE?</Label>
          <Input
            id="endDate"
            placeholder="- February 2024"
            type="text"
            value={editForm.year}
            onChange={(e) =>
              setEditForm({ ...editForm, year: e.target.value })
            }
          />
        </div>
      </div>
      <Label htmlFor="tasks">HOW IS THE CERTIFICATE RELEVANT?
</Label>
      <Textarea
placeholder=""
value={editForm.tasks}
        onChange={(e) => setEditForm({ ...editForm, tasks: e.target.value })}
        id="tasks"
      />

      <Button onClick={handelSave} className="text-white">
        SAVE TO CERTIFICATE LIST
      </Button>
    </div>
  ) : (
    <div className="flex flex-col p-4 space-y-4 border rounded ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobcourse">WHAT WAS THE CERTIFICATE NAME?</Label>
          <Input
            id="jobcourse"
            placeholder="Web Development"
            type="text"
            value={jobcourse}
            onChange={(e) => setJobcourse(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="insituteName">WHERE DID YOU GET THE CERTIFICATE?</Label>
          <Input
            id="insituteName"
            placeholder="Google"
            type="text"
            value={insitute}
            onChange={(e) => setinsitute(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="startDate">WHERE WAS THE INSITUTE LOCATED?</Label>
          <Input
            id="startDate"
            placeholder="New York"
            type="text"
            value={sdate}
            onChange={(e) => setSDate(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="endDate">WHEN DID YOU GET THE CERTIFICATE</Label>
          <Input
            id="endDate"
            placeholder="February 2024"
            type="text"
            value={edate}
            onChange={(e) => setEDate(e.target.value)}
          />
        </div>
      </div>
    <Label htmlFor="courses">HOW IS THE CERTIFICATE RELEVANT?
</Label>
      <Textarea
placeholder=""
value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        id="courses"
      />

      <Button onClick={addForm} className="text-white">
        ADD TO CERTIFICATE LIST
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
