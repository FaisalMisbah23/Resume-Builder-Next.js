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
  title: string;
  organization: string;
  date: string;
  url: string;
  tasks: string;
};

export default function Experience() {
  const [form, setForm] = useState<Form[]>([]);
  const [editForm, setEditForm] = useState<Form | null>(null);
  const [jobtitle, setJobtitle] = useState<string>("");
  const [organization, setorganization] = useState<string>("");
  const [sdate, setSDate] = useState<string>("");
  const [edate, setEDate] = useState<string>("");
  const [tasks, setTasks] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [loading,setLoading]=useState(false);
  const [savingLoading,setSavingLoading]=useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project`)
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
    if (!jobtitle || !organization || !sdate || !edate || !tasks) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project`, {
      method: "POST",
      body: JSON.stringify({
        title: jobtitle,
        organization,
        date: sdate,
        url: edate,
        tasks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSavingLoading(true)
    const data = await response.json();
    setForm([...form, data]);
    setJobtitle("");
    setorganization("");
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/project`, {
      method: "PUT",
      body: JSON.stringify({
        title: editForm.title,
        organization: editForm.organization,
        date: editForm.date,
        url: editForm.url,
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
                title: editForm.title,
                organization: editForm.organization,
                date: editForm.date,
                url: editForm.url,
                tasks: editForm.tasks,
              }
            : item
        )
      );
      setEditForm(null);
    }
  };

  const deleteForm = async (id: string) => {
    const response = await fetch("/api/project", {
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
                    <div>Your Projects</div>

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
                      <div className="font-medium">{item.title}</div>

                      <div className="text-sm text-gray-600">
                        {item.organization}
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
                      <Label htmlFor="title">GIVE YOUR PROJECT A TITLE</Label>
                      <Input
                        id="title"
                        placeholder="A game"
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="organization">
                        IN WHICH ORGANIZATION DID YOU DO YOUR PROJECT?
                      </Label>
                      <Input
                        id="organization"
                        placeholder="Google"
                        type="text"
                        value={editForm.organization}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            organization: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="startDate">
                        WHEN DID YOU DO YOUR PROJECT?
                      </Label>
                      <Input
                        id="startDate"
                        placeholder="Febuary 2023"
                        type="text"
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm({ ...editForm, date: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="url">PROJECT URL</Label>
                      <Input
                        id="url"
                        placeholder="www.myweb.com"
                        type="text"
                        value={editForm.url}
                        onChange={(e) =>
                          setEditForm({ ...editForm, url: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Label htmlFor="titles">NOW DESCRIBE WHAT YOU DID</Label>
                  <Textarea
                    placeholder=""
                    value={editForm.tasks}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tasks: e.target.value })
                    }
                  />
                  <Button onClick={handelSave} className="text-white">
                    SAVE TO PROJECTS LIST
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col p-4 space-y-4 border rounded ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobtitle">
                        GIVE YOUR PROJECT A TITLE
                      </Label>
                      <Input
                        id="jobtitle"
                        placeholder="a game"
                        type="text"
                        value={jobtitle}
                        onChange={(e) => setJobtitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="organizationName">
                        IN WHICH ORGANIZATION DID YOU DO YOUR PROJECT?
                      </Label>
                      <Input
                        id="organizationName"
                        placeholder="Google"
                        type="text"
                        value={organization}
                        onChange={(e) => setorganization(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="startDate">
                        WHEN DID YOU DO YOUR PROJECT?
                      </Label>
                      <Input
                        id="startDate"
                        placeholder="February 2023"
                        type="text"
                        value={sdate}
                        onChange={(e) => setSDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="url">PROJECT URL</Label>
                      <Input
                        id="url"
                        placeholder="www.myweb.com"
                        type="text"
                        value={edate}
                        onChange={(e) => setEDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <Label htmlFor="titles">NOW DESCRIBE WHAT YOU DID</Label>
                  <Textarea
                    placeholder=""
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    id="titles"
                  />

                  <Button onClick={addForm} className="text-white">
                    ADD TO PROJECTS LIST
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
