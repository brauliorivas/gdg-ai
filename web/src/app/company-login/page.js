"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { redirectUtil } from "@/utils/redirect";
import {LogoXL}   from "@/components/LogoXL";

const API_URL ="https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

export default function CompanyLogin() {
  const [name, setName] = useState("");

  const login = async () => {
    const response = await fetch(`${API_URL}/clients/?name=${name}`);
    const data = await response.json();

    const id = data.id;
    redirectUtil(`/company/${id}`);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[rgb(221,218,216)]">
      <div className="p-10 rounded-xl shadow-2xl bg-white">
      <LogoXL />
      <div className="mt-5">
        <div>
          <InputLabel prompt="Write your company name" />
          <TextInput value={name} setValue={setName} />
        </div>
      </div>
      <div className="mt-20">
        <Button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Login
        </Button>
      </div>
      </div>
      
    </main>
  );
}
