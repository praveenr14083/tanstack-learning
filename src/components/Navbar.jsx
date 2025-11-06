import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Regular Fetch",
    to: "/regular-fetch",
  },
  {
    title: "Tanstack Fetch",
    to: "/tanstack-fetch",
  },
  {
    title: "Tanstack query click",
    to: "/tanstack-query-click",
  },
  {
    title: "Pagenation",
    to: "/pagenation",
  },
  {
    title: "CRUD",
    to: "/crud",
  },
];

export default function Navbar() {
  return (
    <nav className="bg-black text-white w-full p-5 flex gap-3">
      {navItems.map((items, index) => (
        <NavLink
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
          to={items?.to}
          key={index}
        >
          {items?.title}
        </NavLink>
      ))}
    </nav>
  );
}
