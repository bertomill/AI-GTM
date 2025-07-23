'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Brain, Target, Users, BarChart3, Lightbulb, CheckCircle, Lock, Eye, EyeOff, FileText, Github, Linkedin, Youtube, Twitter, MessageSquare, HelpCircle, Send, X, Minimize2, Maximize2, Mic, MicOff, Phone, PhoneCall } from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import * as Progress from '@radix-ui/react-progress'
import * as Accordion from '@radix-ui/react-accordion'

// AI Agent Chat Component
function AIAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Robert Mill\'s AI assistant, here to share his expertise on AI adoption strategy. I can provide detailed answers about Robert\'s 4-phase rollout methodology, his CIBC experience scaling from 300 to 15,000 users, specific platform implementations, stakeholder engagement tactics, success metrics, and much more. What aspect of Robert\'s proven AI adoption strategy would you like to explore?'
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return

    const userMessage = currentMessage.trim()
    setCurrentMessage('')
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      })

      const data = await response.json()
      
      // Add assistant response
      setMessages([...newMessages, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'I apologize, but I\'m having trouble processing your question right now. Could you please try again?' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating AI Agent Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full shadow-lg flex items-center justify-center z-50 border-2 border-cyan-400/50"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-[480px] h-[780px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Robert Mill AI</h3>
                  <p className="text-cyan-300 text-xs">Strategy Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto h-[560px] space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-white/10 text-white border border-cyan-500/30'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 border border-cyan-500/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                                         </motion.div>
                   )}
                   
                   {/* Scroll anchor */}
                   <div ref={messagesEndRef} />
                 </div>

                 {/* Input */}
                <div className="p-4 border-t border-cyan-500/30">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Robert about specific phases, CIBC lessons learned, metrics, objection handling..."
                      className="flex-1 bg-white/10 border border-cyan-500/30 rounded-lg px-3 py-3 text-white placeholder-white/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 min-h-[44px] max-h-32"
                      rows={2}
                      disabled={isLoading}
                    />
                    <div className="flex flex-col gap-1">
                      {/* Voice button placeholder - coming soon */}
                      <button
                        disabled={true}
                        className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 disabled:opacity-30 disabled:cursor-not-allowed p-2 rounded-lg transition-all"
                        title="Voice mode coming soon!"
                      >
                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                          <path d="M12 19v4"/>
                          <path d="M8 23h8"/>
                        </svg>
                      </button>
                      <button
                        onClick={sendMessage}
                        disabled={!currentMessage.trim() || isLoading}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-all"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="text-cyan-300/60 text-xs mt-2">Press Enter to send, Shift+Enter for new line • Voice mode coming soon</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// AI Voice Agent Component
function AIVoiceAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('disconnected') // 'disconnected', 'connecting', 'connected', 'error'
  const [transcript, setTranscript] = useState('')
  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // Initialize voice connection using OpenAI Realtime API with WebRTC
  const startVoiceConnection = async () => {
    setConnectionStatus('connecting')
    
    try {
      // Get ephemeral token from server (following OpenAI docs)
      const tokenResponse = await fetch('/api/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get-ephemeral-token' })
      })
      
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json()
        throw new Error(`Token request failed: ${errorData.details || errorData.error}`)
      }
      
      const tokenData = await tokenResponse.json()
      const EPHEMERAL_KEY = tokenData.client_secret.value
      
      // Create WebRTC peer connection (following OpenAI docs)
      const pc = new RTCPeerConnection()
      
      // Set up to play remote audio from the model
      const audioEl = document.createElement('audio')
      audioEl.autoplay = true
      audioEl.style.display = 'none' // Hidden audio element
      document.body.appendChild(audioEl)
      
      pc.ontrack = (e) => {
        console.log('Received remote audio track')
        audioEl.srcObject = e.streams[0]
      }
      
      // Add local audio track for microphone input
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      })
      pc.addTrack(stream.getTracks()[0])
      
      // Set up data channel for sending and receiving events
      const dc = pc.createDataChannel('oai-events')
      dc.addEventListener('message', (e) => {
        try {
          const event = JSON.parse(e.data)
          console.log('Received event:', event)
          
          // Handle different event types
          switch (event.type) {
            case 'input_audio_buffer.speech_started':
              setIsListening(true)
              break
              
            case 'input_audio_buffer.speech_stopped':
              setIsListening(false)
              break
              
            case 'conversation.item.input_audio_transcription.completed':
              setTranscript(prev => prev + `\n\nYou: ${event.transcript}`)
              break
              
            case 'response.text.delta':
              // Update transcript with AI response
              setTranscript(prev => {
                const lines = prev.split('\n')
                const lastLine = lines[lines.length - 1]
                if (lastLine.startsWith('Robert Mill AI: ')) {
                  lines[lines.length - 1] = lastLine + event.delta
                } else {
                  lines.push(`Robert Mill AI: ${event.delta}`)
                }
                return lines.join('\n')
              })
              break
              
            case 'response.done':
              setIsListening(false)
              break
          }
        } catch (error) {
          console.error('Error parsing event:', error)
        }
      })
      
      dc.addEventListener('open', () => {
        console.log('Data channel opened')
        setConnectionStatus('connected')
        setIsConnected(true)
        setTranscript('✅ Connected to Robert Mill AI via OpenAI Realtime API!\n\nStart speaking to begin the conversation...')
      })
      
      dc.addEventListener('error', (error) => {
        console.error('Data channel error:', error)
        setConnectionStatus('error')
      })
      
      // Start the session using SDP (Session Description Protocol)
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      
      const baseUrl = 'https://api.openai.com/v1/realtime'
      const model = 'gpt-4o-realtime-preview-2024-12-17'
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          'Content-Type': 'application/sdp'
        },
      })
      
      if (!sdpResponse.ok) {
        throw new Error(`SDP exchange failed: ${sdpResponse.status}`)
      }
      
      const answer = {
        type: 'answer' as RTCSdpType,
        sdp: await sdpResponse.text(),
      }
      await pc.setRemoteDescription(answer)
      
      // Store peer connection for cleanup
      wsRef.current = pc as any
      audioContextRef.current = audioEl as any
      
    } catch (error) {
      console.error('Voice connection failed:', error)
      setConnectionStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setTranscript(`❌ Failed to connect: ${errorMessage}\n\nPlease ensure you have a valid OpenAI API key and try again.`)
    }
  }
  


  const endVoiceConnection = () => {
    setConnectionStatus('disconnected')
    setIsConnected(false)
    setIsListening(false)
    setTranscript('')
    
    // Close WebRTC peer connection
    if (wsRef.current) {
      try {
        const pc = wsRef.current as any
        if (pc.close) {
          pc.close()
        }
      } catch (error) {
        console.error('Error closing peer connection:', error)
      }
      wsRef.current = null
    }
    
    // Remove audio element
    if (audioContextRef.current) {
      try {
        const audioEl = audioContextRef.current as any
        if (audioEl.remove) {
          audioEl.remove()
        }
      } catch (error) {
        console.error('Error removing audio element:', error)
      }
      audioContextRef.current = null
    }
  }

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    
    // For WebRTC, mute/unmute is handled by enabling/disabling the audio track
    if (wsRef.current) {
      try {
        const pc = wsRef.current as any
        if (pc.getSenders) {
          const senders = pc.getSenders()
          const audioSender = senders.find((sender: any) => 
            sender.track && sender.track.kind === 'audio'
          )
          
          if (audioSender && audioSender.track) {
            audioSender.track.enabled = !newMutedState
          }
        }
      } catch (error) {
        console.error('Error toggling mute:', error)
      }
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400'
      case 'connecting': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected'
      case 'connecting': return 'Connecting...'
      case 'error': return 'Connection Failed'
      default: return 'Disconnected'
    }
  }

  return (
    <>
      {/* Floating Voice Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-24 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full shadow-lg flex items-center justify-center z-50 border-2 border-purple-400/50"
          >
            <Mic className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Voice Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-24 bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-[420px] h-[500px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Robert Mill AI Voice</h3>
                  <p className={`text-xs ${getStatusColor()}`}>{getStatusText()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Voice Chat Content */}
            {!isMinimized && (
              <>
                {/* Connection Status & Transcript */}
                <div className="flex-1 p-4 h-[320px] flex flex-col">
                  {/* Visual Indicators */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{
                        scale: isListening ? [1, 1.2, 1] : 1,
                        opacity: isListening ? [0.5, 1, 0.5] : 0.7
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isListening ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                        isConnected 
                          ? 'border-green-400 bg-green-400/20' 
                          : 'border-purple-400 bg-purple-400/20'
                      }`}
                    >
                      {isConnected ? (
                        <PhoneCall className="w-8 h-8 text-green-400" />
                      ) : (
                        <Mic className="w-8 h-8 text-purple-400" />
                      )}
                    </motion.div>
                  </div>

                  {/* Transcript Area */}
                  <div className="flex-1 bg-white/5 rounded-lg p-4 border border-white/10 mb-4 overflow-y-auto">
                    <h4 className="text-white font-medium mb-2">Live Transcript</h4>
                    <div className="text-white/80 text-sm leading-relaxed">
                      {transcript || 'Start a conversation to see the live transcript...'}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="p-4 border-t border-purple-500/30">
                  <div className="flex items-center justify-center gap-4">
                    {!isConnected ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startVoiceConnection}
                        disabled={connectionStatus === 'connecting'}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        {connectionStatus === 'connecting' ? 'Connecting...' : 'Start Voice Call'}
                      </motion.button>
                    ) : (
                      <>
                        <button
                          onClick={toggleMute}
                          className={`p-3 rounded-lg transition-all ${
                            isMuted 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                          }`}
                          title={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={endVoiceConnection}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all"
                        >
                          <PhoneCall className="w-4 h-4" />
                          End Call
                        </motion.button>
                      </>
                    )}
                  </div>
                  
                  <p className="text-purple-300/60 text-xs mt-3 text-center">
                    {isConnected 
                      ? 'Speak naturally - Robert Mill AI is listening' 
                      : 'Click to start a live voice conversation with Robert Mill AI'
                    }
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Password protection component
function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('aigtm-authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Check password via API route for security
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('aigtm-authenticated', 'true')
        setError('')
      } else {
        setError('Incorrect password. Please try again.')
        setPassword('')
      }
    } catch (error) {
      setError('Authentication error. Please try again.')
      setPassword('')
    }
  }

  // Handle logout (optional - you can remove this if not needed)
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('aigtm-authenticated')
    setPassword('')
  }

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <div className="glass-effect rounded-xl p-8 border border-white/20">
            {/* Lock Icon and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                AI GTM Strategy
              </h1>
              <p className="text-blue-200 text-sm">
                This application contains confidential information
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    placeholder="Enter password to access"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                >
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Access Application
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/60 text-xs">
                Authorized personnel only
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Show main app content if authenticated
  return (
    <div className="relative">
      {/* Optional: Add logout button in header */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleLogout}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  )
}

const strategySteps = [
  {
    id: 'assignment',
    title: 'Assignment Context',
    icon: <FileText className="w-6 h-6" />,
    description: 'Case study requirements and context',
    content: {
      role: 'Robert Mill, Senior Consultant – AI Solutions & Go-to-Market at KPMG, presenting this strategic analysis to our internal steering group.',
      scenario: 'Our Tax practice has recently piloted a generative AI tool designed to review tax-related contracts and extract key metadata. The tool has delivered promising results—but adoption has been limited to a small pilot group.',
      challenge: 'Leadership is now looking to scale the use of AI across broader Tax functions, but we are encountering inconsistent interest, low engagement, and general uncertainty about AI across our teams.',
      audience: 'Internal steering group (Tax, Product, and Technology leaders)',
      timeframe: '20-minute strategic presentation with discussion and Q&A',
              keyTopics: [
          'Root cause analysis of slow adoption barriers',
          'Strategic approach to uncover people, process, technology, and cultural barriers',
          'Comprehensive internal rollout and awareness strategy',
          'Targeted messaging, communication channels, and supporting materials',
          'Stakeholder engagement tactics for AI-skeptical leadership',
          'Required support structures, training programs, and change management',
          'Success metrics, KPIs, milestones, and performance tracking framework'
        ]
    }
  },
  {
    id: 'diagnosis',
    title: 'Current State Diagnosis',
    icon: <Brain className="w-6 h-6" />,
    description: 'Understanding barriers and opportunities',
    experience: {
      title: 'Proven Experience: CIBC AI Rollout (300 → 15,000 users)',
      description: 'Internal knowledge-based search tool with ChatGPT-like Q&A capabilities',
      insights: [
        'Pilot group shows 40% efficiency gains in contract review',
        'Limited adoption due to lack of awareness and training', 
        'Middle management skepticism about AI reliability',
        'No clear success metrics or ROI demonstration'
      ]
    },
    rootCauses: [
      {
        category: 'Workflow Resistance',
        description: 'Based on CIBC experience with 15,000+ user rollout',
        items: [
          'Employees have established workflows and resist changing "how things are done"',
          'Fear that AI outputs will compromise work quality and professional standards',
          'Preference for familiar manual processes over new AI-assisted workflows',
          'Concern about accountability when using AI-generated recommendations'
        ]
      },
      {
        category: 'Tool Perception & Quality Concerns',
        description: 'Common enterprise AI adoption barriers',
        items: [
          'Internal AI tools perceived as inferior to external options (ChatGPT, Claude)',
          'Hallucination concerns: "AI always makes mistakes and unreliable responses"',
          'Quality directly correlates with user skill - poor results blamed on tool, not technique',
          'Lack of understanding that AI is a productivity multiplier, not replacement'
        ]
      },
      {
        category: 'Training & Change Management Gaps',
        description: 'Critical success factors from enterprise rollouts',
        items: [
          'Voluntary training has low completion rates - mandatory training drives adoption',
          'Insufficient hands-on practice with real work scenarios during training',
          'No clear escalation path when users encounter tool limitations',
          '"Thank me later" approach: Initial resistance transforms into appreciation with proper onboarding'
        ]
      },
      {
        category: 'KPMG Tax-Specific Challenges',
        description: 'Additional considerations for professional services',
        items: [
          'Client-facing work requires higher confidence in AI accuracy than internal processes',
          'Tax regulations change frequently - concerns about AI training data currency',
          'Billable hour model creates pressure to maintain traditional efficiency metrics',
          'Professional liability considerations when AI assists in client deliverables'
        ]
      }
    ]
  },
  {
    id: 'strategy',
    title: 'Rollout Strategy',
    icon: <Target className="w-6 h-6" />,
    description: 'Phased approach to organizational adoption',
    phases: [
      {
        id: 'phase1',
        title: 'Phase 1: Champion Network (30 days)',
        description: 'Identify and onboard 8-10 AI champions across tax specialties',
        details: [
          {
            category: 'Champion Selection Process',
            items: [
              'Performance analytics: Analyze pilot group engagement rates and results',
              'Peer nominations: Survey "Who do you go to for help with new processes?"',
              'Manager recommendations: Each department head identifies 2-3 influencers'
            ],
            messaging: {
              channels: ['Email campaigns to department heads', 'Manager 1:1 meetings', 'Anonymous peer nomination survey via SurveyMonkey/Forms'],
              materials: ['Champion criteria scorecard', 'Peer nomination survey template', 'Manager briefing deck with selection guidelines'],
              audience: 'Department heads, existing pilot users, tax professionals',
              timing: 'Week 1-2 of Phase 1'
            }
          },
          {
            category: 'Outreach Strategy',
            items: [
              'Personalized emails from Practice Lead positioning as leadership opportunity',
              'Frame as early access to advanced tools and direct input on strategy',
              'Schedule brief 15-minute conversations to gauge interest'
            ],
            messaging: {
              channels: ['Personalized emails from Practice Lead', '15-minute video calls (Teams/Zoom)', 'Follow-up text messages or Slack DMs'],
              materials: ['Email template with leadership positioning', 'AI Champion program overview PDF', 'Benefits & recognition one-pager'],
              audience: 'Selected champion candidates',
              timing: 'Week 2-3 of Phase 1, after selection process'
            }
          },
          {
            category: 'Collaboration Platform',
            items: [
              'Dedicated chat channel (Slack, Microsoft Teams, or Google Chat) for real-time support',
              'Centralized resource library (SharePoint, OneDrive, or Google Drive) with training materials and FAQs',
              'Weekly office hours with AI team for technical escalation via existing video platform',
              'Monthly video calls for strategy alignment and feedback using standard meeting tools'
            ],
            messaging: {
              channels: ['Chat platform invitations', 'SharePoint/Drive access notifications', 'Calendar invites for office hours'],
              materials: ['Platform setup guide', 'Resource library navigation tutorial', 'Office hours agenda template'],
              audience: 'Confirmed AI champions',
              timing: 'Week 3 of Phase 1, immediately after champion confirmation'
            }
          },
          {
            category: 'Time Investment & Recognition',
            items: [
              'Week 1: 3-hour intensive training session (recorded for reference)',
              'Weeks 2-4: 1 hour weekly check-ins via Slack and video calls',
              'Ongoing: 30 minutes weekly mentoring 2-3 colleagues',
              '"AI Champion" designation on LinkedIn and internal directory'
            ],
            messaging: {
              channels: ['Training session invitations', 'LinkedIn announcement posts', 'Internal newsletter features', 'Manager notifications'],
              materials: ['Training session agenda', 'LinkedIn post template', 'Recognition certificate template', 'Champion badge graphics'],
              audience: 'AI champions, their managers, broader tax organization',
              timing: 'Week 4 of Phase 1, after initial training completion'
            }
          }
        ]
      },
      {
        id: 'phase2',
        title: 'Phase 2: Department Pilots (60 days)',
        description: 'Each champion leads 3-4 person pilot in their specialty area',
        details: [
          {
            category: 'Pilot Team Formation',
            items: [
              'Champions select 3-4 colleagues from their department based on workload and interest',
              'Target different tax specialties: Corporate, Individual, International, State & Local',
              'Mix of experience levels: 1-2 senior staff, 1-2 junior professionals per pilot',
              'Formal pilot agreement outlining expectations and time commitment'
            ]
          },
          {
            category: 'Pilot Execution Framework',
            items: [
              'Week 1-2: Intensive training sessions led by champions with AI team support',
              'Week 3-6: Daily AI tool usage with structured feedback collection',
              'Week 7-8: Documentation of use cases, challenges, and efficiency gains',
              'Weekly 30-minute team check-ins to share learnings and troubleshoot issues'
            ]
          },
          {
            category: 'Success Metrics & Tracking',
            items: [
              'Tool usage frequency: Target 80% of eligible contracts processed with AI assistance',
              'Time savings measurement: Before/after comparison for similar contract types',
              'Quality assurance: Error rate tracking and client satisfaction scores',
              'User satisfaction surveys: Weekly pulse checks and end-of-pilot comprehensive review'
            ]
          },
          {
            category: 'Support Infrastructure',
            items: [
              'Dedicated technical support channel with 4-hour response time SLA',
              'Champion office hours: 2 hours weekly for peer mentoring and escalation',
              'AI team availability for complex technical issues and feature requests',
              'Regular feedback sessions with product team for tool improvements'
            ]
          }
        ]
      },
      {
        id: 'phase3',
        title: 'Phase 3: Full Scale Deployment (90 days)',
        description: 'Roll out to broader organization with refined approach',
        details: [
          {
            category: 'Rollout Strategy & Sequencing',
            items: [
              'Phased deployment by department: Start with highest pilot success rates first',
              'Cohort-based approach: 20-25 users per cohort with 2-week intervals between cohorts',
              'Geographic considerations: Prioritize largest offices first, then regional rollout',
              'Risk mitigation: Maintain 20% of users on legacy process during initial 30 days'
            ]
          },
          {
            category: 'Training & Onboarding Program',
            items: [
              'Refined training curriculum based on pilot feedback and common pain points',
              'Multi-modal delivery: Live sessions, recorded tutorials, hands-on workshops',
              'Peer mentoring assignments: Each new user paired with pilot program graduate',
              'Just-in-time support: Quick reference guides and embedded help within AI tool'
            ]
          },
          {
            category: 'Change Management & Communication',
            items: [
              'Success story campaign: Video testimonials and case studies from pilot participants',
              'Executive endorsement: Senior partners share their AI adoption experiences',
              'Regular communication cadence: Bi-weekly updates on rollout progress and wins',
              'Feedback channels: Anonymous suggestion box and monthly town halls'
            ]
          },
          {
            category: 'Engagement & Innovation Programs',
            items: [
              'AI Hackathons: Safe environment mini-competitions for creative AI use case development',
              'Recognition system: Winners get executive visibility and potential tool feature implementation',
              'Developer Days: Full-day collaborative sessions with vendor partners and AI team',
              'Cross-department collaboration: Mixed teams from different tax specialties working together',
              'Ownership creation: Participants help shape AI tool roadmap and get credited for contributions'
            ]
          },
          {
            category: 'Quality Assurance & Monitoring',
            items: [
              'Real-time usage dashboards for managers to track team adoption progress',
              'Quality checkpoints: Random sample review of AI-assisted work for accuracy',
              'Performance benchmarking: Compare efficiency metrics across departments',
              'Continuous improvement process: Monthly review cycles with feature updates'
            ]
          },
          {
            category: 'Support Infrastructure Scaling',
            items: [
              'Tiered support model: Level 1 (peer mentors), Level 2 (champions), Level 3 (AI team)',
              'Self-service resources: Expanded knowledge base and FAQ based on pilot learnings',
              'Office hours expansion: Daily drop-in sessions during peak rollout periods',
              'Escalation protocols: Clear pathways for technical issues and process concerns'
            ]
          },
          {
            category: 'Objection Handling & Risk Mitigation',
            items: [
              'Billable Hours: Position hackathons as efficiency investment - 1 day could save 40+ hours team-wide',
              'ROI Measurement: Track participation rates, idea implementation, and subsequent adoption increases',
              'Participation Inequality: Mixed skill teams, business focus over technical, separate comfort-level tracks',
              'Client Confidentiality: Anonymized datasets and sandbox environments for safe experimentation',
              'Technical Intimidation: Frame as "Use Case Discovery" focusing on tax expertise, not coding skills',
              'Implementation Follow-through: Built-in development pathway with winner resource allocation and beta testing'
            ]
          },
          {
            category: 'Support Structures & Training Programs',
            description: 'Comprehensive learning and support ecosystem for sustainable AI adoption',
            details: [
              {
                subcategory: 'Learning Management System Implementation',
                platforms: [
                  {
                    platform: 'KPMG Clara Learning Platform',
                    implementation: [
                      'Custom AI training modules integrated with existing Clara learning paths',
                      'Progress tracking dashboards for managers to monitor team completion rates',
                      'Competency assessments with certification badges for AI proficiency levels',
                      'Mobile app compatibility for on-the-go learning during client travel',
                      'Integration with HR systems for performance review and promotion criteria'
                    ],
                    messaging: {
                      channels: ['Clara platform notifications', 'Manager dashboard alerts', 'Email learning reminders'],
                      materials: ['Learning path curriculum guide', 'Certification requirements document', 'Mobile app tutorial'],
                      audience: 'All tax professionals, their managers, HR coordinators',
                      timing: 'Phase 2, parallel with pilot expansion'
                    }
                  },
                  {
                    platform: 'Microsoft Viva Learning Integration',
                    implementation: [
                      'AI training content embedded in daily workflow through Teams integration',
                      'Microlearning modules: 5-minute daily AI tips delivered during work hours',
                      'Social learning features: peer recommendations and discussion forums',
                      'LinkedIn Learning AI courses curated specifically for tax professionals',
                      'Manager insights dashboard showing team learning engagement and skill gaps'
                    ],
                    messaging: {
                      channels: ['Teams notifications', 'Viva Learning announcements', 'LinkedIn course invitations'],
                      materials: ['Microlearning content library', 'Peer discussion facilitator guides', 'Manager engagement reports'],
                      audience: 'Daily users, peer learning groups, team managers',
                      timing: 'Phase 3, during full-scale deployment'
                    }
                  }
                ]
              },
              {
                subcategory: 'Technical Support Infrastructure',
                platforms: [
                  {
                    platform: 'ServiceNow IT Service Management',
                    implementation: [
                      'Dedicated AI support category with specialized routing to trained technicians',
                      'Self-service knowledge base with searchable AI troubleshooting articles',
                      'Video tutorial library integrated with ticket resolution for visual learners',
                      'Escalation workflows: Level 1 (help desk) → Level 2 (champions) → Level 3 (AI team)',
                      'SLA tracking: 4-hour response time for AI-related issues with priority queuing'
                    ],
                    messaging: {
                      channels: ['ServiceNow portal', 'Help desk chat integration', 'Email ticket notifications'],
                      materials: ['Knowledge base article templates', 'Video tutorial scripts', 'SLA communication framework'],
                      audience: 'All AI tool users, help desk staff, technical support teams',
                      timing: 'Phase 1, established before champion training begins'
                    }
                  },
                  {
                    platform: 'Zendesk Customer Support Platform',
                    implementation: [
                      'AI-specific help center with categorized articles and video walkthroughs',
                      'Community forum where users can ask questions and share solutions',
                      'Live chat widget embedded in AI tool interface for real-time assistance',
                      'Satisfaction surveys after each support interaction to improve service quality',
                      'Analytics dashboard tracking common issues and resolution times'
                    ],
                    messaging: {
                      channels: ['In-app chat notifications', 'Community forum posts', 'Email follow-up surveys'],
                      materials: ['Help center content strategy', 'Community moderation guidelines', 'Chat response templates'],
                      audience: 'AI tool users, community moderators, support analysts',
                      timing: 'Phase 2-3, scaling with user adoption'
                    }
                  }
                ]
              },
              {
                subcategory: 'Peer Mentoring & Champion Networks',
                platforms: [
                  {
                    platform: 'Slack/Teams Champion Community',
                    implementation: [
                      'Private channels for champions to collaborate and share best practices',
                      'Weekly "Champion Spotlight" featuring success stories and innovative use cases',
                      'Office hours scheduling bot for users to book time with nearest champion',
                      'Resource sharing library with champion-created templates and guides',
                      'Gamification elements: recognition badges for helpful champions and active mentees'
                    ],
                    messaging: {
                      channels: ['Champion community invitations', 'Weekly spotlight announcements', 'Office hours booking confirmations'],
                      materials: ['Champion community guidelines', 'Spotlight story templates', 'Mentoring session agendas'],
                      audience: 'AI champions, mentees seeking support, community managers',
                      timing: 'Phase 1, concurrent with champion selection and training'
                    }
                  },
                  {
                    platform: 'Microsoft Yammer Enterprise Social Network',
                    implementation: [
                      'AI CoE (Center of Excellence) group for cross-departmental knowledge sharing',
                      'Monthly "AI Innovation Showcase" where teams present creative use cases',
                      'Q&A threads with subject matter experts answering complex technical questions',
                      '"Lunch and Learn" event coordination with automated calendar integration',
                      'Document collaboration spaces for co-creating training materials and best practices'
                    ],
                    messaging: {
                      channels: ['Yammer group notifications', 'Innovation showcase invitations', 'Event calendar updates'],
                      materials: ['CoE group charter', 'Innovation showcase presentation templates', 'Q&A moderation guidelines'],
                      audience: 'Cross-functional teams, innovation enthusiasts, SMEs and executives',
                      timing: 'Phase 3-4, focusing on cultural transformation'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'phase4',
        title: 'Phase 4: Optimization & Expansion (120+ days)',
        description: 'Measure, iterate, and scale to additional AI tools',
        details: [
          {
            category: 'Performance Analytics & Optimization',
            details: [
              {
                subcategory: 'Comprehensive Usage Analytics',
                implementation: [
                  'Platforms: Power BI dashboards, Tableau analytics, or custom API integration with existing KPMG reporting tools',
                  'Tracking frequency: Real-time data collection with daily automated reports and weekly executive summaries',
                  'Data sources: AI tool logs, user session recordings, task completion timestamps, error rates',
                  'Responsibility: AI team data analyst with monthly reviews by Practice Lead and Technology Head',
                  'Metrics tracked: Sessions per user, time per task, feature adoption rates, department usage patterns'
                ]
              },
              {
                subcategory: 'Efficiency Measurement Framework',
                implementation: [
                  'Baseline establishment: 2-week pre-AI measurement of contract review times by complexity and user experience',
                  'Comparison methodology: Before/after analysis using same contract types with statistical significance testing',
                  'Data collection: Time tracking integration with existing project management tools (Workday, ServiceNow)',
                  'Proficiency correlation: Cross-reference efficiency gains with training completion and usage frequency',
                  'Reporting cadence: Weekly efficiency reports to managers, monthly trend analysis to leadership'
                ]
              },
              {
                subcategory: 'Quality Assessment Protocol',
                implementation: [
                  'Audit sampling: 10% random sample of AI-assisted work reviewed by senior tax professionals monthly',
                  'Quality metrics: Accuracy scores, client feedback ratings, revision frequency, error categorization',
                  'Review process: Blind quality checks comparing AI-assisted vs. traditional work quality',
                  'Client satisfaction tracking: Integration with existing client feedback systems and NPS surveys',
                  'Escalation procedures: Quality issues flagged immediately to AI team and champion network'
                ]
              },
              {
                subcategory: 'User Behavior Analysis',
                implementation: [
                  'Segmentation criteria: Usage frequency, feature adoption, efficiency gains, support ticket volume',
                  'Power user identification: Top 20% users by efficiency gains and feature utilization',
                  'Reluctant adopter targeting: Bottom 30% users with personalized intervention plans',
                  'Behavioral tracking tools: Heatmap analysis, user journey mapping, session replay technology',
                  'Intervention protocols: Personalized training, peer mentoring assignments, manager check-ins'
                ]
              },
              {
                subcategory: 'Feature Utilization Mapping',
                implementation: [
                  'Feature tracking: Individual AI capability usage (document analysis, summarization, Q&A, etc.)',
                  'Value correlation: Map feature usage to efficiency gains and user satisfaction scores',
                  'Usage patterns: Identify feature combinations that drive highest productivity improvements',
                  'ROI analysis: Calculate cost-benefit ratio for each AI capability to prioritize development',
                  'Development prioritization: Use utilization data to guide product roadmap and resource allocation'
                ]
              }
            ]
          },
          {
            category: 'Iterative Improvement Framework',
            items: [
              'Monthly optimization cycles: Review metrics, identify bottlenecks, implement improvements',
              'User feedback integration: Prioritize feature requests based on adoption impact and feasibility',
              'Training refinement: Update curriculum based on common user errors and success patterns',
              'Process optimization: Streamline workflows where AI integration creates friction',
              'Performance benchmarking: Compare results against initial baseline and industry standards'
            ]
          },
          {
            category: 'Technology Expansion Strategy',
            items: [
              'AI tool portfolio assessment: Evaluate additional tools for different tax functions (research, compliance, planning)',
              'Integration opportunities: Connect AI contract tool with existing tax software and databases',
              'Advanced capabilities rollout: Natural language querying, predictive analytics, automated reporting',
              'Vendor partnership expansion: Assess new AI providers and emerging technologies',
              'Custom development roadmap: Build KPMG-specific AI features based on unique tax expertise'
            ]
          },
          {
            category: 'Organizational Scaling & Culture',
            items: [
              'Center of Excellence establishment: Dedicated AI team to drive continuous innovation',
              'Best practice documentation: Codify successful implementation patterns for other service lines',
              'Knowledge sharing program: Cross-pollinate learnings between Tax, Audit, and Advisory',
              'Leadership development: Train managers to effectively lead AI-augmented teams',
              'Cultural transformation: Embed AI-first thinking into standard operating procedures'
            ]
          },
          {
            category: 'Business Impact & ROI Demonstration',
            items: [
              'Financial impact quantification: Calculate actual cost savings, revenue opportunities, and efficiency gains',
              'Client value proposition enhancement: Demonstrate improved service quality and faster turnaround times',
              'Competitive advantage assessment: Benchmark KPMG AI capabilities against Big 4 competitors',
              'Case study development: Document success stories for client presentations and thought leadership',
              'Investment justification: Build business case for continued AI expansion across firm'
            ]
          },
          {
            category: 'Risk Management & Governance',
            items: [
              'AI governance framework: Establish policies for responsible AI use in client-facing work',
              'Quality assurance protocols: Implement systematic review processes for AI-assisted deliverables',
              'Regulatory compliance monitoring: Ensure AI usage meets tax profession standards and client requirements',
              'Data security enhancement: Strengthen privacy and confidentiality measures for AI processing',
              'Contingency planning: Develop backup processes for AI tool failures or limitations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'engagement',
    title: 'Stakeholder Engagement',
    icon: <Users className="w-6 h-6" />,
    description: 'Building buy-in across all levels',
    strategies: [
      {
        category: 'AI-Skeptical Leader Engagement',
        description: 'Converting uncertainty into advocacy through evidence and education',
        tactics: [
          {
            subcategory: 'Success Story Demonstration',
            approaches: [
              'KPMG internal pilot results: 40% efficiency gains in contract review with concrete time savings',
              'Big 4 competitor case studies: Deloitte AI tax compliance, PwC document automation successes',
              'Industry leader testimonials: CFOs from Fortune 500 companies discussing AI ROI',
              'Video testimonials from respected tax partners who initially resisted but now advocate for AI',
              'Live demo sessions showing before/after contract analysis with real anonymized examples'
            ],
            messaging: {
              channels: ['Executive briefing sessions', 'Partner retreat presentations', 'One-on-one leadership meetings'],
              materials: ['Success story compilation deck', 'ROI calculator tool', 'Video testimonial library'],
              audience: 'Senior partners, practice leads, skeptical managers',
              timing: 'Phase 2-3, after initial pilot data collection'
            }
          },
          {
            subcategory: 'Thought Leader Authority Building',
            approaches: [
              'Share insights from AI thought leaders: Andrew Ng, Satya Nadella, Jensen Huang on enterprise AI',
              'Industry reports from McKinsey, BCG, Deloitte on AI adoption in professional services',
              'Invite external AI experts for "lunch & learn" sessions with skeptical leadership',
              'Position KPMG as AI innovation leader through thought leadership publications',
              'Showcase client demands for AI-powered tax services as competitive necessity'
            ],
            messaging: {
              channels: ['Lunch & learn sessions', 'Industry conference presentations', 'Internal thought leadership emails'],
              materials: ['Thought leader quote compilation', 'Industry research summaries', 'Competitive analysis deck'],
              audience: 'C-suite executives, senior partners, client-facing leaders',
              timing: 'Ongoing throughout all phases, quarterly thought leadership updates'
            }
          },
          {
            subcategory: 'Risk Mitigation & Control Emphasis',
            approaches: [
              'Emphasize AI as risk reduction tool: improved accuracy, consistency, compliance tracking',
              'Quality control demonstrations: show how AI reduces human error in tax calculations',
              'Professional liability protection: AI provides audit trails and decision documentation',
              'Gradual implementation approach: start with low-risk tasks, build confidence incrementally',
              'Human oversight protocols: AI augments professionals, never replaces judgment'
            ],
            messaging: {
              channels: ['Risk committee presentations', 'Quality assurance briefings', 'Compliance team meetings'],
              materials: ['Risk mitigation framework', 'Quality improvement metrics', 'Professional liability analysis'],
              audience: 'Risk management leaders, quality assurance heads, compliance officers',
              timing: 'Phase 1-2, before broader rollout begins'
            }
          }
        ]
      },
      {
        category: 'Executive Sponsor Development',
        description: 'Creating AI evangelists from senior leadership',
        tactics: [
          {
            subcategory: 'Champion Identification & Development',
            approaches: [
              'Identify early adopter executives who show curiosity about technology trends',
              'Provide exclusive access to AI insights and competitive intelligence reports',
              'Create "AI Advisory Board" with rotating executive sponsorship opportunities',
              'Offer speaking opportunities at industry conferences to build thought leadership',
              'Connect executives with peer leaders from other firms who successfully adopted AI'
            ],
            messaging: {
              channels: ['Executive committee meetings', 'Board presentations', 'Industry networking events'],
              materials: ['Executive AI briefing book', 'Competitive intelligence reports', 'Speaking opportunity briefs'],
              audience: 'C-suite, senior partners, practice leaders',
              timing: 'Phase 1, establish foundation before rollout'
            }
          }
        ]
      },
      {
        category: 'Hands-on Experience Programs',
        description: 'Converting skepticism through direct interaction',
        tactics: [
          {
            subcategory: 'Executive AI Workshops',
            approaches: [
              'Interactive workshops where leaders use AI tools on real tax scenarios',
              'Sandbox environment for safe experimentation without client data exposure',
              'Peer learning sessions where early adopters teach skeptical colleagues',
              'Failure analysis: show common AI limitations and how humans add value',
              'Success replication: demonstrate how to achieve consistent positive results'
            ],
            messaging: {
              channels: ['Workshop invitations', 'Interactive training sessions', 'Peer mentoring programs'],
              materials: ['Workshop agenda and materials', 'Sandbox access guides', 'Peer mentoring handbooks'],
              audience: 'Middle management, department heads, team leaders',
              timing: 'Phase 2-3, during pilot expansion'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'metrics',
    title: 'Success Metrics',
    icon: <BarChart3 className="w-6 h-6" />,
    description: 'Measuring impact and ROI',
    categories: [
      {
        category: 'Adoption & Usage Metrics',
        description: 'Tracking user engagement and tool utilization across the organization',
        metrics: [
          {
            subcategory: 'User Adoption Rate Tracking',
            kpis: [
              {
                kpi: 'Active User Adoption Rate',
                target: '75% of tax professionals actively using AI tools by Q2',
                platforms: [
                  {
                    platform: 'Power BI Analytics Dashboard',
                    implementation: [
                      'Real-time connection to AI tool user logs via REST API integration',
                      'Daily active user (DAU) and monthly active user (MAU) calculations',
                      'Department-wise adoption heatmaps with color-coded progress indicators',
                      'Individual user activity scorecards with engagement frequency metrics',
                      'Automated alerts when adoption rates fall below 70% threshold'
                    ],
                    messaging: {
                      channels: ['Power BI dashboard notifications', 'Email alerts to managers', 'Executive summary reports'],
                      materials: ['Dashboard user guide', 'Adoption rate interpretation handbook', 'Manager action plan templates'],
                      audience: 'Department heads, HR coordinators, executive leadership',
                      timing: 'Daily monitoring with weekly management reports'
                    }
                  },
                  {
                    platform: 'Google Analytics 4 (GA4)',
                    implementation: [
                      'Custom events tracking for AI tool interactions within web applications',
                      'User journey mapping from first login to regular usage patterns',
                      'Cohort analysis to identify user retention and churn patterns',
                      'Attribution modeling to understand which training methods drive adoption',
                      'Cross-platform tracking for desktop and mobile AI tool usage'
                    ],
                    messaging: {
                      channels: ['GA4 automated reports', 'Slack analytics bot notifications', 'Monthly analytics briefings'],
                      materials: ['GA4 setup documentation', 'Custom event tracking guide', 'Cohort analysis templates'],
                      audience: 'AI team analysts, product managers, user experience researchers',
                      timing: 'Continuous tracking with monthly analysis cycles'
                    }
                  }
                ]
              },
              {
                kpi: 'Feature Utilization Rate',
                target: '80% of users utilizing core AI features (document analysis, summarization) weekly',
                platforms: [
                  {
                    platform: 'Mixpanel Product Analytics',
                    implementation: [
                      'Event-based tracking for each AI feature interaction with timestamp and user context',
                      'Funnel analysis showing progression from basic to advanced feature usage',
                      'Feature adoption curves comparing different user segments and departments',
                      'A/B testing framework for UI improvements and feature introductions',
                      'Behavioral segmentation identifying power users vs. casual users'
                    ],
                    messaging: {
                      channels: ['Mixpanel insight notifications', 'Product team Slack updates', 'Feature usage reports'],
                      materials: ['Feature tracking implementation guide', 'Funnel analysis templates', 'A/B testing protocols'],
                      audience: 'Product development team, UX designers, feature owners',
                      timing: 'Real-time tracking with weekly feature performance reviews'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        category: 'Efficiency & Productivity Metrics',
        description: 'Quantifying time savings and productivity improvements from AI adoption',
        metrics: [
          {
            subcategory: 'Time Savings Measurement',
            kpis: [
              {
                kpi: 'Contract Review Time Reduction',
                target: '50% reduction in average contract review time within 6 months',
                platforms: [
                  {
                    platform: 'Toggl Track API Integration',
                    implementation: [
                      'Automated time tracking integration with AI tool workflow initiation and completion',
                      'Before/after comparison analysis using historical project data from Workday',
                      'Task complexity weighting system accounting for document length and complexity',
                      'Statistical significance testing to ensure valid time saving measurements',
                      'Productivity benchmarking against industry standards and competitor performance'
                    ],
                    messaging: {
                      channels: ['Toggl dashboard reports', 'Manager productivity briefings', 'Client billing system updates'],
                      materials: ['Time tracking setup guide', 'Productivity calculation methodology', 'Benchmarking report templates'],
                      audience: 'Project managers, billing coordinators, client service teams',
                      timing: 'Continuous tracking with monthly productivity assessments'
                    }
                  },
                  {
                    platform: 'Microsoft Project & Power Automate',
                    implementation: [
                      'Workflow automation triggering time capture when AI tools are activated',
                      'Integration with Outlook calendar to correlate meeting time vs. independent work time',
                      'Resource allocation optimization based on AI-enhanced productivity metrics',
                      'Predictive analytics for project timeline estimation using AI efficiency data',
                      'Client billing accuracy improvements through precise time attribution'
                    ],
                    messaging: {
                      channels: ['Project dashboard notifications', 'Automated workflow alerts', 'Resource planning meetings'],
                      materials: ['Workflow automation playbook', 'Resource optimization guides', 'Billing integration documentation'],
                      audience: 'Project coordinators, resource planners, finance teams',
                      timing: 'Real-time workflow tracking with weekly resource optimization reviews'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        category: 'Quality & Accuracy Metrics',
        description: 'Ensuring AI-assisted work maintains and improves professional standards',
        metrics: [
          {
            subcategory: 'Work Quality Assessment',
            kpis: [
              {
                kpi: 'Error Rate Reduction',
                target: '30% reduction in contract analysis errors compared to manual review',
                platforms: [
                  {
                    platform: 'Salesforce Quality Management',
                    implementation: [
                      'Quality control workflow tracking errors in AI-assisted vs. manual work',
                      'Blind review process where senior professionals assess work without knowing AI involvement',
                      'Error categorization system distinguishing AI-related vs. human errors',
                      'Client feedback integration linking quality scores to AI tool usage',
                      'Continuous improvement loop feeding error patterns back to AI training'
                    ],
                    messaging: {
                      channels: ['Quality dashboard alerts', 'Senior reviewer notifications', 'Client satisfaction surveys'],
                      materials: ['Quality assessment rubrics', 'Error classification guides', 'Reviewer training materials'],
                      audience: 'Quality assurance teams, senior reviewers, client service managers',
                      timing: 'Weekly quality audits with monthly trend analysis'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        category: 'Business Impact & ROI Metrics',
        description: 'Demonstrating financial and strategic value of AI investment',
        metrics: [
          {
            subcategory: 'Financial Impact Measurement',
            kpis: [
              {
                kpi: 'Revenue Per Employee Increase',
                target: '15% increase in billable efficiency through AI-enhanced productivity',
                platforms: [
                  {
                    platform: 'Tableau Financial Analytics',
                    implementation: [
                      'Integration with ERP systems to correlate AI usage with billing and revenue data',
                      'Cost-benefit analysis comparing AI tool investment against productivity gains',
                      'Client retention correlation analysis examining AI service quality impact',
                      'Competitive advantage quantification through faster service delivery',
                      'Investment ROI calculation including training costs, tool licensing, and support overhead'
                    ],
                    messaging: {
                      channels: ['Executive financial dashboards', 'Board presentation materials', 'Client value proposition updates'],
                      materials: ['ROI calculation methodologies', 'Financial impact report templates', 'Investment justification frameworks'],
                      audience: 'C-suite executives, board members, finance leadership',
                      timing: 'Quarterly financial impact assessments with annual ROI reviews'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        category: 'User Satisfaction & Engagement Metrics',
        description: 'Measuring employee experience and long-term adoption sustainability',
        metrics: [
          {
            subcategory: 'Employee Satisfaction Tracking',
            kpis: [
              {
                kpi: 'AI Tool Satisfaction Score',
                target: 'Net Promoter Score (NPS) of 70+ for AI tools among tax professionals',
                platforms: [
                  {
                    platform: 'Qualtrics Experience Management',
                    implementation: [
                      'Quarterly NPS surveys with detailed feedback collection on AI tool experience',
                      'Sentiment analysis on free-text feedback identifying common pain points and successes',
                      'Longitudinal studies tracking satisfaction changes as users gain experience',
                      'Comparative analysis between departments and user skill levels',
                      'Action plan generation from survey insights with automatic follow-up tracking'
                    ],
                    messaging: {
                      channels: ['Survey invitation emails', 'Qualtrics dashboard reports', 'Manager feedback briefings'],
                      materials: ['Survey design templates', 'Sentiment analysis guides', 'Action plan frameworks'],
                      audience: 'HR teams, department managers, employee experience coordinators',
                      timing: 'Quarterly comprehensive surveys with monthly pulse checks'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

// Main app component (existing content)
function MainApp() {
  const [activeTab, setActiveTab] = useState('assignment')
  const [progress, setProgress] = useState(20)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const tabIndex = strategySteps.findIndex(step => step.id === value)
    setProgress((tabIndex + 1) * 20)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                AI Adoption Strategy
              </h1>
              <p className="text-blue-200">
                Scaling AI across KPMG Tax Functions
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200 mb-1">Presented by</div>
              <div className="text-xl font-semibold text-white">Robert Mill</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Strategy Overview</h2>
            <span className="text-blue-200 text-sm">{progress}% Complete</span>
          </div>
          <Progress.Root
            className="relative overflow-hidden bg-white/10 rounded-full w-full h-2"
            value={progress}
          >
            <Progress.Indicator
              className="bg-gradient-to-r from-blue-400 to-blue-600 w-full h-full transition-transform duration-700 ease-out rounded-full"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </motion.div>

        {/* Strategy Tabs */}
        <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
          <Tabs.List className="grid grid-cols-5 gap-2 mb-8">
            {strategySteps.map((step, index) => (
              <Tabs.Trigger
                key={step.id}
                value={step.id}
                className={`p-4 rounded-lg border border-white/20 transition-all duration-300 ${
                  activeTab === step.id
                    ? 'bg-white/20 border-blue-400'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-center">
                  <div className={`mx-auto mb-2 ${
                    activeTab === step.id ? 'text-blue-400' : 'text-white/60'
                  }`}>
                    {step.icon}
                  </div>
                  <div className={`text-sm font-medium ${
                    activeTab === step.id ? 'text-white' : 'text-white/70'
                  }`}>
                    {step.title}
                  </div>
                </div>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {strategySteps.map((step) => (
            <Tabs.Content key={step.id} value={step.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="text-blue-400 mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-blue-200">
                      {step.description}
                    </p>
                  </div>
                </div>

                {step.id === 'assignment' ? (
                  /* Assignment Content */
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-600/20 rounded-lg border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">Robert Mill - Role & Context</h4>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {step.content?.role}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">Scenario</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {step.content?.scenario}
                        </p>
                      </div>

                      <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">Challenge</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {step.content?.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">Audience</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {step.content?.audience}
                        </p>
                      </div>

                      <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">Format</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {step.content?.timeframe}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Topics to Address</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {step.content?.keyTopics?.map((topic, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <CheckCircle className="w-4 h-4 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-white/90 text-sm leading-relaxed">
                              {topic}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : step.id === 'strategy' ? (
                  /* Strategy Content with Nested Accordions */
                  <div className="space-y-4">
                    <Accordion.Root type="multiple" className="space-y-3">
                      {step.phases?.map((phase, phaseIndex) => (
                        <Accordion.Item key={phase.id} value={phase.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                          <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-1">{phase.title}</h4>
                              <p className="text-blue-200 text-sm">{phase.description}</p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="p-4 pt-0">
                              <Accordion.Root type="multiple" className="space-y-2">
                                {phase.details.map((detail, detailIndex) => (
                                  <Accordion.Item key={detailIndex} value={`${phase.id}-${detailIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                    <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                                      <h5 className="text-md font-medium text-white">{detail.category}</h5>
                                      <ChevronDown className="w-4 h-4 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                      <div className="p-3 pt-0 space-y-2">
                                                                {(detail as any).details ? (
                          /* Triple/Quad-nested accordion for Phase 4 analytics and Phase 3 support structures */
                          <Accordion.Root type="multiple" className="space-y-2">
                            {(detail as any).details.map((subDetail: any, subIndex: number) => (
                                              <Accordion.Item key={subIndex} value={`${phase.id}-${detailIndex}-${subIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                                <Accordion.Trigger className="flex items-center justify-between w-full p-2 text-left hover:bg-white/5 transition-colors group">
                                                  <h6 className="text-sm font-medium text-white">{subDetail.subcategory}</h6>
                                                  <ChevronDown className="w-3 h-3 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                                </Accordion.Trigger>
                                                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                                  <div className="p-2 pt-0 space-y-1">
                                                    {subDetail.platforms ? (
                                                      /* Quad-nested for support structures with platforms */
                                                      <Accordion.Root type="multiple" className="space-y-1">
                                                        {subDetail.platforms.map((platform: any, platformIndex: number) => (
                                                          <Accordion.Item key={platformIndex} value={`${phase.id}-${detailIndex}-${subIndex}-${platformIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                                            <Accordion.Trigger className="flex items-center justify-between w-full p-2 text-left hover:bg-white/5 transition-colors group">
                                                              <h6 className="text-xs font-medium text-white">{platform.platform}</h6>
                                                              <ChevronDown className="w-3 h-3 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                                            </Accordion.Trigger>
                                                            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                                              <div className="p-2 pt-0 space-y-1">
                                                                {platform.implementation.map((impl: string, implIndex: number) => (
                                                                  <motion.div
                                                                    key={implIndex}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: implIndex * 0.05 }}
                                                                    className="flex items-start"
                                                                  >
                                                                    <CheckCircle className="w-2 h-2 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                                                                    <span className="text-white/90 text-xs leading-relaxed">
                                                                      {impl}
                                                                    </span>
                                                                  </motion.div>
                                                                ))}
                                                                
                                                                {/* Platform messaging section */}
                                                                {platform.messaging && (
                                                                  <motion.div
                                                                    initial={{ opacity: 0, y: 5 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: 0.2 }}
                                                                    className="mt-2 p-2 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 rounded-lg border border-cyan-500/30"
                                                                  >
                                                                    <h6 className="text-xs font-semibold text-white mb-1 flex items-center">
                                                                      <MessageSquare className="w-3 h-3 mr-1 text-cyan-400" />
                                                                      Platform Communication
                                                                    </h6>
                                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                                      <div>
                                                                        <span className="text-cyan-300 font-medium">Channels:</span>
                                                                        <div className="text-white/80 text-xs">
                                                                          {platform.messaging.channels.slice(0, 2).map((channel: string, idx: number) => (
                                                                            <div key={idx}>• {channel}</div>
                                                                          ))}
                                                                        </div>
                                                                      </div>
                                                                      <div>
                                                                        <span className="text-cyan-300 font-medium">Materials:</span>
                                                                        <div className="text-white/80 text-xs">
                                                                          {platform.messaging.materials.slice(0, 2).map((material: string, idx: number) => (
                                                                            <div key={idx}>• {material}</div>
                                                                          ))}
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </motion.div>
                                                                )}
                                                              </div>
                                                            </Accordion.Content>
                                                          </Accordion.Item>
                                                        ))}
                                                      </Accordion.Root>
                                                    ) : (
                                                      /* Triple-nested for Phase 4 analytics */
                                                      subDetail.implementation?.map((implementation: string, implIndex: number) => (
                                                        <motion.div
                                                          key={implIndex}
                                                          initial={{ opacity: 0, x: -20 }}
                                                          animate={{ opacity: 1, x: 0 }}
                                                          transition={{ delay: implIndex * 0.05 }}
                                                          className="flex items-start"
                                                        >
                                                          <CheckCircle className="w-3 h-3 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                                                          <span className="text-white/90 text-xs leading-relaxed">
                                                            {implementation}
                                                          </span>
                                                        </motion.div>
                                                      ))
                                                    )}
                                                  </div>
                                                </Accordion.Content>
                                              </Accordion.Item>
                                            ))}
                                          </Accordion.Root>
                                        ) : (
                                          /* Regular items for other phases */
                                          <>
                                            {detail.items?.map((item, itemIndex) => (
                                              <motion.div
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: itemIndex * 0.1 }}
                                                className="flex items-start"
                                              >
                                                <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-white/90 text-sm leading-relaxed">
                                                  {item}
                                                </span>
                                              </motion.div>
                                            ))}
                                            
                                            {/* Messaging section if available */}
                                            {(detail as any).messaging && (
                                              <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="mt-4 p-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30"
                                              >
                                                <h6 className="text-sm font-semibold text-white mb-2 flex items-center">
                                                  <MessageSquare className="w-4 h-4 mr-2 text-indigo-400" />
                                                  Communication Strategy
                                                </h6>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                                  <div>
                                                    <span className="text-indigo-300 font-medium">Channels:</span>
                                                    <div className="mt-1 space-y-1">
                                                      {(detail as any).messaging.channels.map((channel: string, idx: number) => (
                                                        <div key={idx} className="text-white/80">• {channel}</div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <span className="text-indigo-300 font-medium">Materials:</span>
                                                    <div className="mt-1 space-y-1">
                                                      {(detail as any).messaging.materials.map((material: string, idx: number) => (
                                                        <div key={idx} className="text-white/80">• {material}</div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <span className="text-indigo-300 font-medium">Audience:</span>
                                                    <div className="text-white/80 mt-1">{(detail as any).messaging.audience}</div>
                                                  </div>
                                                  <div>
                                                    <span className="text-indigo-300 font-medium">Timing:</span>
                                                    <div className="text-white/80 mt-1">{(detail as any).messaging.timing}</div>
                                                  </div>
                                                </div>
                                              </motion.div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </Accordion.Content>
                                  </Accordion.Item>
                                ))}
                              </Accordion.Root>
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </div>
                ) : step.id === 'diagnosis' ? (
                  /* Diagnosis Content with CIBC Experience */
                  <div className="space-y-6">
                    {/* Experience Header */}
                    <div className="p-6 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-lg border border-emerald-500/30">
                      <h4 className="text-lg font-semibold text-white mb-2">{step.experience?.title}</h4>
                      <p className="text-emerald-100 text-sm mb-4">{step.experience?.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.experience?.insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-white/90 text-sm leading-relaxed">
                              {insight}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Strategic Questions Section */}
                    <div className="p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30">
                      <h4 className="text-lg font-semibold text-white mb-4">Strategic Discovery Questions</h4>
                      <p className="text-indigo-100 text-sm mb-6">Key questions to uncover barriers and align stakeholder priorities</p>
                      
                      <Accordion.Root type="multiple" className="space-y-4">
                        {/* Question 1: Stakeholder Priorities */}
                        <Accordion.Item value="question1" className="bg-white/10 rounded-lg border border-indigo-300/20 overflow-hidden">
                          <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                            <div>
                              <h5 className="text-white font-semibold mb-1">1. Stakeholder Priorities</h5>
                              <p className="text-indigo-100 text-sm">
                                What are each of your primary success metrics for this AI rollout? What does success look like from each perspective?
                              </p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-indigo-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="p-4 pt-0 space-y-4">
                              {/* Follow-up Topics */}
                              <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                                <h6 className="text-white font-medium mb-2">Follow-up Topics</h6>
                                <ul className="text-blue-100 text-xs space-y-1">
                                  <li>• How do you personally define "successful AI adoption"?</li>
                                  <li>• What metrics will you be tracking in your monthly reports?</li>
                                  <li>• How does this align with your department's broader objectives?</li>
                                  <li>• What would make you personally look good to your leadership?</li>
                                  <li>• What are your biggest concerns if this initiative fails?</li>
                                </ul>
                              </div>
                              
                              {/* Example Positive Responses */}
                              <div className="p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                                <h6 className="text-white font-medium mb-2">Example Positive Responses</h6>
                                <div className="text-green-100 text-xs space-y-2">
                                  <div><strong>Tax Practice Lead:</strong> "50% reduction in contract review time while maintaining quality. Improved billable hour utilization."</div>
                                  <div><strong>Technology Head:</strong> "75% user adoption rate with less than 5% support ticket volume. Seamless integration with existing workflows."</div>
                                  <div><strong>Product Manager:</strong> "Daily active usage by month 3. Positive NPS scores above 70. Feature utilization across core functions."</div>
                                </div>
                              </div>
                              
                              {/* Potential Objections */}
                              <div className="p-3 bg-yellow-600/20 rounded-lg border border-yellow-500/30">
                                <h6 className="text-white font-medium mb-2">Potential Objections & Concerns</h6>
                                <div className="text-yellow-100 text-xs space-y-2">
                                  <div><strong>Quality Concerns:</strong> "I'm worried AI will introduce errors that hurt our client relationships."</div>
                                  <div><strong>ROI Skepticism:</strong> "Training costs might outweigh efficiency gains, especially if adoption is low."</div>
                                  <div><strong>Workflow Disruption:</strong> "Our teams are already stretched thin - this might slow us down initially."</div>
                                  <div><strong>Measurement Challenges:</strong> "It's hard to measure 'efficiency' in our complex, relationship-driven work."</div>
                                </div>
                              </div>
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>

                        {/* Question 2: Resource Reality */}
                        <Accordion.Item value="question2" className="bg-white/10 rounded-lg border border-indigo-300/20 overflow-hidden">
                          <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                            <div>
                              <h5 className="text-white font-semibold mb-1">2. Resource Reality</h5>
                              <p className="text-indigo-100 text-sm">
                                What level of time investment are we realistically able to ask from our tax professionals during rollout phases?
                              </p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-indigo-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="p-4 pt-0 space-y-4">
                              {/* Follow-up Topics */}
                              <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                                <h6 className="text-white font-medium mb-2">Follow-up Topics</h6>
                                <ul className="text-blue-100 text-xs space-y-1">
                                  <li>• What does "busy season" look like and how does that affect training schedules?</li>
                                  <li>• Are you willing to mandate training time, or must it be voluntary?</li>
                                  <li>• What's the realistic window for initial learning curve productivity dips?</li>
                                  <li>• How do billable hour expectations affect time available for training?</li>
                                  <li>• What support do managers need to protect training time?</li>
                                </ul>
                              </div>
                              
                              {/* Example Positive Responses */}
                              <div className="p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                                <h6 className="text-white font-medium mb-2">Example Realistic Responses</h6>
                                <div className="text-green-100 text-xs space-y-2">
                                  <div><strong>Conservative:</strong> "1-2 hours per week maximum. Must be outside busy season (Sept-April). Needs manager approval."</div>
                                  <div><strong>Moderate:</strong> "3-4 hours in first month, then 1 hour monthly. Can mandate if we see clear ROI."</div>
                                  <div><strong>Aggressive:</strong> "Full day initial training plus weekly practice time. Treat as billable professional development."</div>
                                </div>
                              </div>
                              
                              {/* Resource Constraints */}
                              <div className="p-3 bg-red-600/20 rounded-lg border border-red-500/30">
                                <h6 className="text-white font-medium mb-2">Common Resource Constraints</h6>
                                <div className="text-red-100 text-xs space-y-2">
                                  <div><strong>Billable Hour Pressure:</strong> "Non-billable training time directly impacts our revenue targets."</div>
                                  <div><strong>Client Deadlines:</strong> "Tax deadlines are non-negotiable. Training can't interfere with client deliverables."</div>
                                  <div><strong>Generational Resistance:</strong> "Senior professionals may resist spending time learning new tools."</div>
                                  <div><strong>Competing Priorities:</strong> "We have 3 other technology initiatives rolling out simultaneously."</div>
                                </div>
                              </div>
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>

                        {/* Question 3: Organizational Dynamics */}
                        <Accordion.Item value="question3" className="bg-white/10 rounded-lg border border-indigo-300/20 overflow-hidden">
                          <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                            <div>
                              <h5 className="text-white font-semibold mb-1">3. Organizational Dynamics</h5>
                              <p className="text-indigo-100 text-sm">
                                Based on previous technology implementations, what has been our biggest organizational barrier?
                              </p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-indigo-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="p-4 pt-0 space-y-4">
                              {/* Follow-up Topics */}
                              <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                                <h6 className="text-white font-medium mb-2">Follow-up Topics</h6>
                                <ul className="text-blue-100 text-xs space-y-1">
                                  <li>• Which groups typically embrace new technology vs. resist it?</li>
                                  <li>• How do partners vs. managers vs. staff respond differently?</li>
                                  <li>• What specific fears or concerns have come up in the past?</li>
                                  <li>• How does client-facing work affect willingness to adopt new tools?</li>
                                  <li>• What made previous technology rollouts successful or unsuccessful?</li>
                                </ul>
                              </div>
                              
                              {/* Historical Patterns */}
                              <div className="p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                                <h6 className="text-white font-medium mb-2">Common Organizational Patterns</h6>
                                <div className="text-purple-100 text-xs space-y-2">
                                  <div><strong>The "Proven Process" Mindset:</strong> "We've always done it this way and it works fine."</div>
                                  <div><strong>Risk Aversion:</strong> "What if the AI makes a mistake on a client deliverable?"</div>
                                  <div><strong>Authority Dynamics:</strong> "Senior staff don't want to look less knowledgeable than junior staff."</div>
                                  <div><strong>Change Fatigue:</strong> "We just finished implementing the last system - not another change."</div>
                                </div>
                              </div>
                              
                              {/* Success Factors */}
                              <div className="p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                                <h6 className="text-white font-medium mb-2">What Usually Works</h6>
                                <div className="text-green-100 text-xs space-y-2">
                                  <div><strong>Partner Sponsorship:</strong> "When senior partners visibly use and endorse the tool."</div>
                                  <div><strong>Peer Champions:</strong> "Respected colleagues sharing real success stories."</div>
                                  <div><strong>Gradual Introduction:</strong> "Start with non-critical tasks to build confidence."</div>
                                  <div><strong>Quick Wins:</strong> "Show immediate, tangible benefits in first few uses."</div>
                                </div>
                              </div>
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>
                      </Accordion.Root>
                    </div>

                    {/* Root Cause Analysis Accordion */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Root Cause Analysis</h4>
                      <Accordion.Root type="multiple" className="space-y-3">
                        {step.rootCauses?.map((cause, causeIndex) => (
                          <Accordion.Item key={causeIndex} value={`cause-${causeIndex}`} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                            <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                              <div>
                                <h5 className="text-md font-semibold text-white mb-1">{cause.category}</h5>
                                <p className="text-blue-200 text-sm">{cause.description}</p>
                              </div>
                              <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </Accordion.Trigger>
                            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                              <div className="p-4 pt-0 space-y-2">
                                {cause.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={itemIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: itemIndex * 0.1 }}
                                    className="flex items-start"
                                  >
                                    <CheckCircle className="w-4 h-4 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-white/90 text-sm leading-relaxed">
                                      {item}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </Accordion.Content>
                          </Accordion.Item>
                        ))}
                      </Accordion.Root>
                    </div>

                    {/* Key Insight */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30"
                    >
                      <div className="flex items-center mb-3">
                        <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Key Insight from CIBC Experience</h4>
                      </div>
                      <p className="text-white/90 text-sm">
                        The pilot's 40% efficiency gain at KPMG proves the technology works - identical to what we saw at CIBC. 
                        Our challenge is organizational, not technical. Success requires mandatory training, addressing hallucination 
                        concerns through user education, and the "thank me later" approach to change management.
                      </p>
                    </motion.div>
                  </div>
                ) : step.id === 'engagement' ? (
                  /* Engagement Content with Skeptical Leader Strategies */
                  <div className="space-y-4">
                    <Accordion.Root type="multiple" className="space-y-3">
                      {step.strategies?.map((strategy, strategyIndex) => (
                        <Accordion.Item key={strategyIndex} value={`strategy-${strategyIndex}`} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                          <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-1">{strategy.category}</h4>
                              <p className="text-blue-200 text-sm">{strategy.description}</p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="p-4 pt-0">
                              <Accordion.Root type="multiple" className="space-y-2">
                                {strategy.tactics.map((tactic, tacticIndex) => (
                                  <Accordion.Item key={tacticIndex} value={`strategy-${strategyIndex}-${tacticIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                    <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                                      <h5 className="text-md font-medium text-white">{tactic.subcategory}</h5>
                                      <ChevronDown className="w-4 h-4 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                      <div className="p-3 pt-0 space-y-2">
                                        {tactic.approaches.map((approach, approachIndex) => (
                                          <motion.div
                                            key={approachIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: approachIndex * 0.1 }}
                                            className="flex items-start"
                                          >
                                            <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-white/90 text-sm leading-relaxed">
                                              {approach}
                                            </span>
                                          </motion.div>
                                        ))}
                                        
                                        {/* Messaging section */}
                                        {tactic.messaging && (
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mt-4 p-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30"
                                          >
                                            <h6 className="text-sm font-semibold text-white mb-2 flex items-center">
                                              <MessageSquare className="w-4 h-4 mr-2 text-indigo-400" />
                                              Communication Strategy
                                            </h6>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                              <div>
                                                <span className="text-indigo-300 font-medium">Channels:</span>
                                                <div className="mt-1 space-y-1">
                                                  {tactic.messaging.channels.map((channel, idx) => (
                                                    <div key={idx} className="text-white/80">• {channel}</div>
                                                  ))}
                                                </div>
                                              </div>
                                              <div>
                                                <span className="text-indigo-300 font-medium">Materials:</span>
                                                <div className="mt-1 space-y-1">
                                                  {tactic.messaging.materials.map((material, idx) => (
                                                    <div key={idx} className="text-white/80">• {material}</div>
                                                  ))}
                                                </div>
                                              </div>
                                              <div>
                                                <span className="text-indigo-300 font-medium">Audience:</span>
                                                <div className="text-white/80 mt-1">{tactic.messaging.audience}</div>
                                              </div>
                                              <div>
                                                <span className="text-indigo-300 font-medium">Timing:</span>
                                                <div className="text-white/80 mt-1">{tactic.messaging.timing}</div>
                                              </div>
                                            </div>
                                          </motion.div>
                                        )}
                                      </div>
                                    </Accordion.Content>
                                  </Accordion.Item>
                                ))}
                              </Accordion.Root>
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </div>
                ) : step.id === 'metrics' ? (
                  /* Metrics Content with Deep KPI Tracking */
                  <div className="space-y-4">
                    <Accordion.Root type="multiple" className="space-y-3">
                      {step.categories?.map((category, categoryIndex) => (
                        <Accordion.Item key={categoryIndex} value={`category-${categoryIndex}`} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                          <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-1">{category.category}</h4>
                              <p className="text-blue-200 text-sm">{category.description}</p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="p-4 pt-0">
                              <Accordion.Root type="multiple" className="space-y-2">
                                {category.metrics.map((metric, metricIndex) => (
                                  <Accordion.Item key={metricIndex} value={`category-${categoryIndex}-${metricIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                    <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                                      <h5 className="text-md font-medium text-white">{metric.subcategory}</h5>
                                      <ChevronDown className="w-4 h-4 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                      <div className="p-3 pt-0 space-y-2">
                                        <Accordion.Root type="multiple" className="space-y-2">
                                          {metric.kpis.map((kpi, kpiIndex) => (
                                            <Accordion.Item key={kpiIndex} value={`category-${categoryIndex}-${metricIndex}-${kpiIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                              <Accordion.Trigger className="flex items-center justify-between w-full p-2 text-left hover:bg-white/5 transition-colors group">
                                                <div>
                                                  <h6 className="text-sm font-medium text-white">{kpi.kpi}</h6>
                                                  <p className="text-green-300 text-xs mt-1">Target: {kpi.target}</p>
                                                </div>
                                                <ChevronDown className="w-3 h-3 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                              </Accordion.Trigger>
                                              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                                <div className="p-2 pt-0 space-y-1">
                                                  <Accordion.Root type="multiple" className="space-y-1">
                                                    {kpi.platforms.map((platform, platformIndex) => (
                                                      <Accordion.Item key={platformIndex} value={`category-${categoryIndex}-${metricIndex}-${kpiIndex}-${platformIndex}`} className="bg-white/5 rounded-lg border border-white/10">
                                                        <Accordion.Trigger className="flex items-center justify-between w-full p-2 text-left hover:bg-white/5 transition-colors group">
                                                          <h6 className="text-xs font-medium text-white">{platform.platform}</h6>
                                                          <ChevronDown className="w-3 h-3 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                                        </Accordion.Trigger>
                                                        <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                                          <div className="p-2 pt-0 space-y-1">
                                                            {platform.implementation.map((impl, implIndex) => (
                                                              <motion.div
                                                                key={implIndex}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: implIndex * 0.05 }}
                                                                className="flex items-start"
                                                              >
                                                                <CheckCircle className="w-2 h-2 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                                                                <span className="text-white/90 text-xs leading-relaxed">
                                                                  {impl}
                                                                </span>
                                                              </motion.div>
                                                            ))}
                                                            
                                                            {/* Platform messaging section */}
                                                            {platform.messaging && (
                                                              <motion.div
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.2 }}
                                                                className="mt-2 p-2 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-lg border border-emerald-500/30"
                                                              >
                                                                <h6 className="text-xs font-semibold text-white mb-1 flex items-center">
                                                                  <MessageSquare className="w-3 h-3 mr-1 text-emerald-400" />
                                                                  Tracking Communication
                                                                </h6>
                                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                                  <div>
                                                                    <span className="text-emerald-300 font-medium">Channels:</span>
                                                                    <div className="text-white/80 text-xs">
                                                                      {platform.messaging.channels.slice(0, 2).map((channel, idx) => (
                                                                        <div key={idx}>• {channel}</div>
                                                                      ))}
                                                                    </div>
                                                                  </div>
                                                                  <div>
                                                                    <span className="text-emerald-300 font-medium">Materials:</span>
                                                                    <div className="text-white/80 text-xs">
                                                                      {platform.messaging.materials.slice(0, 2).map((material, idx) => (
                                                                        <div key={idx}>• {material}</div>
                                                                      ))}
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </motion.div>
                                                            )}
                                                          </div>
                                                        </Accordion.Content>
                                                      </Accordion.Item>
                                                    ))}
                                                  </Accordion.Root>
                                                </div>
                                              </Accordion.Content>
                                            </Accordion.Item>
                                          ))}
                                        </Accordion.Root>
                                      </div>
                                    </Accordion.Content>
                                  </Accordion.Item>
                                ))}
                              </Accordion.Root>
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </div>
                ) : (
                  /* Other Strategy Content */
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(step as any).insights?.map((insight: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-white text-sm leading-relaxed">
                            {insight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {/* Comprehensive Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Comprehensive Implementation Roadmap</h3>
          <p className="text-blue-200 text-sm mb-6">Detailed next steps with specific deliverables, timelines, and success criteria</p>
          
          <Accordion.Root type="multiple" className="space-y-4">
            {/* Week 1-2: Champion Identification & Selection */}
            <Accordion.Item value="week1-2" className="bg-blue-600/10 rounded-lg border border-blue-500/30 overflow-hidden">
              <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-blue-600/20 transition-colors group">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Week 1-2: Champion Identification & Selection</h4>
                  <p className="text-blue-200 text-sm">Identify and onboard 8-10 champion users across different tax departments</p>
                </div>
                <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="p-4 pt-0">
                  <Accordion.Root type="multiple" className="space-y-3">
                    
                    {/* Data Analysis & Candidate Identification */}
                    <Accordion.Item value="week1-2-analysis" className="bg-white/5 rounded-lg border border-white/10">
                      <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                        <h5 className="text-md font-medium text-white">Week 1: Data Analysis & Candidate Identification</h5>
                        <ChevronDown className="w-4 h-4 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="p-3 pt-0 space-y-3">
                          <div className="p-3 bg-cyan-600/20 rounded-lg border border-cyan-500/30">
                            <h6 className="text-white font-medium mb-2">Performance Analytics Review</h6>
                            <ul className="text-cyan-100 text-sm space-y-1">
                              <li>• Extract pilot group usage data and engagement metrics</li>
                              <li>• Identify top 20% performers by efficiency gains and feature utilization</li>
                              <li>• Map high performers to department coverage (Corporate, Individual, International, State & Local)</li>
                              <li>• Document specific use cases and success patterns for each candidate</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                            <h6 className="text-white font-medium mb-2">Peer Nomination Survey</h6>
                            <ul className="text-green-100 text-sm space-y-1">
                              <li>• Deploy anonymous survey: "Who do you go to for help with new processes?"</li>
                              <li>• Target 50+ tax professionals across all departments</li>
                              <li>• Include questions about technology comfort and teaching ability</li>
                              <li>• Cross-reference nominations with pilot performance data</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                            <h6 className="text-white font-medium mb-2">Manager Recommendations</h6>
                            <ul className="text-purple-100 text-sm space-y-1">
                              <li>• Schedule 15-minute calls with each department head</li>
                              <li>• Request 2-3 influencer recommendations per department</li>
                              <li>• Assess manager willingness to support champion time investment</li>
                              <li>• Identify potential resistance points and mitigation strategies</li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>

                    {/* Champion Outreach & Onboarding */}
                    <Accordion.Item value="week1-2-outreach" className="bg-white/5 rounded-lg border border-white/10">
                      <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                        <h5 className="text-md font-medium text-white">Week 2: Champion Outreach & Onboarding</h5>
                        <ChevronDown className="w-4 h-4 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="p-3 pt-0 space-y-3">
                          <div className="p-3 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
                            <h6 className="text-white font-medium mb-2">Personalized Outreach Campaign</h6>
                            <ul className="text-indigo-100 text-sm space-y-1">
                              <li>• Send Practice Lead emails positioning as leadership development opportunity</li>
                              <li>• Include champion program benefits: LinkedIn designation, executive visibility</li>
                              <li>• Schedule 15-minute discovery calls to assess interest and availability</li>
                              <li>• Prepare champion role description and time commitment expectations</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-yellow-600/20 rounded-lg border border-yellow-500/30">
                            <h6 className="text-white font-medium mb-2">Infrastructure Setup</h6>
                            <ul className="text-yellow-100 text-sm space-y-1">
                              <li>• Create dedicated Slack/Teams champion workspace</li>
                              <li>• Set up SharePoint resource library with training materials</li>
                              <li>• Configure calendar scheduling for weekly office hours</li>
                              <li>• Prepare LinkedIn "AI Champion" badge graphics and profiles</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
                            <h6 className="text-white font-medium mb-2">Success Criteria & Deliverables</h6>
                            <ul className="text-emerald-100 text-sm space-y-1">
                              <li>• Confirm 8-10 champions with signed participation agreements</li>
                              <li>• Achieve representation across all four tax specialties</li>
                              <li>• Complete champion onboarding documentation</li>
                              <li>• Schedule Week 3 intensive training session for all champions</li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Week 3-4: Training Program Launch */}
            <Accordion.Item value="week3-4" className="bg-purple-600/10 rounded-lg border border-purple-500/30 overflow-hidden">
              <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-purple-600/20 transition-colors group">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Week 3-4: Training Program Launch</h4>
                  <p className="text-purple-200 text-sm">Launch structured training program and establish feedback channels</p>
                </div>
                <ChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="p-4 pt-0">
                  <Accordion.Root type="multiple" className="space-y-3">
                    
                    {/* Champion Training Intensive */}
                    <Accordion.Item value="week3-4-training" className="bg-white/5 rounded-lg border border-white/10">
                      <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                        <h5 className="text-md font-medium text-white">Week 3: Champion Training Intensive</h5>
                        <ChevronDown className="w-4 h-4 text-purple-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="p-3 pt-0 space-y-3">
                          <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                            <h6 className="text-white font-medium mb-2">3-Hour Training Session</h6>
                            <ul className="text-blue-100 text-sm space-y-1">
                              <li>• Hour 1: AI tool mastery - advanced features and best practices</li>
                              <li>• Hour 2: Teaching methodology - how to train and mentor colleagues</li>
                              <li>• Hour 3: Change management - addressing resistance and skepticism</li>
                              <li>• Record session for reference and future champion onboarding</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-orange-600/20 rounded-lg border border-orange-500/30">
                            <h6 className="text-white font-medium mb-2">Hands-On Practice & Certification</h6>
                            <ul className="text-orange-100 text-sm space-y-1">
                              <li>• Live practice session with real anonymized tax contracts</li>
                              <li>• Individual coaching on advanced techniques and edge cases</li>
                              <li>• Champion certification assessment and badge award</li>
                              <li>• Role-play sessions for handling common user objections</li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>

                    {/* Feedback Systems Implementation */}
                    <Accordion.Item value="week3-4-feedback" className="bg-white/5 rounded-lg border border-white/10">
                      <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                        <h5 className="text-md font-medium text-white">Week 4: Feedback Systems & Communication Channels</h5>
                        <ChevronDown className="w-4 h-4 text-purple-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="p-3 pt-0 space-y-3">
                          <div className="p-3 bg-teal-600/20 rounded-lg border border-teal-500/30">
                            <h6 className="text-white font-medium mb-2">Multi-Channel Feedback Collection</h6>
                            <ul className="text-teal-100 text-sm space-y-1">
                              <li>• Weekly pulse surveys via Qualtrics (2-3 minute completion)</li>
                              <li>• Champion office hours: 2 hours weekly per champion</li>
                              <li>• Anonymous suggestion box for sensitive feedback</li>
                              <li>• Integration with existing project management tools for real-time data</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-pink-600/20 rounded-lg border border-pink-500/30">
                            <h6 className="text-white font-medium mb-2">Communication Infrastructure</h6>
                            <ul className="text-pink-100 text-sm space-y-1">
                              <li>• Launch weekly "AI Success Stories" email newsletter</li>
                              <li>• Create department-specific discussion threads</li>
                              <li>• Set up escalation protocols for technical and process issues</li>
                              <li>• Establish monthly town halls with leadership participation</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
                            <h6 className="text-white font-medium mb-2">Success Criteria & Deliverables</h6>
                            <ul className="text-indigo-100 text-sm space-y-1">
                              <li>• 100% champion completion of certification training</li>
                              <li>• Feedback collection systems operational and tested</li>
                              <li>• Champion office hours scheduled and publicized</li>
                              <li>• Baseline metrics established for subsequent measurement</li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Week 5-8: Pilot Implementation & Metrics */}
            <Accordion.Item value="week5-8" className="bg-green-600/10 rounded-lg border border-green-500/30 overflow-hidden">
              <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-green-600/20 transition-colors group">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Week 5-8: Pilot Implementation & Measurement</h4>
                  <p className="text-green-200 text-sm">Launch department pilots, measure adoption metrics, and refine approach based on data</p>
                </div>
                <ChevronDown className="w-5 h-5 text-green-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="p-4 pt-0">
                  <Accordion.Root type="multiple" className="space-y-3">
                    
                    {/* Department Pilot Launch */}
                    <Accordion.Item value="week5-8-pilots" className="bg-white/5 rounded-lg border border-white/10">
                      <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                        <h5 className="text-md font-medium text-white">Week 5-6: Department Pilot Launch</h5>
                        <ChevronDown className="w-4 h-4 text-green-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="p-3 pt-0 space-y-3">
                          <div className="p-3 bg-cyan-600/20 rounded-lg border border-cyan-500/30">
                            <h6 className="text-white font-medium mb-2">Team Formation & Training</h6>
                            <ul className="text-cyan-100 text-sm space-y-1">
                              <li>• Each champion selects 3-4 colleagues from their department</li>
                              <li>• Target mix: 1-2 senior staff, 1-2 junior professionals per team</li>
                              <li>• Champion-led training sessions (2 hours per team)</li>
                              <li>• Establish team goals: 80% contract processing with AI assistance</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-amber-600/20 rounded-lg border border-amber-500/30">
                            <h6 className="text-white font-medium mb-2">Daily Implementation & Support</h6>
                            <ul className="text-amber-100 text-sm space-y-1">
                              <li>• Daily AI tool usage with structured feedback capture</li>
                              <li>• Weekly 30-minute team check-ins for troubleshooting</li>
                              <li>• Real-time support via champion network and technical escalation</li>
                              <li>• Document specific use cases and efficiency improvements</li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>

                    {/* Metrics Collection & Analysis */}
                    <Accordion.Item value="week5-8-metrics" className="bg-white/5 rounded-lg border border-white/10">
                      <Accordion.Trigger className="flex items-center justify-between w-full p-3 text-left hover:bg-white/5 transition-colors group">
                        <h5 className="text-md font-medium text-white">Week 7-8: Data Collection & Strategic Refinement</h5>
                        <ChevronDown className="w-4 h-4 text-green-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="p-3 pt-0 space-y-3">
                          <div className="p-3 bg-violet-600/20 rounded-lg border border-violet-500/30">
                            <h6 className="text-white font-medium mb-2">Comprehensive Metrics Analysis</h6>
                            <ul className="text-violet-100 text-sm space-y-1">
                              <li>• Usage frequency: Target 80% of eligible contracts processed</li>
                              <li>• Time savings: Before/after comparison for similar contract types</li>
                              <li>• Quality metrics: Error rate tracking and client satisfaction scores</li>
                              <li>• User satisfaction: Weekly pulse checks and comprehensive surveys</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-rose-600/20 rounded-lg border border-rose-500/30">
                            <h6 className="text-white font-medium mb-2">Strategy Refinement & Optimization</h6>
                            <ul className="text-rose-100 text-sm space-y-1">
                              <li>• Identify top-performing teams and replicate success patterns</li>
                              <li>• Address common barriers and resistance points</li>
                              <li>• Refine training curriculum based on user feedback</li>
                              <li>• Update champion support materials and escalation processes</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
                            <h6 className="text-white font-medium mb-2">Phase 2 Preparation & Scaling</h6>
                            <ul className="text-emerald-100 text-sm space-y-1">
                              <li>• Document best practices and success stories for broader rollout</li>
                              <li>• Plan cohort-based deployment strategy for remaining departments</li>
                              <li>• Prepare executive presentation with pilot results and ROI data</li>
                              <li>• Secure budget and resource approval for full-scale implementation</li>
                            </ul>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                </div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Risk Mitigation & Contingency Planning */}
            <Accordion.Item value="risk-mitigation" className="bg-yellow-600/10 rounded-lg border border-yellow-500/30 overflow-hidden">
              <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-yellow-600/20 transition-colors group">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Risk Mitigation & Contingency Planning</h4>
                  <p className="text-yellow-200 text-sm">Proactive risk management and contingency strategies for common implementation challenges</p>
                </div>
                <ChevronDown className="w-5 h-5 text-yellow-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="p-4 pt-0 space-y-3">
                  <div className="p-3 bg-red-600/20 rounded-lg border border-red-500/30">
                    <h6 className="text-white font-medium mb-2">Low Champion Recruitment (&lt; 8 participants)</h6>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Escalate to Practice Lead for direct manager intervention</li>
                      <li>• Offer additional incentives: professional development credits, conference attendance</li>
                      <li>• Consider external champion recruitment from other KPMG offices</li>
                      <li>• Reduce scope to 6 champions with broader department coverage</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-orange-600/20 rounded-lg border border-orange-500/30">
                    <h6 className="text-white font-medium mb-2">Pilot Team Resistance (&lt; 60% engagement)</h6>
                    <ul className="text-orange-100 text-sm space-y-1">
                      <li>• Implement mandatory training approach with manager enforcement</li>
                      <li>• Provide additional one-on-one coaching for struggling users</li>
                      <li>• Showcase early wins and success stories from engaged teams</li>
                      <li>• Adjust workload expectations and provide billable hour relief</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-600/20 rounded-lg border border-amber-500/30">
                    <h6 className="text-white font-medium mb-2">Technical Issues & Tool Limitations</h6>
                    <ul className="text-amber-100 text-sm space-y-1">
                      <li>• Establish direct vendor escalation channel with guaranteed response times</li>
                      <li>• Create workaround documentation for known limitations</li>
                      <li>• Develop hybrid manual-AI workflows for complex edge cases</li>
                      <li>• Maintain legacy process capability for critical client deadlines</li>
                    </ul>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-6"
          >
            {/* Left side - Profile */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">Robert Mill</h3>
              <p className="text-blue-200 text-sm">AI Solutions & Go-to-Market Consultant</p>
            </div>

            {/* Center - Social Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://www.linkedin.com/in/bertomill/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-blue-600/20 border border-white/20 hover:border-blue-400/50 rounded-lg transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">LinkedIn</span>
              </motion.a>
              
              <motion.a
                href="https://github.com/bertomill"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-gray-600/20 border border-white/20 hover:border-gray-400/50 rounded-lg transition-all duration-300"
              >
                <Github className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">GitHub</span>
              </motion.a>
              
              <motion.a
                href="https://www.youtube.com/@Bertomill1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-600/20 border border-white/20 hover:border-red-400/50 rounded-lg transition-all duration-300"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span className="text-white text-sm">YouTube</span>
              </motion.a>
              
              <motion.a
                href="https://x.com/bertomill1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-slate-600/20 border border-white/20 hover:border-slate-400/50 rounded-lg transition-all duration-300"
              >
                <Twitter className="w-4 h-4 text-slate-400" />
                <span className="text-white text-sm">X (Twitter)</span>
              </motion.a>
            </div>

            {/* Right side - Links */}
            <div className="flex gap-3">
              <motion.a
                href="/mock-interview"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 hover:border-purple-400/50 rounded-lg transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm font-medium">Mock Interview</span>
              </motion.a>

              <motion.a
                href="/interviewee-questions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-500/30 hover:border-green-400/50 rounded-lg transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">My Questions</span>
              </motion.a>

              {/* AI Agent is now persistent - floating button in bottom right */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-lg">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-white text-sm font-medium">AI Assistant Active</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-6 border-t border-white/10 text-center"
          >
            <p className="text-white/60 text-xs">
              © 2025 Robert Mill. Built for KPMG AI Strategy Interview.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// Export the protected app
export default function Home() {
  return (
    <PasswordProtection>
      <MainApp />
      <AIAgent />
      <AIVoiceAgent />
    </PasswordProtection>
  )
}