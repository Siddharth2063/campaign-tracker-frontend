"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DashboardPage() {
  const [statusData, setStatusData] = useState<any[]>([]);
  const [platformData, setPlatformData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/reports/status-summary/`)
      .then((r) => r.json())
      .then(setStatusData);

    fetch(`${BASE_URL}/reports/budget-by-platform/`)
      .then((r) => r.json())
      .then(setPlatformData);

    fetch(`${BASE_URL}/reports/monthly-trends/`)
      .then((r) => r.json())
      .then(setMonthlyData);
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* STATUS PIE */}
        <div>
          <h2 className="font-semibold mb-2">Campaigns by Status</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={statusData}
              dataKey="count"
              nameKey="status"
              outerRadius={100}
            >
              {statusData.map((_: any, idx: number) => (
                <Cell key={idx} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* PLATFORM BAR */}
        <div>
          <h2 className="font-semibold mb-2">Budget by Platform</h2>
          <BarChart width={400} height={300} data={platformData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="platform" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_budget" />
          </BarChart>
        </div>

        {/* MONTHLY LINE */}
        <div className="md:col-span-2">
          <h2 className="font-semibold mb-2">Monthly Campaign Trends</h2>
          <LineChart width={800} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" />
          </LineChart>
        </div>
      </div>
    </main>
  );
}
