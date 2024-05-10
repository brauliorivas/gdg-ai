"use client";

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

  return (
    <div className="flex h-screen">
      <div className="w-[20%] flex flex-col items-center">
        <Puente height={50} />
        <div className=""> 
          {history.map((value, index) => (
            <div key={index} onClick={() => {
              setChat(value);
              setRecommendations([]);
            }}>
              <div>{value.title}</div>
              <div>{value.created}</div>
            </div>
          ))}
          <div className="">
            <div className="flex flex-col items-center">
              <Button onClick={newChat}>New Chat</Button> 
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/4">
        
        {/* Chat */}
        <div className="">
          <div>
            <div>
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
              <div className="">
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
              <div>
                <Button onClick={(e) => {
                  e.preventDefault();
                  recommend();
                }}>Recommend</Button>
              </div>
            </div>

            {
              recommendations.map((recommendation, index) => (
                <div key={index}>
                  <div>{recommendation.name}</div>
                  <div>{recommendation.skillset.join(" ")}</div>
                  <div>{recommendation.background}</div>
                  <div>{recommendation.score_cv}</div>
                  <div>{recommendation.score_background}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        {/* Avatar */}
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p>Filters</p>
          <MultipleTextInput values={filters} setValues={setFilters} />
        </div>
      </div>
    </div>
  )
}
