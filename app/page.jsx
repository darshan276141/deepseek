"use client";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar.jsx";
import { assets } from "@/deepseek-assets/assets/assets";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";


export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containerRef = useRef(null)

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ 
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      }) 
    }
  }, [messages])

  return (
    <div className="flex">
      <Sidebar expand={expand} setExpand={setExpand} />
      <div className="flex flex-col flex-1 relative min-h-screen bg-[#15171A] text-white">
        <div className="flex items-center gap-4 p-4">
          <Image onClick={() => (expand ? setExpand(false) : setExpand(true))}
            className="rotate-180" src={assets.menu_icon} alt="" />
          <Image className="opacity-70" src={assets.chat_icon} alt="" />
        </div>

        {messages.length === 0 ? (
          <>
            <div className="flex items-center gap-3">
              <Image src={assets.logo_icon} alt="" className="h-16 w-auto" />
              <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
            </div>
            <p className="text-sm mt-2"> How can I help you today?</p>
          </>
        ) : (
          <div ref={containerRef}
            className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
          >
            <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rouded-lg font-semibold mb-6">{selectedChat.name}</p>
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role} content={msg.content} />
            ))}
            {
              isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3">
                  <Image className="h-9 w-9 p-1 border border-white/15 rounded-full"
                    src={assets.logo_icon} alt="Logo" />
                  <div className="loader flex justify-center items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  </div>
                </div>
              )
            }
          </div>
        )}
        <PromptBox isLoading={isLoading} setisLoading={setisLoading} />
        <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>
      </div>
    </div>
  );
}
