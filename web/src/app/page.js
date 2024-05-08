"use client";
// import { NavBar } from "@/components/NavBar";
import Link from "next/link";
import Register from "@/components/Register";
import Puente from "@/components/Puente";

export default function Home() {
  return (
    <main>
      <Puente />
      <div>
        <p>El Puente is an IT Consulting firm based in SF, CA.</p>
        <p>Are you a company looking for developers?</p>
        <p>Register as Enterprise</p>
        <p>Are you an old/new employee at El Puente?</p>
        <p>Create a profile in our newest portal</p>
      </div>
      <div>
        <p>Register</p>
      </div>
      <div>
        <Register type="Developer" link="/employee-register" />
        <Register type="Enterprise" link="/company-register" />
      </div>
      <div>
        <p>
          Did your company already registered?{" "}
          <Link href="/company-login">Login</Link>
        </p>
      </div>
      {/* <NavBar /> */}
    </main>
  );
}
