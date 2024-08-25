"use client";
import { FileClock, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SideNav() {
  const Menulist = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div>
      <div className="h-screen p-5 shadow-sm border">
        <div className="flex justify-center text-3xl font-bold">
          <h2>MangeshSAAS</h2>
        </div>
        <div className="mt-5">
          {Menulist.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div
                className={`flex gap-2 mb-2 p-3 hover:bg-purple-600 hover:text-white rounded-3xl ${
                  path === menu.path ? "bg-purple-600 text-white" : ""
                }`}
              >
                <menu.icon />
                <h2>{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
