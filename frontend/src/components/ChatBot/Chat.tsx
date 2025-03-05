"use client";
import { useSocket } from "@/hooks/socket";
import { SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Chat = ({ subject }: { subject: string }) => {
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; sender: "you" | "bot" }[]
  >([{ text: "Hey, I am Kevin, your AI assistant!", sender: "bot" }]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Load previous chat from sessionStorage
  useEffect(() => {
    const chatHistory = sessionStorage.getItem("chatMessages");
    if (chatHistory) {
      setMessages(JSON.parse(chatHistory));
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("chatMessage", (m) => {
      console.log("Received message:", m);

      const botMessage =
        typeof m === "string" ? m : m.text || JSON.stringify(m);

      setMessages((prev) => {
        const updatedMessages: { text: string; sender: "you" | "bot" }[] = [
          ...prev,
          { sender: "bot", text: botMessage },
        ];
        sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;
    setLoading(false);

    socket.emit("chatMessage", { message, subject });
    setMessages((prev) => {
      const updatedMessages: { text: string; sender: "you" | "bot" }[] = [
        ...prev,
        { text: message, sender: "you" },
      ];
      sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col w-full h-[34rem] bg-purple-300 text-white font-bold text-lg rounded-lg shadow-lg">
      <div className="m-auto p-4 w-24 rounded-l-md rounded-r-md rounded-t-none bg-black mb-1" />

      {/* Chat messages container */}
      <div className="flex-1 space-y-2 overflow-y-auto mb-3 pr-2 p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "you" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-md max-w-[80%] flex items-center gap-1 ${
                msg.sender === "you"
                  ? "bg-purple-950 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <div className="flex gap-1">
                <p className="text-sm">
                  {msg.sender === "you" ? "You" : "Kevin"}:
                </p>
                {/* response */}
                <p className="text-sm leading-relaxed">
                  {typeof msg.text === "string"
                    ? msg.text.split("`").map((part, index) =>
                        index % 2 === 0 ? (
                          part
                        ) : (
                          <span
                            key={index}
                            className="font-mono bg-gray-200 px-1 rounded"
                          >
                            {part}
                          </span>
                        )
                      )
                    : JSON.stringify(msg.text)}
                </p>
                {loading && (
                  <div className="flex justify-start">
                    <div className="p-2 rounded-md max-w-[80%] bg-gray-100 text-black">
                      <p className="text-sm">Kevin:</p>
                      <p className="text-sm animate-pulse">...</p>{" "}
                      {/* Loading effect */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Auto-scroll reference */}
      </div>

      {/* Chat input */}
      <div className="flex gap-1 p-4">
        <Input
          type="text"
          className="w-full text-black border border-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // ✅ Send on Enter key press
        />
        <Button
          onClick={sendMessage}
          className="bg-white text-slate-600 hover:text-white"
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
