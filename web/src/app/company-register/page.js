"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Combobox } from "@/components/Combobox";
import { Button } from "@/components/ui/button";
import { redirectUtil } from "@/utils/redirect";
import {LogoXL}   from "@/components/LogoXL";

const API_URL ="https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

export default function CompanyRegister() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Tech");
  const [background, setBackground] = useState("");

  async function register() {
    const requestObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        industry,
        background,
      }),
    };

    const response = await fetch(`${API_URL}/clients/`, requestObject);

    if (response.ok) {
      redirectUtil("/company-login");
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[rgb(221,218,216)]">
      <div className="p-10 rounded-xl shadow-2xl bg-white">
      <LogoXL />
      <div>
        <div className="mt-5">
          <InputLabel prompt="What's your company name?" />
          <TextInput value={name} setValue={setName} />
        </div>
        <div className="mt-5">
          <InputLabel prompt="What industry are you in?" />
          <Combobox selected={industry} setSelected={setIndustry} />
        </div>
        <div className="mt-5">
          <InputLabel prompt="Describe your company" />
          <TextInput value={background} setValue={setBackground} />
        </div>
      </div>
      <div className="m-5">
        <Button
          onClick={() => {
            register();
          }}
        >
          Register
        </Button>
      </div>
      </div>
      
    </main>
  );
}
