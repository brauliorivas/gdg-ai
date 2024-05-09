"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import MultipleTextInput from "@/components/MultipleTextInput";
import { Button } from "@/components/ui/button";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : process.env.NEXT_PUBLIC_API_URL;

export default function EmployeeRegister() {
  const [name, setName] = useState("");
  const [skillset, setSkillset] = useState([]);
  const [background, setBackground] = useState("");
  const [cv, setCv] = useState("");

  async function register() {
    const requestObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        skillset,
        background,
        cv,
      }),
    };

    const response = await fetch(`${API_URL}/employees/`, requestObject);

    if (response.ok) {
      redirectUtil("/");
    }
  }

  function uploadCV() {}

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <Puente />
      <div className="mt-5">
        <div>
          <InputLabel prompt="What's your name?" />
          <TextInput value={name} setValue={setName} />
        </div>
        <div className="mt-5">
          <InputLabel prompt="What are your skills?" />
          <MultipleTextInput values={skillset} setValues={setSkillset} />
        </div>
        <div className="mt-5">
          <InputLabel prompt="Describe yourself" />
          <TextInput value={background} setValue={setBackground} />
        </div>
        <div className="flex mt-5 items-center">
          <InputLabel prompt="Upload your CV" />
          <div className="mx-5">
            <Button
              variant="destructive"
              onClick={() => {
                uploadCV();
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
      <div className="m-5">
        <Button
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            register();
          }}
        >
          Register
        </Button>
      </div>
    </main>
  );
}
