"use client";
import { useEffect, useRef } from 'react';
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import MultipleTextInput from "./MultipleTextInput";
import Message from "./Message";
import Puente from "./Puente";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
    <div className="h-screen bg-[rgb(221,218,216)]">
      {/*cabecera*/}
      <div className="flex justify-between items-center h-[10vh] px-4 bg-[rgb(252,118,0)]">
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
        <div className="w-[20%] border p-2 flex flex-col items-center "> 
          <div className="text-center h-[90%] border w-full bg-[rgb(252,252,252)] rounded-xl px-4 " >
            <div className='p-4 uppercase font-bold'>register</div>
            <div className='text-white p-5 bg-[rgb(252,118,0)] rounded-xl'>
              {history.map((value, index) => (
              <div key={index} onClick={() => {
                setChat(value);
                setRecommendations([]);
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
        <div className="w-[70%] border">
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
          <div className=" border p-2 h-[50%]">
            <p>Filters</p>
            <MultipleTextInput values={filters} setValues={setFilters} />
          </div>
          {/* Recomendaciones */}
          <div className="border p-2 h-[50%] flex flex-col items-center">
            <div className='h-[10%]'>
              <Button onClick={(e) => {
                e.preventDefault();
                recommend();
              }}>Recommend</Button>    
            </div>
            <div className='h-[90%]'>
              {/*aqqui va el carrusel*/ }
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
            <div>
            <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
