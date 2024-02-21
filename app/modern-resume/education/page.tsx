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
  degree: string;
  university: string;
  located: string;
  gpa: string;
  tasks: string;
};

export default function Experience() {
  const [form, setForm] = useState<Form[]>([]);
  const [editForm, setEditForm] = useState<Form | null>(null);
  const [jobdegree, setJobdegree] = useState<string>("");
  const [university, setuniversity] = useState<string>("");
  const [slocated, setSlocated] = useState<string>("");
  const [elocated, setElocated] = useState<string>("");
  const [tasks, setTasks] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [loading,setLoading]=useState(false);
  const [savingLoading,setSavingLoading]=useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`)
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
    if (!jobdegree || !university || !slocated || !elocated || !tasks) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`, {
      method: "POST",
      body: JSON.stringify({
        degree: jobdegree,
        university,
        located: slocated,
        gpa: elocated,
        tasks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSavingLoading(true)
    const data = await response.json();
    setForm([...form, data]);
    setJobdegree("");
    setuniversity("");
    setSlocated("");
    setElocated("");
    setTasks("");
    setSavingLoading(false)
  }

  const handleEdit = (form: Form) => {
    setEditForm(form);
  };

  const handelSave = async () => {
    if (!editForm) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`, {
      method: "PUT",
      body: JSON.stringify({
        degree: editForm.degree,
        university: editForm.university,
        located: editForm.located,
        gpa: editForm.gpa,
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
                degree: editForm.degree,
                university: editForm.university,
                located: editForm.located,
                gpa: editForm.gpa,
                tasks: editForm.tasks,
              }
            : item
        )
      );
      setEditForm(null);
    }
  };

  const deleteForm = async (id: string) => {
    const response = await fetch("/api/education", {
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
                    <div>Your Education</div>

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
                      <div className="font-medium">{item.degree}</div>

                      <div className="text-sm text-gray-600">
                        {item.university}
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
                      <Label htmlFor="degree">WHAT IS YOUR DEGREE OR OTHER QUALIFICATION?</Label>
                      <Input
                        id="degree"
                        placeholder="BS Economics"
                        type="text"
                        value={editForm.degree}
                        onChange={(e) =>
                          setEditForm({ ...editForm, degree: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="university">
                        WHERE DID YOU EARN YOUR DEGREE/QUALIFICATION?
                      </Label>
                      <Input
                        id="university"
                        placeholder="University of North Asia"
                        type="text"
                        value={editForm.university}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            university: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="startlocated">
                        WHERE IS THE INSTITUTION LOCATED?
                      </Label>
                      <Input
                        id="startlocated"
                        placeholder="New York"
                        type="text"
                        value={editForm.located}
                        onChange={(e) =>
                          setEditForm({ ...editForm, located: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="gpa">GPA (IF APPLICABLE)</Label>
                      <Input
                        id="gpa"
                        placeholder="3.5"
                        type="text"
                        value={editForm.gpa}
                        onChange={(e) =>
                          setEditForm({ ...editForm, gpa: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Label htmlFor="degrees">OPEN FIELD FOR ADDITIONAL INFORMATION</Label>
                  <Textarea
                    placeholder=""
                    value={editForm.tasks}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tasks: e.target.value })
                    }
                  />
                  <Button onClick={handelSave} className="text-white">
                    SAVE TO EDUCATION LIST
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col p-4 space-y-4 border rounded ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobdegree">
                        WHAT IS YOUR DEGREE OR OTHER QUALIFICATION?
                      </Label>
                      <Input
                        id="jobdegree"
                        placeholder="BS Economics"
                        type="text"
                        value={jobdegree}
                        onChange={(e) => setJobdegree(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="universityName">
                        WHERE DID YOU EARN YOUR DEGREE/QUALIFICATION?
                      </Label>
                      <Input
                        id="universityName"
                        placeholder="University of North Asia"
                        type="text"
                        value={university}
                        onChange={(e) => setuniversity(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="startlocated">
                        WHERE IS THE INSTITUTION LOCATED?
                      </Label>
                      <Input
                        id="startlocated"
                        placeholder="New York"
                        type="text"
                        value={slocated}
                        onChange={(e) => setSlocated(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="gpa">GPA (IF APPLICABLE)</Label>
                      <Input
                        id="gpa"
                        placeholder="3.5"
                        type="text"
                        value={elocated}
                        onChange={(e) => setElocated(e.target.value)}
                      />
                    </div>
                  </div>
                  <Label htmlFor="degrees">OPEN FIELD FOR ADDITIONAL INFORMATION</Label>
                  <Textarea
                    placeholder=""
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    id="degrees"
                  />

                  <Button onClick={addForm} className="text-white">
                    ADD TO EDUCATION LIST
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
