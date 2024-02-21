"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleIcon } from "lucide-react";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import Loading from "@/app/components/Loading";

type Form = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  country: string;
  state: string;
  city: string;
};

export default function Experience() {
  const [form, setForm] = useState<Form[]>([]);
  const [editForm, setEditForm] = useState<Form | null>(null);
  const [jobname, setJobname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sdate, setSDate] = useState<string>("");
  const [edate, setEDate] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [hide, setHide] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading,setLoading]=useState(false);
  const [deleteLoading,setDeleteLoading]=useState(false);
  const [savingLoading,setSavingLoading]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`);
        const data = await response.json();
        if (data.length === 0) {
          setDisable(true);
        }
        setForm(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  async function addForm() {
    if (!jobname || !email || !sdate || !edate || !portfolio|| !country || !state|| !city) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: jobname,
        email,
        phone: sdate,
        linkedin: edate,
        portfolio,
        country,
        state,
        city,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setForm([...form, data]);
    setJobname("");
    setEmail("");
    setSDate("");
    setEDate("");
    setPortfolio("");
    setCountry("");
    setState("");
    setCity("");
    setSavingLoading(true)
    window.location.reload();
  }
  useEffect(()=>{setSavingLoading(false)},[])

  const handleEdit = (form: Form) => {
    setEditForm(form);
  };

  const handleSave = async () => {
    if (!editForm) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`,
      {
        method: "PUT",
        body: JSON.stringify({
          _id: editForm._id, // Make sure to include the _id field
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
          linkedin: editForm.linkedin,
          portfolio: editForm.portfolio,
          country: editForm.country,
          state: editForm.state,
          city: editForm.city,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setForm(
        form.map((item: any) =>
          item._id === editForm._id
            ? {
                ...item,
                name: editForm.name,
                email: editForm.email,
                phone: editForm.phone,
                linkedin: editForm.linkedin,
                portfolio: editForm.portfolio,
                country: editForm.country,
                state: editForm.state,
                city: editForm.city,
              }
            : item
        )
      );
      setEditForm(null);
    } else {
      console.error("Failed to save form");
    }
  };

  const deleteForm = async (id: string) => {
    setDeleteLoading(true)
    const response = await fetch("/api/contact", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setForm(form.filter((item: any) => item._id !== id));
    }
    window.location.reload();
  };

  return (
    <div className="">
      {loading && <Loading message="Loading data..." />}
      {deleteLoading && <Loading message="Deleteing..." />}
      {savingLoading && <Loading message="Saving..." />}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="flex flex-col items-center p-4 space-y-4 border rounded ">
              <div className="text-center">
                <div className="flex justify-center text-lg font-semibold">
                  <div>Your Basic Info</div>

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
                    <div className="font-medium">{item.name}</div>

                    <div className="text-sm text-gray-600">{item.email}</div>

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
              <form>
              <div className="flex flex-col p-4 space-y-4 border rounded ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inputs for editing form */}
                  <div>
                    <Label htmlFor="name">FULL NAME</Label>
                    <Input
                      id="name"
                      placeholder="Myles Christian"
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">EMAIL ADDRESS</Label>
                    <Input
                      id="email"
                      placeholder="decit@mailinator.com"
                      type="text"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="startDate">PHONE NUMBER</Label>
                    <Input
                      id="startDate"
                      placeholder="+1 (647) 896-1768"
                      type="text"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">LINKEDIN URL</Label>
                    <Input
                      id="endDate"
                      placeholder="https://www.linkiden.com"
                      type="text"
                      value={editForm.linkedin}
                      onChange={(e) =>
                        setEditForm({ ...editForm, linkedin: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio">
                      PERSONAL WEBSITE OR RELEVANT LINK
                    </Label>
                    <Input
                      placeholder="https://www.ginemitug.com"
                      value={editForm.portfolio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, portfolio: e.target.value })
                      }
                      id="portfolio"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">COUNTRY</Label>
                    <Input
                      placeholder="Pakistan"
                      value={editForm.country}
                      onChange={(e) =>
                        setEditForm({ ...editForm, country: e.target.value })
                      }
                      id="country"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">STATE</Label>
                    <Input
                      placeholder="Punjab"
                      value={editForm.state}
                      onChange={(e) =>
                        setEditForm({ ...editForm, state: e.target.value })
                      }
                      id="state"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">CITY</Label>
                    <Input
                      placeholder="Lahore"
                      value={editForm.city}
                      onChange={(e) =>
                        setEditForm({ ...editForm, city: e.target.value })
                      }
                      id="city"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" onClick={handleSave} className="text-white">
                  SAVE BASIC INFO
                </Button>
              </div></form>
            ) : disable ? (
              <form>
              <div className="flex flex-col p-4 space-y-4 border rounded ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inputs for adding form */}
                  <div>
                    <Label htmlFor="jobname">FULL NAME</Label>
                    <Input
                      id="jobname"
                      placeholder="Myles Christian"
                      type="text"
                      value={jobname}
                      onChange={(e) => setJobname(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailName">EMAIL ADDRESS</Label>
                    <Input
                      id="emailName"
                      placeholder="decit@mailinator.com"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="startDate">PHONE NUMBER</Label>
                    <Input
                      id="startDate"
                      placeholder="+1 (647) 896-1768"
                      type="text"
                      value={sdate}
                      onChange={(e) => setSDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">LINKEDIN URL</Label>
                    <Input
                      id="endDate"
                      placeholder="https://www.linkiden.com"
                      type="text"
                      value={edate}
                      onChange={(e) => setEDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio">
                      PERSONAL WEBSITE OR RELEVANT LINK
                    </Label>
                    <Input
                      placeholder="https://www.ginemitug.com"
                      id="portfolio"
                      onChange={(e) => setPortfolio(e.target.value)}
                      required
                      value={portfolio}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">COUNTRY</Label>
                    <Input
                      placeholder="Pakistan"
                      id="country"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      value={country}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">STATE</Label>
                    <Input
                      placeholder="Punjab"
                      id="state"
                      onChange={(e) => setState(e.target.value)}
                      required
                      value={state}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">CITY</Label>
                    <Input
                      placeholder="Lahore"
                      id="city"
                      onChange={(e) => setCity(e.target.value)}
                      required
                      value={city}
                    />
                  </div>
                </div>
                <Button onClick={addForm} className="text-white">
                  SAVE BASIC INFO
                </Button>
              </div>
              </form>
            ) : (
              <div className="flex flex-col p-4 space-y-4 border rounded ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <h1>
                    You've saved your basic information. To make changes, click
                    the edit button.
                  </h1>
                </div>
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
  );
}
