"use client";

import { useEffect, useState } from "react";
import { fetchCampaigns, createCampaign, deleteCampaign, updateCampaign,} from "@/lib/api";

type Campaign = {
  id: number;
  name: string;
  platform: string;
  status: string;
  budget: string;
  start_date: string;
  end_date: string;
};


export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);



  const [editingId, setEditingId] = useState<number | null>(null);

const [form, setForm] = useState({

    name: "",
    platform: "facebook",
    status: "draft",
    budget: "",
    currency: "INR",
    start_date: "",
    end_date: "",
  });

  const load = () =>
    fetchCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false);
    });

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  setError(null);

  if (
    !form.name ||
    !form.budget ||
    !form.start_date ||
    !form.end_date
  ) {
    setError("Please fill all required fields.");
    return;
  }

  try {
    if (editingId) {
      await updateCampaign(editingId, form);
    } else {
      await createCampaign(form);
    }

    setForm({
      name: "",
      platform: "facebook",
      status: "draft",
      budget: "",
      currency: "INR",
      start_date: "",
      end_date: "",
    });

    setEditingId(null);
    load();
  } catch {
    setError("Something went wrong. Please try again.");
  }
}



  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Campaign Tracker</h1>

      {/* CREATE FORM */}
      {error && (
  <p className="text-red-600 mt-4">
    {error}
  </p>
)}


      <form
        onSubmit={handleSubmit}
        className="mt-6 p-4 border rounded grid grid-cols-2 gap-4 max-w-xl"
        
      >
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2"
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
        >
          <option value="facebook">Facebook</option>
          <option value="google">Google</option>
          <option value="linkedin">LinkedIn</option>
          <option value="instagram">Instagram</option>
        </select>

        <select
          className="border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <input
          placeholder="Budget"
          className="border p-2"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />

        <input
          type="date"
          className="border p-2"
          value={form.start_date}
          onChange={(e) =>
            setForm({ ...form, start_date: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        />

        <button className="bg-black text-white p-2 col-span-2">
          {editingId ? "Update Campaign" : "Create Campaign"}

        </button>
      </form>

      {/* LIST */}
      {loading && <p className="mt-4">Loading campaigns...</p>}

      {!loading && (
        <table className="mt-6 border w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Platform</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Budget</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.platform}</td>
                <td className="p-2 border">{c.status}</td>
                <td className="p-2 border flex gap-3">
  {c.budget}

  <button
  onClick={() => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      platform: c.platform,
      status: c.status,
      budget: c.budget,
      currency: "INR",
      start_date: c.start_date,
      end_date: c.end_date,
    });
  }}
  className="text-blue-600"
>
  Edit
</button>


  <button
    onClick={() => deleteCampaign(c.id).then(load)}
    className="text-red-600"
  >
    Delete
  </button>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
