"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import MultipleTextInput from "@/components/MultipleTextInput";
import { Button } from "@/components/ui/button";
import { redirectUtil } from "@/utils/redirect";
import {LogoXL}   from "@/components/LogoXL";

const API_URL ="https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

export default function EmployeeRegister() {
  const [name, setName] = useState("");
  const [skillset, setSkillset] = useState([]);
  const [background, setBackground] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  async function extractTextCv() {
    const formData = new FormData();

    formData.append("file", selectedFile, selectedFile.name);

    const response = await fetch(`${API_URL}/extract`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data;
  }

  async function register() {
    const cv = await extractTextCv();

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

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[rgb(221,218,216)]">
      <div className="p-4 rounded-xl shadow-2xl bg-white">
      <LogoXL />
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
            <input type="file" name="file" onChange={changeHandler} />
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
      </div>
      
    </main>
  );
}
