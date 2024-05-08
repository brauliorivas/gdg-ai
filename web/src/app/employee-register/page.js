"use client";

import { useState } from "react";
import Puente from "@/components/Puente";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import MultipleTextInput from "@/components/MultipleTextInput";
import { Button } from "@/components/ui/button";

export default function EmployeeRegister() {
  const [name, setName] = useState("");
  const [skillset, setSkillset] = useState([]);
  const [background, setBackground] = useState("");
  const [cv, setCv] = useState("");

  return (
    <main>
      <Puente />
      <div>
        <div>
          <InputLabel prompt="What's your name?" />
          <TextInput value={name} setValue={setName} />
        </div>
        <div>
          <InputLabel prompt="What are your skills?" />
          <MultipleTextInput values={skillset} setValues={setSkillset} />
        </div>
        <div>
          <InputLabel prompt="Describe yourself" />
          <TextInput value={background} setValue={setBackground} />
        </div>
        <div>
          <InputLabel prompt="Upload your CV" />
          <Button
            onClick={() => {
              console.log("Upload");
            }}
          >
            Upload
          </Button>
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
