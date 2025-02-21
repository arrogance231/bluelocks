// /app/dashboard/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null; // while redirecting

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button
        onClick={async () => {
          await logout();
          router.refresh();
          router.replace("/login");
        }}
        className="p-2 bg-red-600 rounded hover:bg-red-700 font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
