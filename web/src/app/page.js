"use client";
import { useState } from "react";
import Link from "next/link";
import Register from "@/components/Register";
import { NavBarItems } from "@/components/NavBarItems";
import { Logo } from "@/components/Logo";
import {LogoXL}   from "@/components/LogoXL";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import  ConsoleText  from "@/components/ConsoleText";

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [Theme, setTheme] = useState(false);
  const toggle = () => {
    setMenu(!menu);
  };
  const toggle1 = () => {
    setTheme(!Theme);
  };
  

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[rgb(221,218,216)] dark:bg-[rgb(27,27,27)]">
      <div className={`z-10 bg-[rgb(252,118,00)] dark:bg-[rgb(0,0,0)] w-full h-screen items-center justify-center flex absolute transition-all duration-1000 ease-in-out ${menu ? "top-[-2000px]" : "top-0"}`}
      >
        <div  className="absolute top-0 right-0 flex justify-between w-full px-6 ">
          <div className="flex items-center justify-center">
            <Logo />
            <ul className="flex text-white">
              <li className="px-6 font-semibold">Home</li>
              <li className="px-6 font-semibold">About</li>
              <li className="px-6 font-semibold">Contacts</li>
            </ul>
          </div>
          <div className={`flex items-center justify-center ${menu ? "absolute " : ""}`}>
            <ModeToggle/>
          </div>
        </div>
        <div className="text-center">
          <div className="">
            <p className="text-white text-[120px] font-medium">Welcome To</p>
            <p className="text-white text-[160px]  font-extrabold hidden">
              <span className="text-black">EL Puente</span>
            </p>
            <div className="flex items-center justify-center">
            <ConsoleText 
              words={['EL PUENTE', 'EL PUENTE', 'EL PUENTE']} 
              fonts = {["Comic Sans MS", "Verdana", "Courier New"]}
              />
            </div>
            
          </div>
          <Button variant="secondary" size="lg"
            onClick={(e) => {
              toggle();
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="p-6 rounded-xl shadow-2xl bg-white dark:bg-[rgb(0,0,0)] -z-1000">
        <div className={`flex flex-col items-center justify-center absolute right-0 -top-[40px] transform-all duration-300 ease-in-out ${Theme ? "top-[0px]" : ""}`}>
            <ModeToggle/>
            <div onClick={toggle1} className={`bg-[rgb(252,252,252)] dark:bg-[rgb(0,0,0)] w-full text-center rounded cursor-pointer `}>▼</div>
        </div>
        <LogoXL />
        <div className="text-center mt-5 ">
          <p className="font-bold">El Puente is an IT Consulting firm based in SF, CA.</p>
          <p className="font-bold">Are you a company looking for developers?</p>
          <p className="font-bold">Register as Enterprise</p>
          <p className="font-bold">Are you an old/new employee at El Puente?</p>
          <p className="font-bold">Create a profile in our newest portal</p>
        </div>
        <div className="text-center">
          <p className="text-[rgb(252,118,0)] font-bold text-[40px] uppercase mt-4">Register</p>
        </div>
        <div className="flex">
          <Register type="Developer" link="/employee-register" />
          <Register type="Enterprise" link="/company-register" />
        </div>
        <div className="text-center">
          <p className="font-bold"> 
            Did your company already registered?{" "}
            <Link href="/company-login">
              <span className="text-[rgb(252,118,65)] font-bold">Login</span>
            </Link>
          </p>
        </div>
      </div>
      {/* <NavBar /> */}
    </main>
  );
}
