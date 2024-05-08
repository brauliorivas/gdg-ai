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
    <main>
      <Puente />
      <div>
        <div>
          <InputLabel prompt="What's your company name?" />
          <TextInput value={name} setValue={setName} />
        </div>
        <div>
          <InputLabel prompt="What industry are you in?" />
          <Combobox selected={industry} setSelected={setIndustry} />
        </div>
        <div>
          <InputLabel prompt="Describe your company" />
          <TextInput value={background} setValue={setBackground} />
        </div>
      </div>
      <div>
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
