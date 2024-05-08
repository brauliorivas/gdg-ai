"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Combobox } from "@/components/Combobox";
import { Button } from "@/components/ui/button";

export default function CompanyRegister() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [background, setBackground] = useState("");

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <Puente />
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
            console.log("Register");
          }}
        >
          Register
        </Button>
      </div>
    </main>
  );
}
