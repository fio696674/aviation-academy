/**
 * Simple script to seed Sanity data
 * Run: node scripts/local-seed.js
 */

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'vmzl49zj',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

// Debug: Check if token is loaded
console.log('Token loaded:', !!process.env.SANITY_TOKEN)
if (!process.env.SANITY_TOKEN) {
  console.log('❌ No token found! Make sure SANITY_TOKEN is in .env.local')
  console.log('   Add: SANITY_TOKEN=your_token_here')
  process.exit(1)
}

const data = [
  // Courses
  { _type: 'course', title: 'DGCA Aircraft Maintenance Engineering (AME)', slug: { _type: 'slug', current: 'dgca-aircraft-maintenance-engineering' }, description: 'Comprehensive DGCA AME preparation covering Airframe, Powerplant, and Avionics.', price: 45000, region: 'DGCA', isActive: true, orderIndex: 1 },
  { _type: 'course', title: 'FAA Private Pilot Ground School (PPL)', slug: { _type: 'slug', current: 'faa-private-pilot-ground-school' }, description: 'Complete FAA PPL preparation - aerodynamics, meteorology, navigation, regulations.', price: 25000, region: 'FAA', isActive: true, orderIndex: 2 },
  { _type: 'course', title: 'EASA Commercial Pilot License (CPL)', slug: { _type: 'slug', current: 'easa-commercial-pilot-license-cpl' }, description: 'Advanced EASA CPL theory - JAR-FCL compliant curriculum.', price: 75000, region: 'EASA', isActive: true, orderIndex: 3 },
  { _type: 'course', title: 'EASA ATPL Theory Complete', slug: { _type: 'slug', current: 'easa-atpl-theory-complete' }, description: 'Complete ATPL theory - highest pilot certification level.', price: 120000, region: 'EASA', isActive: true, orderIndex: 4 },
  { _type: 'course', title: 'DGCA Navigator Certification', slug: { _type: 'slug', current: 'dgca-navigator-certification' }, description: 'Radio navigation, inertial navigation, PBN preparation.', price: 35000, region: 'DGCA', isActive: true, orderIndex: 5 },
  { _type: 'course', title: 'FAA Instrument Rating', slug: { _type: 'slug', current: 'faa-instrument-rating' }, description: 'IFR procedures, instrument approaches, IMC training.', price: 30000, region: 'FAA', isActive: true, orderIndex: 6 },
  
  // Instructors
  { _type: 'instructor', name: 'Capt. Rajesh Kumar', bio: 'Former IAF pilot, Ex-DGCA examiner, 25+ years experience', specialties: ['DGCA', 'Navigation', 'Regulations'] },
  { _type: 'instructor', name: 'Capt. Sarah Mitchell', bio: 'FAA DPE, 15 years commercial aviation experience', specialties: ['FAA PPL', 'IR', 'Commercial'] },
  { _type: 'instructor', name: 'Capt. Hans Mueller', bio: 'EASA ATPL instructor, 20 years European aviation', specialties: ['EASA ATPL', 'CPL', 'Performance'] },
  
  // FAQs
  { _type: 'faq', question: 'DGCA AME eligibility?', answer: '10+2 with Physics/Math, 50% marks, Age 17-25 years', category: 'general', order: 1 },
  { _type: 'faq', question: 'Course duration?', answer: 'DGCA AME: 2-4 years depending on category', category: 'general', order: 2 },
  { _type: 'faq', question: 'Payment methods?', answer: 'Credit/Debit cards, UPI, net banking, EMI via Razorpay', category: 'payments', order: 1 },
  { _type: 'faq', question: 'Refund policy?', answer: '30-day money-back guarantee', category: 'payments', order: 2 },
  { _type: 'faq', question: 'MCP exam pattern?', answer: 'Negative marking 0.25 per wrong answer, 70% to pass', category: 'exams', order: 1 },
  { _type: 'faq', question: 'Exam attempts allowed?', answer: 'No limit on written exams, practicals have validity period', category: 'exams', order: 2 },
  { _type: 'faq', question: 'Certificate download?', answer: 'Download from dashboard with QR verification code', category: 'certificates', order: 1 },
  { _type: 'faq', question: 'International recognition?', answer: 'Follows DGCA/FAA/EASA guidelines - recognition varies by country', category: 'certificates', order: 2 },
  
  // Announcements
  { _type: 'announcement', title: 'New DGCA AME Batch', content: 'Early bird 10% discount before March 31st. Limited seats!', isPublished: true, publishedAt: new Date().toISOString() },
  { _type: 'announcement', title: 'FAA Exam Pattern Updated', content: 'Question patterns updated for PPL/IR. Course content revised.', isPublished: true, publishedAt: new Date().toISOString() }
]

async function seed() {
  console.log('\n🚀 Starting Sanity seeding...\n')
  
  // Check existing
  const existingCount = await client.fetch('count(*[_type == "course"])')
  console.log(`📊 Found ${existingCount} existing courses\n`)
  
  let created = 0
  let failed = 0
  let skipped = 0
  
  for (const doc of data) {
    try {
      // Check for duplicates
      let duplicate = false
      if (doc._type === 'course') {
        const existing = await client.fetch(`*[_type == "course" && slug.current == "${doc.slug.current}"][0]._id`)
        if (existing) {
          duplicate = true
          skipped++
          console.log(`⏭️  Skipped (duplicate): ${doc.title}`)
        }
      }
      
      if (!duplicate) {
        await client.create(doc)
        created++
        console.log(`✅ Created: ${doc._type} - ${doc.title || doc.question || doc.name}`)
      }
    } catch (err) {
      failed++
      console.log(`❌ Failed: ${doc._type} - ${err.message}`)
    }
  }
  
  console.log(`\n📊 Seeding complete:`)
  console.log(`   ✅ Created: ${created}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Failed: ${failed}`)
  
  // Verify
  const total = await client.fetch('count(*)')
  console.log(`\n📈 Total documents in Sanity: ${total}`)
}

seed().catch(console.error)
