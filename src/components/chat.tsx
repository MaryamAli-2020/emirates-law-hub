"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { MessageSquare, Send, Bot, User, CornerDownLeft, Mic, Paperclip, Loader } from "lucide-react"
import { chat, ChatInput, ChatOutput } from "@/ai/flows/chat-flow"
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
    role: 'user' | 'assistant';
    content: string;
}

export function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    role: 'assistant',
                    content: 'Hello! How can I help you understand UAE legislation today?'
                }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        // Auto-scroll to the bottom when messages change
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat({ query: input, history: messages.slice(-5) }); // Pass recent history for context
            const assistantMessage: Message = { role: 'assistant', content: response.answer };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Error calling chat flow:", error);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
                        size="icon"
                    >
                        <Bot className="h-8 w-8" />
                        <span className="sr-only">Open AI Chat</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>AI Legal Assistant</SheetTitle>
                        <SheetDescription>
                            Ask questions about UAE legislation in plain language.
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={cn(
                                    "flex items-start gap-3",
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}>
                                    {message.role === 'assistant' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot size={20} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "rounded-lg px-3 py-2 max-w-[80%]",
                                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    )}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                         <Avatar className="h-8 w-8">
                                            <AvatarFallback><User size={20} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-3 justify-start">
                                     <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot size={20} /></AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                                        <Loader className="h-5 w-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter className="p-4 border-t bg-background">
                         <div className="relative w-full">
                            <Textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your question here..."
                                className="pr-12 resize-none"
                                rows={1}
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={handleSendMessage}
                                disabled={isLoading || !input.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}
