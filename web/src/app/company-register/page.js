"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Combobox } from "@/components/Combobox";
import { Button } from "@/components/ui/button";
import { redirectUtil } from "@/utils/redirect";
import {LogoXL}   from "@/components/LogoXL";
import { ModeToggle } from "@/components/ModeToggle";

const API_URL ="https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

export default function CompanyRegister() {
  const [name, setName] = useState("");
  const [Theme, setTheme] = useState(false);
  const [industry, setIndustry] = useState("Tech");
  const [background, setBackground] = useState("");

  const toggle1 = () => {
    setTheme(!Theme);
  };
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
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[rgb(221,218,216)] dark:bg-[rgb(27,27,27)]">
      <div className={`flex flex-col items-center justify-center absolute right-0 -top-[40px] ${Theme ? "top-[0px]" : ""}`}>
        <ModeToggle/>
        <div onClick={toggle1} className={`bg-[rgb(252,252,252)] dark:bg-[rgb(27,27,27)] w-full text-center rounded cursor-pointer `}>▼</div>
      </div>
      <div className="p-10 rounded-xl shadow-2xl bg-white dark:bg-[rgb(0,0,0)]">
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
