"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, InfoIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Label } from "@/components/ui/label";
import Loading from "@/app/components/Loading";
import { Alert, AlertTitle } from "@/components/ui/alert";

type Form = {
  _id: string;
  tasks: string;
};

export default function Experience() {
  const [form, setForm] = useState<Form[]>([]);
  const [editForm, setEditForm] = useState<Form | null>(null);
  const [tasks, setTasks] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [loading,setLoading]=useState(false);
  const [savingLoading,setSavingLoading]=useState(false);
  const [deleteLoading,setDeletingLoading]=useState(false);
  const [isValid,setIsValid]=useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/summary`)
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
    if (!tasks) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/summary`, {
      method: "POST",
      body: JSON.stringify({
        tasks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSavingLoading(true)
    const data = await response.json();
    setForm([...form, data]);
    setTasks("");
    setSavingLoading(false)
  }

  const handleEdit = (form: Form) => {
    setEditForm(form);
  };

  const handelSave = async () => {
    if (!editForm) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/summary`, {
      method: "PUT",
      body: JSON.stringify({
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
                tasks: editForm.tasks,
              }
            : item
        )
      );
      setEditForm(null);
    }
  };

  const deleteForm = async (id: string) => {
    setDeletingLoading(true)
    const response = await fetch("/api/summary", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setForm(form.filter((item: any) => item._id !== id));
    }
    setDeletingLoading(false)
  };

  const handleValidation = (value) => {
    if (!value.trim()) {
      setIsValid(false); // Set isValid state to false if value is empty
    } else {
      setIsValid(true); // Set isValid state to true if value is not empty
    }
  };
  
  return (
    <>
      <div className="">
      {loading && <Loading message="Loading data..." />}
      {savingLoading && <Loading message="Saving..." />}
      {deleteLoading && <Loading message="Deleting..." />}
        <div className="container mx-auto py-8">
        <Alert className="mb-6">
      <AlertTitle className="flex justify-center"><InfoIcon className="h-4 w-4 sm:mr-1 mr-2"/>
      You can add more than one summary to display it in paragraph
      </AlertTitle>
    </Alert>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="flex flex-col items-center p-4 space-y-4 border rounded ">
                <div className="text-center">
                  <div className="flex justify-center text-lg font-semibold">
                    <div>Your Summary</div>

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
                      <div className="font-medium">
                      {item.tasks?.slice(1, 30)}...
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
                  <Label htmlFor="tasks">WRITE A PROFESSIONAL SUMMARY</Label>
                  {!isValid && (
  <p className="error-message">Tasks field is required.</p>
)}
                  <Textarea
                    placeholder=""
                    value={editForm.tasks}
                    onChange={(e) =>
                      setEditForm({ ...editForm, tasks: e.target.value })
                    }
                    id="tasks"
                    onBlur={(e) => handleValidation(e.target.value)} // Add onBlur event handler
                  />

                  <Button onClick={handelSave} className="text-white">
                    SAVE TO SUMMARY LIST
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col p-4 space-y-4 border rounded ">
                  <Label htmlFor="roles">WRITE A PROFESSIONAL SUMMARY</Label>
                  <Textarea
                    placeholder=""
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    id="roles"
                  />

                  <Button onClick={addForm} className="text-white">
                    ADD TO SUMMARY LIST
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
