/**
 * FAQ cache for instant responses to common questions
 * Uses improved pattern matching with exclusions to reduce false positives
 */

import type { MessageSource } from '@/types'

/** Pre-computed FAQ entry with exclusion patterns */
interface FAQEntry {
  patterns: string[]           // Patterns that trigger this FAQ
  excludePatterns?: string[]   // Patterns that prevent matching (even if patterns match)
  minQueryLength?: number      // Minimum query length to match (default: 10)
  answer: string
  sources: MessageSource[]
}

/** Minimum query length for FAQ matching (prevents matching on very short queries) */
const DEFAULT_MIN_QUERY_LENGTH = 10

/**
 * Pre-computed FAQ entries with answers
 * Patterns are lowercase for case-insensitive matching
 * More specific phrase-based patterns reduce false positives
 */
const FAQ_ENTRIES: FAQEntry[] = [
  {
    patterns: [
      'can i use my phone',
      'use my phone at school',
      'mobile phone policy',
      'phone during school',
      'phones allowed in school',
      'bring my phone',
      'phone in class',
      'phone in lesson',
    ],
    excludePatterns: [
      'charge my phone',
      'broken phone',
      'lost my phone',
      'phone number',
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
      'use chatgpt',
      'use chat gpt',
      'chatgpt for homework',
      'chatgpt for essay',
      'chatgpt for coursework',
      'use ai for homework',
      'use ai for assignment',
      'ai to write',
      'ai to help with homework',
      'allowed to use ai',
      'can i use ai',
    ],
    excludePatterns: [
      'what is chatgpt',
      'how does ai work',
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
      'what happens if i plagiarise',
      'what happens if i plagiarize',
      'plagiarism consequences',
      'caught plagiarising',
      'caught plagiarizing',
      'copy someone else',
      'copy another student',
      'copy from internet',
      'submit copied work',
      'copying homework',
      'copying coursework',
      'copying essay',
    ],
    excludePatterns: [
      'copy notes',
      'photocopy',
      'copying from the board',
      'copy down',
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
      'who can see my data',
      'who can access my data',
      'personal data access',
      'my personal information',
      'data protection policy',
      'privacy policy',
      'who sees my records',
      'who has access to my information',
      'school store my data',
    ],
    excludePatterns: [
      'delete my data',
      'change my data',
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
 * Check if a query matches a cached FAQ using improved pattern matching
 * @param query - The user's question
 * @returns Matching FAQ entry or null if no match
 */
export function checkFAQCache(query: string): FAQEntry | null {
  const lowerQuery = query.toLowerCase().trim()

  for (const entry of FAQ_ENTRIES) {
    const minLength = entry.minQueryLength ?? DEFAULT_MIN_QUERY_LENGTH

    // Skip if query is too short
    if (lowerQuery.length < minLength) {
      continue
    }

    // Check if any exclude pattern matches (if so, skip this entry)
    if (entry.excludePatterns) {
      const excluded = entry.excludePatterns.some(exclude =>
        lowerQuery.includes(exclude)
      )
      if (excluded) {
        continue
      }
    }

    // Check if any include pattern matches
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
