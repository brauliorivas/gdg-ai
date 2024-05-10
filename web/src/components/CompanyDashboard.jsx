"use client";
import { useEffect, useRef } from 'react';
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import MultipleTextInput from "./MultipleTextInput";
import Message from "./Message";
import Puente from "./Puente";

const API_URL = "http://127.0.0.1:8000https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

export default function CompanyDashboard({ data }) {
  const id = data.id;
  const vector = data.background_vector;
  
  const [history, setHistory] = useState(data.history);
  
  const [chat, setChat] = useState(null);

  const [input, setInput] = useState("");

  const [filters, setFilters] = useState([]);

  const [recommendations, setRecommendations] = useState([]);


  const newChat = () => {
    setChat({
      title: "New Chat",
      created: new Date().toISOString(),
      messages: []
    });
  }

  async function sendMessage() {
    const newTitle = chat.messages.length === 0 ? input.slice(0, 20).trim() : chat.title;

    const updatedChat = {
      title: newTitle,
      created: chat.created,
      messages: chat.messages.concat(
        {
          role: "user",
          parts: [input]
        }
      ),
    }

    const requestObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedChat)
    }

    const res = await fetch(`${API_URL}/clients/chat`, requestObject);
    const data = await res.json();
    setInput("");
    setChat(data); 
  }

  async function recommend() {
    const requestObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat,
        background: vector,
        skillset: filters
      })
    };

    const res = await fetch(`${API_URL}/employees/recommend`, requestObject);
    const data = await res.json();
    
    setRecommendations(data);
    
    const updateUserHistory = !history.find((value) => value.title === chat.title);
    
    if (updateUserHistory) {
      setHistory(history.concat(chat));
      await fetch(`${API_URL}/clients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(chat)
      });
    }
  }
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      scrollToBottom();
  }, [chat]);

  return (
    <div className="h-screen">
      {/*cabecera*/}
      <div className="flex justify-between items-center h-[10vh]">
        <Puente height={50} />
        {/* Avatar */}
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      {/*cuerpo*/}
      <div className="flex h-[90vh]">
        {/* Historial */}
        <div className="w-[20%] border p-2 flex flex-col items-center"> 
          <div className="text-center h-[90%] border w-full">
            <div>Historial</div>
            <div>
              {history.map((value, index) => (
              <div key={index} onClick={() => {
                setChat(value);
                setRecommendations([]);
              }}>
                <div>{value.title}</div>
                <div>{value.created}</div>
              </div>
              ))}  
            </div>
          </div>
          <div className=" h-[10%] border w-full text-center">
            <Button onClick={newChat}>New Chat</Button> 
          </div>
        </div>
        {/*chat,filtro y recomendacion*/}
        <div className="w-[80%] border">
          {/* Chat y filtro*/}
          <div className="flex h-[80%]">
            {/* Chat */}
            <div className="w-[75%] border p-2 flex flex-col">
              {/* Dialogo */}
              <div className="h-[85%] overflow-y-auto border w-full ">
                  {chat && 
                    <Message text="¡Hello! ¿What profile are you searching for?" orientation="left" />
                  }
                  {chat && chat.messages && chat.messages.length === 1 &&
                    chat.messages.map((message, index) => (
                      <Message key={index} text={message.parts[0]} orientation={message.role === "user" ? "right" : "left"}/>
                    ))
                  }
                  {chat && chat.messages && chat.messages.length !== 1 &&
                    chat.messages.slice(2).map((message, index) => (
                      <Message key={index} text={message.parts[0]} orientation={message.role === "user" ? "right" : "left"}/>
                    ))
                  }
                  <div ref={messagesEndRef} />
              </div >
              {/* Form pregunta */}
              <div className="flex h-[15%] border items-center">
                  <Textarea onChange={(event) => {
                    setInput(event.target.value);
                  }}
                    value={input}
                  />
                  <Button onClick={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}>Send</Button>
              </div>
            </div>
            {/*filtros*/}
            <div className="w-[25%] border p-2">
            <p>Filters</p>
              <MultipleTextInput values={filters} setValues={setFilters} />
            </div>
          </div>
          {/* Recomendaciones */}
          <div className="border p-2 h-[20%]">
            <div>
              <Button onClick={(e) => {
                e.preventDefault();
                recommend();
              }}>Recommend</Button>    
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
