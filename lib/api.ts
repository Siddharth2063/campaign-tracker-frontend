const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCampaigns() {
  const res = await fetch(`${BASE_URL}/api/campaigns/`);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}
export async function createCampaign(data: any) {
  const res = await fetch(`${BASE_URL}/api/campaigns/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create campaign");

  return res.json();
}
export async function deleteCampaign(id: number) {
  const res = await fetch(`${BASE_URL}/api/campaigns/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete campaign");
}
export async function updateCampaign(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/api/campaigns/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update campaign");

  return res.json();
}
