"use client";
// import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import Register from "@/components/Register";
import Puente from "@/components/Puente";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <Puente />
      <div className="text-center mt-5">
        <p>El Puente is an IT Consulting firm based in SF, CA.</p>
        <p>Are you a company looking for developers?</p>
        <p>Register as Enterprise</p>
        <p>Are you an old/new employee at El Puente?</p>
        <p>Create a profile in our newest portal</p>
      </div>
      <div>
        <p>Register</p>
      </div>
      <div className="flex">
        <Register type="Developer" link="/employee-register" />
        <Register type="Enterprise" link="/company-register" />
      </div>
      <div>
        <p>
          Did your company already registered?{" "}
          <Link href="/company-login"><span className="text-[rgb(252,118,65)]">Login</span></Link>
        </p>
      </div>
      {/* <NavBar /> */}
    </main>
  );
}
