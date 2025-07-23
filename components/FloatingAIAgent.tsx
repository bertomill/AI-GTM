'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Mic, MicOff, Volume2, VolumeX, X, Send, Minimize2 } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'agent'
  content: string
  timestamp: Date
}

export default function FloatingAIAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [textInput, setTextInput] = useState('')
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('')
          
          setCurrentTranscript(transcript)
          
          if (event.results[event.results.length - 1].isFinal) {
            handleUserMessage(transcript)
            setCurrentTranscript('')
          }
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
      }
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel()
      }
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleUserMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now() + '-user',
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    try {
      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: content.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const agentMessage: Message = {
        id: Date.now() + '-agent',
        type: 'agent', 
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])

      // Speak the response
      if (voiceEnabled && synthesisRef.current) {
        speakText(data.response)
      }
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = {
        id: Date.now() + '-error',
        type: 'agent',
        content: "I'm having trouble connecting right now. Could you try again?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onend = () => {
        setIsSpeaking(false)
      }
      
      synthesisRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textInput.trim()) {
      handleUserMessage(textInput)
      setTextInput('')
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating AI Agent Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] max-h-[80vh] bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Robert Mill AI</h3>
                  <p className="text-blue-200 text-xs">KPMG Strategy Expert</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      voiceEnabled 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-red-600/20 text-red-400'
                    }`}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
                      <p className="text-white/60 text-sm">Ask me about the KPMG AI strategy!</p>
                      <p className="text-white/40 text-xs mt-1">
                        Try: "Tell me about Phase 1" or "What metrics do you track?"
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.type === 'user'
                              ? 'bg-blue-600/20 text-blue-100'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-300 text-sm">
                          <div className="w-3 h-3 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                          Robert is thinking...
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Voice Controls */}
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      disabled={isProcessing || isSpeaking}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        isListening
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      } ${(isProcessing || isSpeaking) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          Speak
                        </>
                      )}
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                      >
                        <VolumeX className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {currentTranscript && (
                    <div className="mb-3 p-2 bg-white/5 rounded-lg">
                      <p className="text-white/70 text-xs">Listening: "{currentTranscript}"</p>
                    </div>
                  )}

                  {/* Text Input */}
                  <form onSubmit={handleTextSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your question..."
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!textInput.trim() || isProcessing}
                      className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}