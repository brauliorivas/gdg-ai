"use client";
import { useState } from "react";
import Link from "next/link";
import Register from "@/components/Register";
import Puente from "@/components/Puente";
import { NavBarItems } from "@/components/NavBarItems";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [menu, setMenu] = useState(false);
  const toggle = () => {
    setMenu(!menu);
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div
        className={`bg-[rgb(252,118,65)] w-full h-screen items-center justify-center flex absolute transition-all duration-1000 ease-in-out ${
          menu ? "top-[-2000px]" : "top-0"
        }`}
      >
        <div className="absolute top-0 right-0 flex justify-between w-full px-6">
          <div className="flex items-center justify-center">
            <Logo />
            <ul className="flex text-white">
              <li className="px-6">Home</li>
              <li className="px-6">About</li>
              <li className="px-6">Contacts</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">button</div>
        </div>
        <div className="text-center">
          <div className="">
            <p className="text-white text-[120px]">Welcome To</p>
            <p className="text-white text-[120px]">
              <span className="text-black">EL Puente</span>
            </p>
          </div>
          <Button
            onClick={(e) => {
              toggle();
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="">
        <Puente />
        <div className="text-center mt-5 ">
          <p>El Puente is an IT Consulting firm based in SF, CA.</p>
          <p>Are you a company looking for developers?</p>
          <p>Register as Enterprise</p>
          <p>Are you an old/new employee at El Puente?</p>
          <p>Create a profile in our newest portal</p>
        </div>
        <div className="text-center">
          <p>Register</p>
        </div>
        <div className="flex">
          <Register type="Developer" link="/employee-register" />
          <Register type="Enterprise" link="/company-register" />
        </div>
        <div className="text-center">
          <p>
            Did your company already registered?{" "}
            <Link href="/company-login">
              <span className="text-[rgb(252,118,65)]">Login</span>
            </Link>
          </p>
        </div>
      </div>
      {/* <NavBar /> */}
    </main>
  );
}
