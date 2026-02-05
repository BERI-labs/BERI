/**
 * FAQ cache for instant responses to common questions
 * Uses simple text matching for reliable results
 */

import type { MessageSource } from '@/types'

/** Pre-computed FAQ entry */
interface FAQEntry {
  patterns: string[]  // Multiple patterns to match
  answer: string
  sources: MessageSource[]
}

/**
 * Pre-computed FAQ entries with answers
 * Patterns are lowercase for case-insensitive matching
 */
const FAQ_ENTRIES: FAQEntry[] = [
  {
    patterns: [
      'can i use my phone',
      'mobile phone',
      'phone at school',
      'use phone',
      'phones allowed',
    ],
    answer: `• Mobile phones must be switched off and kept in bags during lessons
• Phones cannot be used around school premises during school hours
• If you need to contact a parent/guardian, ask a member of staff for permission
• Sixth Form students may use phones in designated areas only

Source: Mobile Phone Policy`,
    sources: [{ source: 'Mobile Phone Policy', section: 'Mobile Phone Rules' }],
  },
  {
    patterns: [
      'chatgpt',
      'chat gpt',
      'ai for homework',
      'use ai',
      'artificial intelligence homework',
    ],
    answer: `• AI tools like ChatGPT may be used for research and understanding concepts
• You must not submit AI-generated text as your own work
• Any AI assistance must be declared and referenced appropriately
• Using AI to complete assignments without acknowledgement is academic misconduct

Source: Academic Integrity Policy`,
    sources: [{ source: 'Academic Integrity Policy', section: 'AI and Technology' }],
  },
  {
    patterns: [
      'plagiarise',
      'plagiarism',
      'plagiarize',
      'copy work',
      'copying',
    ],
    answer: `• First offence: Written warning and resubmission required
• Second offence: Detention and parental notification
• Serious cases: May result in suspension or exam disqualification
• All cases are recorded on your academic record

Source: Academic Integrity Policy`,
    sources: [{ source: 'Academic Integrity Policy', section: 'Consequences' }],
  },
  {
    patterns: [
      'personal data',
      'my data',
      'privacy',
      'who can see',
      'data protection',
    ],
    answer: `• Only authorised school staff can access your personal data
• Parents/guardians can request access to their child's records
• Data is shared with exam boards and local authority when required by law
• Third parties cannot access your data without consent

Source: Data Protection Policy`,
    sources: [{ source: 'Data Protection Policy', section: 'Data Access' }],
  },
]

/**
 * Check if a query matches a cached FAQ using simple pattern matching
 * @param query - The user's question
 * @returns Matching FAQ entry or null if no match
 */
export function checkFAQCache(query: string): FAQEntry | null {
  const lowerQuery = query.toLowerCase()

  for (const entry of FAQ_ENTRIES) {
    for (const pattern of entry.patterns) {
      if (lowerQuery.includes(pattern)) {
        console.log(`FAQ cache hit: matched pattern "${pattern}"`)
        return entry
      }
    }
  }

  return null
}

/**
 * Get a cached FAQ response if available
 * @param query - The user's question (raw text)
 * @returns Object with answer and sources, or null if no match
 */
export function getFAQResponse(query: string): { answer: string; sources: MessageSource[] } | null {
  const entry = checkFAQCache(query)
  if (entry) {
    return {
      answer: entry.answer,
      sources: entry.sources,
    }
  }
  return null
}
