'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, MessageSquare, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

// Mock interview transcript data
const transcriptData = {
  title: "KPMG AI Strategy Mock Interview Transcript",
  stakeholders: [
    { name: "Sarah Chen", role: "Tax Practice Lead" },
    { name: "Marcus Rodriguez", role: "Head of Technology" },
    { name: "Dr. Jennifer Walsh", role: "Product Manager" },
    { name: "Robert Mill", role: "Presenting (AI Solutions & Go-to-Market Consultant)" }
  ],
  sections: [
    {
      id: "opening",
      title: "Opening & Three Strategic Questions",
      content: [
        {
          speaker: "Interviewer (Sarah Chen)",
          text: "Robert, thank you for joining us today. We're excited to hear your strategic approach to scaling AI adoption across our Tax functions. Before we begin your presentation, you have the opportunity to ask up to three questions to help frame your recommendations. What would you like to know?"
        },
        {
          speaker: "Robert",
          text: "Thank you, Sarah. I appreciate this opportunity to collaborate on such a critical initiative. I have three strategic questions that will help me tailor my recommendations:",
          isKey: true
        },
        {
          speaker: "Robert",
          text: "1. **Stakeholder Priorities:** What are each of your primary success metrics for this AI rollout? Sarah, what does success look like from a Tax practice perspective? Marcus, from a technology standpoint? And Jennifer, from a product development angle?",
          isQuestion: true
        },
        {
          speaker: "Robert",
          text: "2. **Resource Reality:** What level of time investment are we realistically able to ask from our tax professionals during the rollout phases? Are we talking about 2-3 hours per week for training, or do we need to be more conservative?",
          isQuestion: true
        },
        {
          speaker: "Robert",
          text: "3. **Organizational Dynamics:** Based on your experience with previous technology implementations, what has been our biggest barrier - is it typically resistance from senior professionals, middle management skepticism, or something else entirely?",
          isQuestion: true
        },
        {
          speaker: "Interviewer (Sarah Chen)",
          text: "Excellent questions, Robert. Let me address the priorities first. From my perspective, success means maintaining our client service quality while achieving measurable efficiency gains. I need to see that this doesn't disrupt our current delivery timelines."
        },
        {
          speaker: "Interviewer (Marcus Rodriguez)",
          text: "From the technology side, I'm focused on adoption rates and support scalability. If we can't support 200+ users effectively, the whole initiative fails. I also need security and integration to be seamless."
        },
        {
          speaker: "Interviewer (Dr. Jennifer Walsh)",
          text: "Product-wise, I want to see actual usage metrics - not just initial adoption, but sustained engagement. Are people using it daily after month three? And are we seeing the productivity improvements we projected?"
        },
        {
          speaker: "Interviewer (Sarah Chen)",
          text: "For resources, realistically we can commit to 3-4 hours per person in the first month, then maybe 1-2 hours monthly for ongoing development. And historically, our biggest barrier has been middle management - partners are either all-in or all-out, but managers worry about looking incompetent or being replaced."
        },
        {
          speaker: "Robert",
          text: "Perfect. That context is incredibly valuable and confirms some of my analysis. Let me present a strategy that directly addresses these priorities and constraints."
        }
      ]
    },
    {
      id: "strategic-presentation",
      title: "Strategic Presentation",
      content: [
        {
          speaker: "Robert",
          text: "[SAMPLE OPENING]",
          isHeader: true
        },
        {
          speaker: "Robert",
          text: "\"Thank you for that context. Based on our pilot results and your insights, I see a clear path forward that builds on what's working while systematically addressing our adoption barriers.\"",
          isQuote: true
        },
        {
          speaker: "Robert",
          text: "\"Here's what we know: Our pilot group achieved 40% efficiency gains in contract review, but adoption remains limited to just 12 users. The technology works - our challenge is organizational, not technical.\"",
          isQuote: true
        },
        {
          speaker: "Robert",
          text: "\"I'm proposing a 4-phase approach that treats this as a change management initiative first, and a technology rollout second. This strategy addresses Sarah's client service concerns, Marcus's scalability requirements, and Jennifer's engagement metrics.\"",
          isQuote: true
        },
        {
          speaker: "Robert",
          text: "\"The core insight driving my approach is this: People don't resist AI - they resist uncertainty. So our job is to systematically reduce uncertainty through champions, training, and measurable wins.\"",
          isQuote: true,
          isKey: true
        },
        {
          speaker: "Interviewer (Sarah Chen)",
          text: "Robert, that opening is excellent. You've clearly listened to our concerns and I appreciate how you've positioned this as change management rather than just technology deployment. That resonates with my experience - we've had tools that technically worked but never got adopted."
        },
        {
          speaker: "Interviewer (Sarah Chen)",
          text: "I'm particularly interested in your 4-phase approach. Can you walk us through what that looks like practically? And when you mention \"champions\" - how do we identify and leverage them without creating additional workload for our best performers?"
        },
        {
          speaker: "Interviewer (Dr. Jennifer Walsh)",
          text: "I love the framing around uncertainty reduction. That's exactly what our user research showed - people weren't afraid of AI, they were afraid of looking incompetent or making mistakes. How does your approach specifically address that psychological barrier?"
        },
        {
          speaker: "Interviewer (Marcus Rodriguez)",
          text: "And from a practical standpoint, Robert, what's the timeline we're looking at for each phase? I need to plan support resources and integration work accordingly."
        }
      ]
    },
    {
      id: "phase-details",
      title: "Phase 1: Champion Network - Detailed Implementation", 
      content: [
        {
          speaker: "Robert",
          text: "Thank you. Let me outline the four phases, with specific timelines and deliverables for each.",
          isHeader: true
        },
        {
          speaker: "Robert",
          text: "**Phase 1: Champion Network - 30 Days**\nWe start by identifying 8-10 champions across different tax specialties - not necessarily our busiest people, but those who are naturally curious and influential among their peers. These champions get intensive training and become our internal evangelists."
        },
        {
          speaker: "Robert",
          text: "**Phase 2: Department Pilots - 60 Days**\nEach champion leads a small pilot within their specialty area - maybe 3-4 additional team members. This creates multiple success stories across different tax functions rather than one isolated group."
        },
        {
          speaker: "Robert",
          text: "**Phase 3: Full Scale Deployment - 90 Days**\nBased on pilot learnings, we roll out to the broader organization with refined training materials, peer mentoring, and clear success metrics."
        },
        {
          speaker: "Robert",
          text: "**Phase 4: Optimization & Expansion - 120+ Days**\nWe measure, iterate, and scale to additional AI tools based on adoption success."
        },
        {
          speaker: "Interviewer (Marcus Rodriguez)",
          text: "That timeline seems aggressive, Robert. In Phase 2, when you have multiple pilots running simultaneously, what's the support structure? Are we talking about dedicated technical resources for each pilot group?"
        },
        {
          speaker: "Interviewer (Dr. Jennifer Walsh)",
          text: "And how do you ensure the champions don't burn out? In my experience, we often overload our best people with additional responsibilities without considering their existing workload."
        },
        {
          speaker: "Interviewer (Sarah Chen)",
          text: "I'm also curious about the metrics. How do we measure success at each phase, and what happens if a pilot group struggles? Do we pause the whole initiative or adapt?"
        }
      ]
    }
  ]
}

export default function MockInterview() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['opening'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const getSpeakerStyle = (speaker: string) => {
    if (speaker.includes('Robert')) {
      return 'text-blue-300 font-semibold'
    } else if (speaker.includes('Sarah Chen')) {
      return 'text-purple-300 font-semibold'
    } else if (speaker.includes('Marcus Rodriguez')) {
      return 'text-green-300 font-semibold'
    } else if (speaker.includes('Jennifer Walsh')) {
      return 'text-yellow-300 font-semibold'
    }
    return 'text-gray-300 font-semibold'
  }

  const getMessageStyle = (item: any) => {
    if (item.isQuestion) {
      return 'bg-blue-600/20 border border-blue-500/30 rounded-lg p-4'
    } else if (item.isQuote) {
      return item.isKey ? 
        'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 italic' :
        'bg-gray-600/20 border border-gray-500/30 rounded-lg p-4 italic'
    } else if (item.isKey) {
      return 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-lg p-4'
    }
    return ''
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
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back to Strategy</span>
              </Link>
              <div className="w-px h-6 bg-white/20"></div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Mock Interview Transcript
                </h1>
                <p className="text-blue-200">
                  KPMG AI Strategy Interview Session
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Strategic Session</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Clock className="w-4 h-4" />
                <span>~45 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Stakeholders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Stakeholders Present</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {transcriptData.stakeholders.map((stakeholder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <h3 className="font-semibold text-white text-sm">{stakeholder.name}</h3>
                <p className="text-blue-200 text-xs mt-1">{stakeholder.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transcript Sections */}
        <div className="space-y-6">
          {transcriptData.sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + sectionIndex * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                {expandedSections.includes(section.id) ? 
                  <ChevronUp className="w-5 h-5 text-blue-400" /> : 
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                }
              </button>

              {/* Section Content */}
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6"
                >
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className={getMessageStyle(item)}
                      >
                        <div className="mb-2">
                          <span className={getSpeakerStyle(item.speaker)}>
                            {item.speaker}:
                          </span>
                        </div>
                        <div 
                          className="text-white/90 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') 
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-6 glass-effect rounded-xl text-center"
        >
          <p className="text-blue-200 text-sm">
            This transcript represents a strategic interview session focused on AI adoption planning for KPMG Tax functions.
          </p>
          <p className="text-white/60 text-xs mt-2">
            Interactive presentation available in the main strategy view
          </p>
        </motion.div>
      </main>
    </div>
  )
} 