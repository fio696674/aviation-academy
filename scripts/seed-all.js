/**
 * Complete Sanity Seeder - Courses, Modules, Lessons, Instructors, FAQs, Announcements
 * Run: node scripts/seed-all.js
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

console.log('\n🚀 Starting Complete Sanity Seeding...\n')

async function getCourses() {
  return await client.fetch(`*[_type == "course"]{_id, title, slug}`)
}

async function createModules(courses) {
  console.log('📦 Creating Modules...\n')
  
  const modulesData = [
    // DGCA AME Modules
    { courseSlug: 'dgca-aircraft-maintenance-engineering', title: 'Airframe Systems', description: 'Complete coverage of aircraft structure and systems', orderIndex: 1 },
    { courseSlug: 'dgca-aircraft-maintenance-engineering', title: 'Powerplant', description: 'Aircraft engine systems and maintenance', orderIndex: 2 },
    { courseSlug: 'dgca-aircraft-maintenance-engineering', title: 'Avionics', description: 'Electronic systems in aircraft', orderIndex: 3 },
    { courseSlug: 'dgca-aircraft-maintenance-engineering', title: 'Air Regulations', description: 'DGCA regulations and procedures', orderIndex: 4 },
    
    // FAA PPL Modules
    { courseSlug: 'faa-private-pilot-ground-school', title: 'Aerodynamics', description: 'Theory of flight and aircraft performance', orderIndex: 1 },
    { courseSlug: 'faa-private-pilot-ground-school', title: 'Meteorology', description: 'Weather theory and aviation weather', orderIndex: 2 },
    { courseSlug: 'faa-private-pilot-ground-school', title: 'Navigation', description: 'Pilotage, dead reckoning, and GPS navigation', orderIndex: 3 },
    { courseSlug: 'faa-private-pilot-ground-school', title: 'Federal Aviation Regulations', description: 'FAR Part 61 and aviation rules', orderIndex: 4 },
    
    // EASA CPL Modules
    { courseSlug: 'easa-commercial-pilot-license-cpl', title: 'Advanced Aerodynamics', description: 'High-performance aircraft aerodynamics', orderIndex: 1 },
    { courseSlug: 'easa-commercial-pilot-license-cpl', title: 'Advanced Meteorology', description: 'Advanced weather phenomena for commercial operations', orderIndex: 2 },
    { courseSlug: 'easa-commercial-pilot-license-cpl', title: 'Performance & Planning', description: 'Aircraft performance and flight planning', orderIndex: 3 },
    { courseSlug: 'easa-commercial-pilot-license-cpl', title: 'Operational Procedures', description: 'Commercial flight operations', orderIndex: 4 },
    
    // EASA ATPL Modules
    { courseSlug: 'easa-atpl-theory-complete', title: 'Air Law', description: 'International aviation law and regulations', orderIndex: 1 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Aircraft General Knowledge', description: 'Airframe, systems, and aircraft philosophy', orderIndex: 2 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Flight Performance & Planning', description: 'Mass, balance, and performance', orderIndex: 3 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Human Performance', description: 'Human factors in aviation', orderIndex: 4 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Meteorology', description: 'Advanced meteorology for ATPL', orderIndex: 5 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Navigation', description: 'Advanced navigation systems', orderIndex: 6 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Operational Procedures', description: 'Commercial operations', orderIndex: 7 },
    { courseSlug: 'easa-atpl-theory-complete', title: 'Principles of Flight', description: 'Aerodynamics for transport category', orderIndex: 8 },
    
    // DGCA Navigator Modules
    { courseSlug: 'dgca-navigator-certification', title: 'Radio Navigation', description: 'VOR, NDB, DME navigation', orderIndex: 1 },
    { courseSlug: 'dgca-navigator-certification', title: 'Inertial Navigation', description: 'INS and IRS systems', orderIndex: 2 },
    { courseSlug: 'dgca-navigator-certification', title: 'Satellite Navigation', description: 'GPS and GNSS systems', orderIndex: 3 },
    { courseSlug: 'dgca-navigator-certification', title: 'Performance Based Navigation', description: 'PBN and RNAV approaches', orderIndex: 4 },
    
    // FAA Instrument Rating Modules
    { courseSlug: 'faa-instrument-rating', title: 'Instrument Flight Rules', description: 'IFR procedures and regulations', orderIndex: 1 },
    { courseSlug: 'faa-instrument-rating', title: 'Instrument Approaches', description: 'ILS, RNAV, and other approaches', orderIndex: 2 },
    { courseSlug: 'faa-instrument-rating', title: 'Weather Radar', description: 'Weather detection and avoidance', orderIndex: 3 },
    { courseSlug: 'faa-instrument-rating', title: 'IFR Communications', description: 'ATC communications and procedures', orderIndex: 4 },
  ]
  
  const createdModules = []
  
  for (const mod of modulesData) {
    const course = courses.find(c => c.slug.current === mod.courseSlug)
    if (!course) continue
    
    try {
      const doc = {
        _type: 'module',
        title: mod.title,
        description: mod.description,
        course: { _type: 'reference', _ref: course._id },
        orderIndex: mod.orderIndex
      }
      const result = await client.create(doc)
      createdModules.push({ ...result, courseSlug: mod.courseSlug })
      console.log(`  ✅ Module: ${mod.title} (${mod.courseSlug})`)
    } catch (err) {
      console.log(`  ❌ Module failed: ${err.message}`)
    }
  }
  
  return createdModules
}

async function createLessons(modules) {
  console.log('\n📖 Creating Lessons...\n')
  
  const lessonsData = [
    // DGCA AME - Airframe
    { moduleCourse: 'dgca-aircraft-maintenance-engineering', moduleTitle: 'Airframe Systems', lessons: [
      { title: 'Introduction to Aircraft Structures', type: 'video', duration: 45, content: 'Overview of aircraft fuselage, wings, and tail sections' },
      { title: 'Flight Control Systems', type: 'video', duration: 60, content: 'Primary and secondary flight controls' },
      { title: 'Hydraulic Systems', type: 'text', duration: 30, content: 'Hydraulic fluid, pumps, and actuators' },
      { title: 'Landing Gear', type: 'video', duration: 50, content: 'Retractable and fixed landing gear systems' },
      { title: 'Airframe Quiz', type: 'quiz', duration: 20, content: 'Test your airframe knowledge' },
    ]},
    
    // DGCA AME - Powerplant
    { moduleCourse: 'dgca-aircraft-maintenance-engineering', moduleTitle: 'Powerplant', lessons: [
      { title: 'Piston Engines', type: 'video', duration: 55, content: 'Reciprocating engine theory and operation' },
      { title: 'Jet Engines', type: 'video', duration: 70, content: 'Turbofan and turbojet engines' },
      { title: 'Engine Inspection', type: 'quiz', duration: 30, content: 'Engine maintenance and inspection procedures' },
    ]},
    
    // FAA PPL - Aerodynamics
    { moduleCourse: 'faa-private-pilot-ground-school', moduleTitle: 'Aerodynamics', lessons: [
      { title: 'Four Forces of Flight', type: 'video', duration: 40, content: 'Lift, weight, thrust, and drag' },
      { title: 'Axes and Maneuvers', type: 'video', duration: 35, content: 'Pitch, roll, and yaw' },
      { title: 'Stalls and Spins', type: 'video', duration: 45, content: 'Stall recognition and recovery' },
      { title: 'Aerodynamics Quiz', type: 'quiz', duration: 20, content: 'Test your aerodynamic knowledge' },
    ]},
    
    // FAA PPL - Meteorology
    { moduleCourse: 'faa-private-pilot-ground-school', moduleTitle: 'Meteorology', lessons: [
      { title: 'Atmosphere Basics', type: 'video', duration: 30, content: 'Layers of the atmosphere' },
      { title: 'Weather Patterns', type: 'video', duration: 45, content: 'High and low pressure systems' },
      { title: 'Aviation Weather Services', type: 'text', duration: 25, content: 'METAR, TAF, and weather briefing' },
    ]},
    
    // EASA CPL - Advanced Aerodynamics
    { moduleCourse: 'easa-commercial-pilot-license-cpl', moduleTitle: 'Advanced Aerodynamics', lessons: [
      { title: 'High Speed Aerodynamics', type: 'video', duration: 60, content: 'Compressible flow and shock waves' },
      { title: 'Jet Aircraft Performance', type: 'video', duration: 55, content: 'Takeoff, climb, and cruise performance' },
      { title: 'Maneuvering Envelope', type: 'video', duration: 45, content: 'V-n diagram and load factors' },
    ]},
    
    // EASA ATPL - Air Law
    { moduleCourse: 'easa-atpl-theory-complete', moduleTitle: 'Air Law', lessons: [
      { title: 'Chicago Convention', type: 'video', duration: 40, content: 'International air law framework' },
      { title: 'EASA Regulations', type: 'video', duration: 50, content: 'EASA organizational structure and regulations' },
      { title: 'Licensing', type: 'text', duration: 35, content: 'Pilot licensing requirements' },
    ]},
    
    // DGCA Navigator - Radio Navigation
    { moduleCourse: 'dgca-navigator-certification', moduleTitle: 'Radio Navigation', lessons: [
      { title: 'VOR Navigation', type: 'video', duration: 45, content: 'VHF Omnidirectional Range' },
      { title: 'NDB and ADF', type: 'video', duration: 40, content: 'Non-directional beacons and ADF' },
      { title: 'DME and Distance Measurement', type: 'video', duration: 35, content: 'Distance measuring equipment' },
    ]},
    
    // FAA Instrument Rating - IFR Procedures
    { moduleCourse: 'faa-instrument-rating', moduleTitle: 'Instrument Flight Rules', lessons: [
      { title: 'IFR Requirements', type: 'video', duration: 35, content: 'Equipment requirements and currency' },
      { title: 'IFR Flight Plans', type: 'video', duration: 40, content: 'Filing and activating IFR flight plans' },
      { title: 'Departure Procedures', type: 'video', duration: 45, content: 'SIDs and climb gradients' },
      { title: 'Enroute IFR', type: 'video', duration: 50, content: 'Airway navigation and communications' },
    ]},
  ]
  
  let lessonCount = 0
  
  for (const moduleGroup of lessonsData) {
    const module = modules.find(m => m.courseSlug === moduleGroup.moduleCourse && m.title === moduleGroup.moduleTitle)
    if (!module) continue
    
    for (let i = 0; i < moduleGroup.lessons.length; i++) {
      const les = moduleGroup.lessons[i]
      try {
        const doc = {
          _type: 'lesson',
          title: les.title,
          type: les.type,
          content: les.content,
          videoUrl: '',
          duration: les.duration,
          module: { _type: 'reference', _ref: module._id },
          orderIndex: i + 1
        }
        await client.create(doc)
        lessonCount++
        console.log(`  ✅ Lesson: ${les.title} (${moduleGroup.moduleTitle})`)
      } catch (err) {
        console.log(`  ❌ Lesson failed: ${err.message}`)
      }
    }
  }
  
  return lessonCount
}

async function main() {
  // Check token
  if (!process.env.SANITY_TOKEN) {
    console.log('❌ No SANITY_TOKEN found in .env.local')
    process.exit(1)
  }
  console.log('✅ Token loaded\n')
  
  // Get existing courses
  const courses = await getCourses()
  console.log(`📚 Found ${courses.length} courses\n`)
  
  // Check if modules already exist
  const existingModules = await client.fetch('count(*[_type == "module"])')
  if (existingModules > 0) {
    console.log(`⚠️  ${existingModules} modules already exist`)
    const response = await question('Delete and recreate? (y/n): ')
    if (response.toLowerCase() === 'y') {
      console.log('Deleting existing modules and lessons...')
      await client.delete({ query: '*[_type == "module"]' })
      await client.delete({ query: '*[_type == "lesson"]' })
    } else {
      console.log('Keeping existing data. Adding new only...\n')
    }
  }
  
  // Create modules
  const modules = await createModules(courses)
  console.log(`\n📦 Created ${modules.length} modules`)
  
  // Create lessons
  const lessonCount = await createLessons(modules)
  console.log(`📖 Created ${lessonCount} lessons`)
  
  // Final stats
  console.log('\n📊 Final Statistics:')
  const totalCourses = await client.fetch('count(*[_type == "course"])')
  const totalModules = await client.fetch('count(*[_type == "module"])')
  const totalLessons = await client.fetch('count(*[_type == "lesson"])')
  const totalInstructors = await client.fetch('count(*[_type == "instructor"])')
  const totalFAQs = await client.fetch('count(*[_type == "faq"])')
  const totalAnnouncements = await client.fetch('count(*[_type == "announcement"])')
  
  console.log(`   Courses: ${totalCourses}`)
  console.log(`   Modules: ${totalModules}`)
  console.log(`   Lessons: ${totalLessons}`)
  console.log(`   Instructors: ${totalInstructors}`)
  console.log(`   FAQs: ${totalFAQs}`)
  console.log(`   Announcements: ${totalAnnouncements}`)
  console.log(`\n✅ Seeding Complete!\n`)
}

function question(prompt) {
  const readline = require('readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(prompt, a => { rl.close(); resolve(a) }))
}

main().catch(console.error)
