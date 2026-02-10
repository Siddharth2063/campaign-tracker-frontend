import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-4 flex gap-6 font-semibold">
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/converter">Converter</Link>
    </nav>
  );
}
