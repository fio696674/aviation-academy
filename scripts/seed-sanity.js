/**
 * Sanity Data Seeder
 * Run: node scripts/seed-sanity.js
 * 
 * This script populates Sanity with comprehensive test data
 */

const { createClient } = require('@sanity/client')
const slugify = require('slugify')

// Sanity client configuration
const client = createClient({
  projectId: 'vmzl49zj',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN // Need a token with write access
})

// Course data
const courses = [
  {
    _type: 'course',
    title: 'DGCA Aircraft Maintenance Engineering (AME)',
    slug: { _type: 'slug', current: 'dgca-aircraft-maintenance-engineering' },
    description: 'Comprehensive preparation for DGCA Aircraft Maintenance Engineer license examination. This course covers all required subjects including Airframe Systems, Powerplant, and Avionics. Designed by industry experts with years of experience in aviation maintenance training. Students will learn aircraft structures, systems, and maintenance procedures following DGCA CAR guidelines.',
    price: 45000,
    region: 'DGCA',
    isActive: true,
    orderIndex: 1
  },
  {
    _type: 'course',
    title: 'FAA Private Pilot Ground School (PPL)',
    slug: { _type: 'slug', current: 'faa-private-pilot-ground-school' },
    description: 'Complete ground school preparation for FAA Private Pilot Certificate (PPL). This comprehensive course covers aerodynamics, meteorology, navigation, aviation regulations, and flight planning. Perfect for aspiring pilots starting their aviation career with emphasis on practical knowledge and exam preparation.',
    price: 25000,
    region: 'FAA',
    isActive: true,
    orderIndex: 2
  },
  {
    _type: 'course',
    title: 'EASA Commercial Pilot License (CPL)',
    slug: { _type: 'slug', current: 'easa-commercial-pilot-license-cpl' },
    description: 'Advanced Commercial Pilot License theory preparation following EASA standards. Comprehensive coverage of all JAR-FCL requirements including advanced aerodynamics, meteorology, navigation, aircraft performance, and operational procedures.',
    price: 75000,
    region: 'EASA',
    isActive: true,
    orderIndex: 3
  },
  {
    _type: 'course',
    title: 'EASA ATPL Theory Complete',
    slug: { _type: 'slug', current: 'easa-atpl-theory-complete' },
    description: 'Complete Airline Transport Pilot License theory course following EASA standards. This is the highest level of aircraft pilot certification, required for commanding commercial air transport aircraft. Covers 14 mandatory subjects including advanced navigation, performance, and operations.',
    price: 120000,
    region: 'EASA',
    isActive: true,
    orderIndex: 4
  },
  {
    _type: 'course',
    title: 'DGCA Navigator Certification',
    slug: { _type: 'slug', current: 'dgca-navigator-certification' },
    description: 'Specialized preparation for DGCA Navigator examination. Covers radio navigation, inertial navigation systems, performance-based navigation, and modern aviation navigation technologies. Includes practical training on latest navigation equipment.',
    price: 35000,
    region: 'DGCA',
    isActive: true,
    orderIndex: 5
  },
  {
    _type: 'course',
    title: 'FAA Instrument Rating',
    slug: { _type: 'slug', current: 'faa-instrument-rating' },
    description: 'Prepare for FAA Instrument Rating practical test. Comprehensive coverage of IFR procedures, instrument approaches, airway navigation, and instrument flight planning. Learn to fly in instrument meteorological conditions (IMC).',
    price: 30000,
    region: 'FAA',
    isActive: true,
    orderIndex: 6
  }
]

// Instructors data
const instructors = [
  {
    _type: 'instructor',
    name: 'Capt. Rajesh Kumar',
    bio: 'Former Indian Air Force pilot with 25+ years of experience. Ex-DGCA examiner with extensive teaching experience in aviation ground school.',
    specialties: ['DGCA Exams', 'Navigation', 'Air Regulations']
  },
  {
    _type: 'instructor',
    name: 'Capt. Sarah Mitchell',
    bio: 'FAA Designated Pilot Examiner with 15 years of commercial aviation experience. Specialized in flight training and written exam preparation.',
    specialties: ['FAA PPL', 'FAA IR', 'Commercial Pilot']
  },
  {
    _type: 'instructor',
    name: 'Capt. Hans Mueller',
    bio: 'EASA ATPL instructor with 20 years experience in European aviation. Former Airbus captain with extensive theoretical knowledge.',
    specialties: ['EASA ATPL', 'EASA CPL', 'Performance']
  }
]

// FAQs data
const faqs = [
  {
    _type: 'faq',
    question: 'What is the eligibility criteria for DGCA AME course?',
    answer: 'Candidates must have completed 10+2 with Physics and Mathematics with minimum 50% marks. Age limit is 17-25 years for fresh candidates.',
    category: 'general',
    order: 1
  },
  {
    _type: 'faq',
    question: 'How long does it take to complete DGCA AME course?',
    answer: 'The DGCA AME course typically takes 2-4 years depending on the training institute and category of license pursued.',
    category: 'general',
    order: 2
  },
  {
    _type: 'faq',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and EMI options. Razorpay secure payment gateway ensures safe transactions.',
    category: 'payments',
    order: 1
  },
  {
    _type: 'faq',
    question: 'Is there a refund policy?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with the course content, you can request a full refund within 30 days of purchase.',
    category: 'payments',
    order: 2
  },
  {
    _type: 'faq',
    question: 'What is MCP examination pattern?',
    answer: 'MCP (Multiple Choice Paper) exams use negative marking. For DGCA, there is 0.25 negative marking for each wrong answer. Passing marks are 70%.',
    category: 'exams',
    order: 1
  },
  {
    _type: 'faq',
    question: 'How many attempts are allowed for DGCA exams?',
    answer: 'There is no limit on the number of attempts for DGCA written exams. However, practical exams have specific validity periods.',
    category: 'exams',
    order: 2
  },
  {
    _type: 'faq',
    question: 'How do I get my certificate after completion?',
    answer: 'Upon completing all course requirements and passing examinations, you can download your certificate from the dashboard. Certificates include QR code for verification.',
    category: 'certificates',
    order: 1
  },
  {
    _type: 'faq',
    question: 'Are the certificates recognized internationally?',
    answer: 'Certificates are issued following DGCA/FAA/EASA guidelines. Recognition depends on the issuing authority and destination country\'s aviation regulations.',
    category: 'certificates',
    order: 2
  }
]

// Announcements
const announcements = [
  {
    _type: 'announcement',
    title: 'New DGCA AME Batch Starting Soon',
    content: 'We are launching a new batch for DGCA AME preparation. Limited seats available. Early bird discount of 10% for registrations before March 31st.',
    isPublished: true,
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'announcement',
    title: 'Updated FAA Written Exam Pattern',
    content: 'FAA has updated some question patterns for PPL and IR written exams. Our course content has been updated accordingly.',
    isPublished: true,
    publishedAt: new Date().toISOString()
  }
]

async function seed() {
  console.log('🚀 Starting Sanity Data Seeding...')
  
  try {
    // Create instructors first
    console.log('📝 Creating instructors...')
    const instructorIds = []
    for (const instructor of instructors) {
      const result = await client.create(instructor)
      instructorIds.push(result._id)
      console.log(`  ✅ Created instructor: ${instructor.name}`)
    }
    
    // Create courses
    console.log('📝 Creating courses...')
    const courseIds = []
    for (const course of courses) {
      const result = await client.create(course)
      courseIds.push({ id: result._id, slug: course.slug.current })
      console.log(`  ✅ Created course: ${course.title}`)
    }
    
    // Create FAQs
    console.log('📝 Creating FAQs...')
    for (const faq of faqs) {
      await client.create(faq)
      console.log(`  ✅ Created FAQ: ${faq.question}`)
    }
    
    // Create Announcements
    console.log('📝 Creating announcements...')
    for (const announcement of announcements) {
      await client.create(announcement)
      console.log(`  ✅ Created announcement: ${announcement.title}`)
    }
    
    console.log('\n✅ Data seeding completed successfully!')
    console.log(`   - ${courses.length} courses created`)
    console.log(`   - ${instructors.length} instructors created`)
    console.log(`   - ${faqs.length} FAQs created`)
    console.log(`   - ${announcements.length} announcements created`)
    
  } catch (error) {
    console.error('❌ Error seeding data:', error.message)
    process.exit(1)
  }
}

// Check if token is available
if (!process.env.SANITY_TOKEN) {
  console.log('⚠️  Warning: SANITY_TOKEN not found in environment variables')
  console.log('   Create a token at: https://www.sanity.io/manage')
  console.log('   Add to .env.local: SANITY_TOKEN=your_token_here')
  console.log('\n   For now, please add content manually via Sanity Studio:')
  console.log('   https://aviation-academy.vercel.app/studio')
  process.exit(0)
}

seed()
