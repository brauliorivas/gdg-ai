"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { navigate } from "./actions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CompanyLogin() {
  const [name, setName] = useState("");

  const login = async () => {
    const response = await fetch(`${API_URL}/clients/?name=${name}`);
    const data = await response.json();

    const id = data.id;
    navigate(id);
  };

  return (
    <main>
      <Puente />
      <div>
        <div>
          <InputLabel prompt="Write your company name" />
          <TextInput value={name} setValue={setName} />
        </div>
      </div>
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Login
        </Button>
      </div>
    </main>
  );
}
