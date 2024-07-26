'use client'
import { Button, Input } from '@nextui-org/react'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { useState } from 'react'

export default function ChatBot() {
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
    const [input, setInput] = useState('')

    const sendMessages = async (chatMessages: ChatCompletionMessageParam[]) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_FRONT}/api/ia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat: [...chatMessages],
            }),
            cache: 'no-store',
        })
        return res
    }

    const handleSendMessage = async () => {
        if (input.trim()) {
            const userMessage: ChatCompletionMessageParam = { content: input, role: 'user' }
            setMessages((prevMessages) => [...prevMessages, userMessage])
            setInput('')

            try {
                const res = await sendMessages([...messages, userMessage])
                if (res.ok) {
                    const messagesRes = await res.json()
                    setMessages((prevMessages) => [...prevMessages, messagesRes])
                } else {
                    console.error('Failed to fetch messages:', res.statusText)
                }
            } catch (error) {
                console.error('Error fetching messages:', error)
            }
        }
    }

    return (
        <div className='flex flex-col h-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='flex-1 p-4 overflow-y-auto'>
                <div className={`flex mb-4 justify-start`}>
                    <div className={`p-3 rounded-lg max-w-xs break-words bg-yellow-100 text-gray-800`}>
                        ¡Hola! soy tu asistente médico virtual. ¿En qué puedo ayudarte hoy?
                    </div>
                </div>
                {messages.map((message) => (
                    <div
                        key={message.content as string}
                        className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-xs break-words ${
                                message.role === 'user' ? 'bg-purple-500 text-white' : 'bg-yellow-100 text-gray-800'
                            }`}
                        >
                            {message.content as string}
                        </div>
                    </div>
                ))}
            </div>
            <div className='border-t border-gray-200 p-4'>
                <div className='flex gap-2'>
                    <Input
                        type='text'
                        radius='lg'
                        placeholder='Escribe un mensaje...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button color='warning' onClick={handleSendMessage}>
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    )
}
