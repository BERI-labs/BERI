/**
 * Script to generate embeddings for policy chunks
 * Run with: node scripts/generate-embeddings.mjs
 */

import { pipeline, env } from '@xenova/transformers'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Disable local model check to avoid sharp dependency
env.allowLocalModels = false

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Policy content covering all 20 test queries
const POLICY_CONTENT = [
  // E-Safety Policy - Mobile Phones (Q1, Q2)
  {
    source: 'E-Safety Policy',
    section: 'Mobile Phone Usage',
    content: `Mobile Phone Rules: Students are not permitted to use mobile phones during school hours without explicit permission from a member of staff. Phones must be switched off and kept in bags during lessons and around the school premises. If a student needs to contact a parent or guardian during the school day, they should ask permission from a member of staff to use their phone or use the school office telephone.`
  },
  {
    source: 'E-Safety Policy',
    section: 'Mobile Phone Sanctions',
    content: `Consequences for Mobile Phone Misuse: If a student is caught using their phone without permission during school hours, the phone will be confiscated and held at the school office. First offence: the phone will be returned at the end of the school day. Second offence: a parent or guardian must collect the phone. Repeated offences may result in the phone being banned from school premises entirely and further disciplinary action.`
  },
  // E-Safety Policy - DSL (Q3)
  {
    source: 'E-Safety Policy',
    section: 'Safeguarding Contacts',
    content: `Designated Safeguarding Lead (DSL): The school's Designated Safeguarding Lead is responsible for all safeguarding matters, including e-safety concerns. Students or staff who have any safeguarding concerns should contact the DSL directly. The DSL's name and contact details are displayed in the school reception, on the school website, and on posters around the school. Deputy DSLs are also available if the main DSL is unavailable.`
  },
  // E-Safety Policy - Photography (Q4)
  {
    source: 'E-Safety Policy',
    section: 'Photography and Recording',
    content: `Photography at School: Students must not take photographs or videos of other students or staff without their explicit consent. Photography is not permitted in changing rooms, toilets, or other private areas under any circumstances. For school events, official photographers may be present and parents will be notified in advance. Students who wish to opt out of being photographed should inform their form tutor.`
  },
  // E-Safety Policy - Cyberbullying (Q5)
  {
    source: 'E-Safety Policy',
    section: 'Cyberbullying',
    content: `Reporting Cyberbullying: If you witness or experience cyberbullying, you should report it immediately to a trusted adult such as your form tutor, head of year, or the Designated Safeguarding Lead. You can also report concerns anonymously through the school's online reporting system. Do not respond to cyberbullying messages, but do save evidence (screenshots) if possible. The school takes all reports of cyberbullying seriously and will investigate thoroughly.`
  },
  // Academic Integrity - AI Tools (Q6, Q9, Q10)
  {
    source: 'Academic Integrity Policy',
    section: 'AI Tools and Homework',
    content: `Use of AI Tools: Students may use AI tools such as ChatGPT, Copilot, or similar for brainstorming ideas, explaining concepts, and checking spelling and grammar. However, any work submitted for assessment must be the student's own original writing. Using AI to generate essays, answers, or other content that is then submitted as your own work constitutes academic misconduct. You must cite any AI tools used in your research process.`
  },
  {
    source: 'Academic Integrity Policy',
    section: 'Citing AI Tools',
    content: `AI Citation Requirements: When you use AI tools to assist with your work, you must declare this. Include a statement at the end of your work explaining how AI was used (e.g., "I used ChatGPT to help brainstorm initial ideas" or "I used Grammarly to check spelling and grammar"). Failure to declare AI usage may be treated as academic misconduct.`
  },
  // Academic Integrity - Plagiarism (Q7, Q8)
  {
    source: 'Academic Integrity Policy',
    section: 'Definition of Plagiarism',
    content: `What Counts as Plagiarism: Plagiarism is presenting someone else's work, ideas, or words as your own without proper acknowledgement. This includes: copying text from books, websites, or other sources without citation; paraphrasing without attribution; submitting work done by another student; using AI-generated content as your own; purchasing or downloading essays from the internet. Even accidental plagiarism is a serious academic offence.`
  },
  {
    source: 'Academic Integrity Policy',
    section: 'Plagiarism Consequences',
    content: `Consequences of Plagiarism: First offence results in a formal warning, the work receiving zero marks, and a requirement to resubmit the work. Second offence leads to detention, parental notification, and a note on the student's academic record. Repeated or serious offences may result in internal suspension, impact on UCAS references, and in extreme cases, exclusion from public examinations. All incidents are recorded and may affect academic references.`
  },
  // Acceptable Use Policy (Q11-Q15)
  {
    source: 'Acceptable Use Policy',
    section: 'Password Security',
    content: `Password Policy: Students must never share their passwords with anyone, including friends, family members, or staff (staff will never ask for your password). Each student is responsible for all activity conducted under their account. If you suspect your password has been compromised, change it immediately and report this to the IT department. Use strong passwords with a mix of letters, numbers, and symbols.`
  },
  {
    source: 'Acceptable Use Policy',
    section: 'Prohibited Websites',
    content: `Website Restrictions: The school network blocks access to websites that are inappropriate, dangerous, or not relevant to education. This includes: social media platforms (unless authorised for educational use), gaming websites, gambling sites, sites containing adult content, sites promoting violence or illegal activity, and file-sharing or torrent sites. Attempting to bypass these restrictions using VPNs or proxies is a serious breach of the Acceptable Use Policy.`
  },
  {
    source: 'Acceptable Use Policy',
    section: 'Personal Use of School WiFi',
    content: `School WiFi Usage: The school WiFi network is provided primarily for educational purposes. Limited personal use is permitted during break times and lunch, provided it does not breach other school policies or consume excessive bandwidth. Streaming video services (Netflix, YouTube for entertainment) and online gaming are not permitted. All internet activity on the school network is monitored and logged.`
  },
  {
    source: 'Acceptable Use Policy',
    section: 'IT Rules Consequences',
    content: `Consequences for Breaking IT Rules: Breaches of the Acceptable Use Policy will result in disciplinary action proportionate to the severity of the offence. Minor breaches may result in a verbal warning or temporary loss of IT privileges. Serious breaches (such as attempting to access inappropriate content, hacking, or cyberbullying) may result in permanent loss of IT privileges, detention, suspension, or involvement of external authorities where illegal activity is suspected.`
  },
  {
    source: 'Acceptable Use Policy',
    section: 'Software Installation',
    content: `Software and Downloads: Students must not download or install any software, games, or applications on school computers or their school-issued laptops without explicit permission from the IT department. This includes browser extensions, games, and utilities. Unauthorised software may contain malware, violate licensing agreements, or interfere with the school's network security. If you need specific software for your studies, request it through your teacher or the IT helpdesk.`
  },
  // Data Protection Policy (Q16-Q20)
  {
    source: 'Data Protection Policy',
    section: 'Who Can Access Your Data',
    content: `Access to Personal Data: Your personal data is only accessible to school staff who need it for educational or administrative purposes. This includes teachers, administrative staff, and senior leadership. Your data may also be shared with external organisations where legally required, such as the Department for Education, exam boards, or local authorities. The school will not share your data with third parties for marketing purposes without explicit consent.`
  },
  {
    source: 'Data Protection Policy',
    section: 'Definition of Personal Data',
    content: `What is Personal Data: Personal data is any information that can identify you as an individual. This includes: your name, date of birth, and address; photographs and videos; academic records and reports; attendance data; medical information; family and emergency contact details; behavioural records; and any unique identifiers such as student numbers. Special category data (such as health information or religious beliefs) receives additional protection.`
  },
  {
    source: 'Data Protection Policy',
    section: 'Data Retention',
    content: `How Long We Keep Your Data: The school retains student data in accordance with legal requirements and the school's retention schedule. Current student records are kept throughout your time at the school. After you leave, core academic records are kept for 7 years, safeguarding records for 25 years (or until you reach age 25, whichever is longer), and examination records permanently. Other data is securely deleted when no longer needed.`
  },
  {
    source: 'Data Protection Policy',
    section: 'Subject Access Requests',
    content: `Your Right to Access Your Data: Under data protection law (UK GDPR), you have the right to request a copy of the personal data the school holds about you. This is called a Subject Access Request (SAR). To make a SAR, submit a written request to the school's Data Protection Officer. The school must respond within 30 days. There is no fee for this service. You can also request that incorrect data be corrected or, in some circumstances, that your data be deleted.`
  },
  {
    source: 'Data Protection Policy',
    section: 'Data Breach Procedures',
    content: `Data Breach Response: A data breach is any incident where personal data is lost, stolen, or accessed without authorisation. If a data breach occurs, the school will: investigate immediately and contain the breach; assess the risk to individuals affected; notify the Information Commissioner's Office (ICO) within 72 hours if required; inform affected individuals without undue delay if there is a high risk to their rights; and take steps to prevent future breaches. If you suspect a data breach, report it immediately to the Data Protection Officer or IT department.`
  }
]

async function generateEmbeddings() {
  console.log('Loading embedding model (this may take a minute)...')

  // Load the embedding pipeline
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

  console.log('Model loaded! Generating embeddings for', POLICY_CONTENT.length, 'chunks...')

  const chunks = []

  for (let i = 0; i < POLICY_CONTENT.length; i++) {
    const policy = POLICY_CONTENT[i]
    console.log(`Processing chunk ${i + 1}/${POLICY_CONTENT.length}: ${policy.source} - ${policy.section}`)

    // Generate embedding
    const output = await embedder(policy.content, { pooling: 'mean', normalize: true })
    const embedding = Array.from(output.data)

    chunks.push({
      id: `chunk-${i}`,
      content: policy.content,
      embedding,
      metadata: {
        source: policy.source,
        section: policy.section,
        chunkIndex: i
      }
    })
  }

  // Write to chunks.json
  const outputPath = join(__dirname, '..', 'src', 'data', 'chunks.json')
  fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2))

  console.log(`\nDone! Generated ${chunks.length} chunks with ${chunks[0].embedding.length}-dimensional embeddings`)
  console.log(`Output saved to: ${outputPath}`)
}

generateEmbeddings().catch(console.error)
