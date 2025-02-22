import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import avtarUser from "../assets/avtarUser.png";
import Loading from "../components/Loading/Loading";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Constants
const RATE_LIMIT_DELAY = 5000;
const API_KEY = "AIzaSyBjZJUpvBIVe15WR60tSq_smGm6QW2VZGg";
const MODEL_NAME = "gemini-2.0-flash";
const INITIAL_MESSAGE = "👋 Hello! I'm here to listen and support you. How are you feeling today?";

function ChatPage() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Refs
    const chatBoxRef = useRef(null);
    const genAI = useRef(null);
    const model = useRef(null);

    // Initialize Gemini once
    useEffect(() => {
        if (!API_KEY) {
            setError("API key is not configured");
            return;
        }
        try {
            genAI.current = new GoogleGenerativeAI(API_KEY);
            model.current = genAI.current.getGenerativeModel({ model: MODEL_NAME });
        } catch (error) {
            console.error("Error initializing Gemini:", error);
            setError("Failed to initialize chat service");
        }
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // Rate-limited API call handler
    const generateGeminiResponse = useCallback(async (userMessage) => {
        if (!model.current) {
            throw new Error("Chat service not initialized");
        }

        try {
            const prompt = `As a mental health assistant, provide a supportive and empathetic response to: "${userMessage}"
            Important guidelines:
            - Be empathetic and understanding
            - Avoid making assumptions
            - Encourage professional help when appropriate
            - Focus on active listening
            - Maintain boundaries and confidentiality`;

            const result = await model.current.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            if (error.message?.includes("429")) {
                throw new Error("Rate limit exceeded. Please wait a moment before trying again.");
            }
            throw error;
        }
    }, []);

    const handleSendMessage = useCallback(async () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage === "" || isLoading) return;

        setMessages(prev => [...prev, { text: trimmedMessage, sender: "user" }]);
        setMessage("");
        setIsLoading(true);
        setError(null);

        try {
            // Delay for rate limiting
            await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));

            const botResponse = await generateGeminiResponse(trimmedMessage);
            setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
        } catch (error) {
            console.error("Error in handleSendMessage:", error);
            setError(error.message);
            setMessages(prev => [
                ...prev,
                { 
                    text: error.message.includes("Rate limit") 
                        ? "I'm receiving too many messages right now. Please wait a moment and try again." 
                        : "I apologize, but I'm having trouble responding right now. Could you please try again?",
                    sender: "bot",
                    isError: true
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [message, isLoading, generateGeminiResponse]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    return (
        <div className="bg-[#e9fffe] min-h-screen">
            <Navbar />
            <div className="h-[89vh] flex justify-center items-center">
                <div className="border border-[#A9B5DF] w-[55vw] rounded-xl bg-white shadow-lg">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold pb-2 text-[#95a9f4]">Mental Health Assistant</h1>
                        <p className="text-[#8094db]">A safe space to talk about your feelings and get support. Everything you share is private and confidential.</p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    {/* Chat Box */}
                    <div 
                        ref={chatBoxRef}
                        className="h-[60vh] px-5 py-10 border-b-[1px] border-[#A9B5DF] border-t-[1px] overflow-y-auto flex flex-col"
                    >
                        {messages.length === 0 && (
                            <p className="text-gray-500">{INITIAL_MESSAGE}</p>
                        )}
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"} my-2`}
                            >
                                <div 
                                    className={`p-3 max-w-[70%] text-sm rounded-2xl ${
                                        msg.sender === "user"
                                            ? "bg-[#A9B5DF] text-white rounded-br-none"
                                            : `${msg.isError ? "bg-red-100" : "bg-gray-200"} text-gray-700 rounded-bl-none`
                                    }`}
                                >
                                    {msg.text}
                                </div>
                                {msg.sender === "user" && (
                                    <img
                                        src={avtarUser}
                                        alt="User"
                                        className="w-8 h-8 rounded-full ml-2"
                                    />
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center space-x-2">
                                <Loading />
                            </div>
                        )}
                    </div>

                    <div className="p-3 flex gap-3">
                        <textarea
                            className="border-[1.57px] border-[#A9B5DF] focus:outline-[#a0afe8] h-12 rounded p-2 w-[50vw] resize-none"
                            placeholder="Share how you're feeling..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            rows={1}
                        />
                        <button
                            className={`border rounded-md p-3 px-4 flex justify-center items-center text-white ${
                                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#A9B5DF] hover:bg-[#95a9f4]"
                            } transform transition-transform duration-200 hover:scale-110`}
                            onClick={handleSendMessage}
                            disabled={isLoading}
                            aria-label="Send message"
                        >
                            <i className="fa-regular fa-paper-plane text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;