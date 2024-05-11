"use client";
import { useEffect, useRef } from 'react';
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import InfoFilter from "./InfoFilter";
import Message from "./Message";
import Puente from "./Puente";
import { Logo } from "@/components/Logo";

const API_URL = "https://organisational-berget-brauliorivas-2b6dec69.koyeb.app";

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
    setFilters([]);
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
    setFilters([]);
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
    <div className="h-screen bg-[rgb(221,218,216)] overflow-hidden">
      {/*cabecera*/}
      <div className="flex justify-between items-center h-[10vh] px-4 bg-[rgb(252,118,0)]">
        <Logo />
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
        <div className="w-[20%] border p-2 flex flex-col items-center "> 
          <div className="text-center h-[90%] border w-full bg-[rgb(252,252,252)] rounded-xl px-4 " >
            <div className='p-4 uppercase font-bold'>register</div>
            <div className='text-white p-5 bg-[rgb(252,118,0)] rounded-xl'>
              {history.map((value, index) => (
              <div key={index} onClick={() => {
                setChat(value);
                setRecommendations([]);
                setFilters([]);
              }}>
                <div className='font-medium'>{value.title}</div>
                <div className='font-medium'> {value.created}</div>
              </div>
              ))}  
            </div>
          </div>
          <div className=" h-[10%]  w-full flex items-center justify-center">
            <Button onClick={newChat}>New Chat</Button> 
          </div>
        </div>
        {/*chat,filtro y recomendacion*/}
        <div className="w-[70%]">
          {/* Chat y filtro*/}
          <div className="flex h-[100%]">
            {/* Chat */}
            <div className="w-[100%] border p-2 flex flex-col">
              {/* Dialogo */}
              <div className="h-[85%] overflow-y-auto  w-full bg-[rgb(252,252,252)] rounded-t-xl">
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
              <div className="flex h-[15%] items-center bg-[rgb(252,252,252)] rounded-b-xl px-4">
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
            
          </div>
          
        </div>
        <div className='w-[20%]'>
          {/*filtros*/}
          <div className="p-2 h-[20%]">
            <p>Filters</p>
            <InfoFilter name={'Language'} values={filters} setValues={setFilters}/>
            <InfoFilter name={'Framework'} values={filters} setValues={setFilters}/>
          </div>
          <div className="p-2 flex flex-col items-center">
            <div className='h-[10%]'>
              <Button onClick={(e) => {
                e.preventDefault();
                recommend();
              }}>Recommend</Button>    
            </div>
            <div className='mt-4 overflow-y-auto'>
              {
                recommendations.sort((a, b) => b.score_cv - a.score_cv).map((recommendations, index) => (
                  <div key={index} className='bg-white my-5 border-2 p-4 rounded-xl border-black'>
                    <div className='font-bold'>{recommendations.name}</div>
                    <div>Skills: {recommendations.skillset.join(",")}</div>
                    <div className={`rounded-xl w-fit px-2 text-white bg-${recommendations.score_cv <  0.25 ? "red-500" : recommendations.score_cv <  0.50 ? "yellow-500" : "green-500"}`}>Score: {recommendations.score_cv.toFixed(2)}</div>
                    <div>Background: {recommendations.score_background < 0.25 ? "Very diverse" : recommendations.score_background < 0.50 ? "Diverse" : "Similar"}</div> 
                  </div>
                ))
              }
            </div>
          </div>
          <div className='mt-auto mx-auto flex flex-row justify-evenly text-white font-black'>
            {/* Green means high, yellow means medium and red means low */}
            <div className='bg-green-500 px-2 rounded'>
              <p>High</p>
            </div>
            <div className='bg-yellow-500 px-2 rounded'>
              <p>Medium</p>
            </div>
            <div className='bg-red-500 px-2 rounded'>
              <p>Low</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
