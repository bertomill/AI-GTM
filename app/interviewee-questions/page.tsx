'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle, Users, Building, TrendingUp, Globe } from 'lucide-react'
import Link from 'next/link'

const questionCategories = [
  {
    id: 'role',
    title: 'Role & Responsibilities',
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-600/20 to-blue-700/20',
    borderColor: 'border-blue-500/30',
    questions: [
      "What does a typical day look like for a Senior Consultant in AI Solutions & Go-to-Market?",
      "How much of the role involves client-facing work versus internal strategy development?",
      "What's the balance between technical AI implementation and business strategy consulting?",
      "How does this role interface with KPMG's other service lines (Audit, Advisory, Tax)?",
      "What opportunities exist for specialization within the AI practice?"
    ]
  },
  {
    id: 'team',
    title: 'Team & Culture',
    icon: <Building className="w-6 h-6" />,
    color: 'from-purple-600/20 to-purple-700/20',
    borderColor: 'border-purple-500/30',
    questions: [
      "How is the AI Solutions team structured, and who would I be working most closely with?",
      "What's the collaboration like between the AI team and traditional consulting practices?",
      "How does KPMG foster innovation and experimentation within the AI practice?",
      "What's the mentorship and professional development structure for this role?",
      "How does the team stay current with rapidly evolving AI technology and best practices?"
    ]
  },
  {
    id: 'growth',
    title: 'Growth & Development',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-green-600/20 to-green-700/20',
    borderColor: 'border-green-500/30',
    questions: [
      "What are the typical career progression paths from this Senior Consultant position?",
      "How does KPMG support continued learning in AI/ML technologies and methodologies?",
      "Are there opportunities to contribute to KPMG's thought leadership or research publications?",
      "What client industries or AI use cases would I have the opportunity to work on?",
      "How does performance evaluation work, and what are the key success metrics?"
    ]
  },
  {
    id: 'strategic',
    title: 'Strategic Questions',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-orange-600/20 to-orange-700/20',
    borderColor: 'border-orange-500/30',
    questions: [
      "Where does KPMG see the AI consulting market heading in the next 2-3 years?",
      "How is KPMG differentiating its AI practice from competitors like Deloitte or Accenture?",
      "What are the biggest challenges KPMG faces in scaling AI adoption with enterprise clients?",
      "How does KPMG balance building proprietary AI capabilities versus partnering with tech vendors?",
      "What role does this position play in KPMG's broader digital transformation strategy?"
    ]
  }
]

export default function IntervieweeQuestions() {
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
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back to Strategy</span>
              </Link>
              <div className="w-px h-6 bg-white/20"></div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  My Questions for KPMG
                </h1>
                <p className="text-blue-200">
                  Strategic questions about the role, team, and opportunity
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200 mb-1">Prepared by</div>
              <div className="text-xl font-semibold text-white">Robert Mill</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
            <div className="flex items-center mb-3">
              <HelpCircle className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Interview Strategy</h2>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              These questions demonstrate my strategic thinking about the opportunity and show genuine interest in KPMG's AI practice. 
              They're designed to gather information that will help me excel in the role while positioning me as a thoughtful candidate 
              who understands the complexities of enterprise AI consulting.
            </p>
          </div>
        </motion.div>

        {/* Question Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {questionCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-6 bg-gradient-to-r ${category.color} rounded-xl border ${category.borderColor}`}
            >
              <div className="flex items-center mb-4">
                <div className="text-white mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.questions.map((question, qIndex) => (
                  <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + qIndex * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {question}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selection Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Question Selection Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Primary Questions (3-4)</h4>
              <p className="text-white/80 text-sm">
                Focus on role clarity and immediate priorities. Choose 1 from each category.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Follow-up Questions</h4>
              <p className="text-white/80 text-sm">
                Based on their responses, drill deeper into areas of mutual interest.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Time Permitting</h4>
              <p className="text-white/80 text-sm">
                Strategic questions show long-term thinking and industry awareness.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}