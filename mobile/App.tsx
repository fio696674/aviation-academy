import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'

// Types
interface Course {
  id: string
  title: string
  description: string
  price: number
  region: string
  thumbnail?: string
}

interface Exam {
  id: string
  title: string
  duration: number
  questions: number
  region: string
}

// Demo Data
const courses: Course[] = [
  { id: '1', title: 'DGCA AME', description: 'Aircraft Maintenance Engineering', price: 45000, region: 'DGCA' },
  { id: '2', title: 'FAA PPL', description: 'Private Pilot License', price: 25000, region: 'FAA' },
  { id: '3', title: 'EASA ATPL', description: 'Airline Transport Pilot License', price: 120000, region: 'EASA' },
]

const exams: Exam[] = [
  { id: '1', title: 'DGCA AME Mock Test', duration: 90, questions: 100, region: 'DGCA' },
  { id: '2', title: 'FAA PPL Written', duration: 120, questions: 60, region: 'FAA' },
  { id: '3', title: 'EASA ATPL Theory', duration: 135, questions: 90, region: 'EASA' },
]

const regionColors: Record<string, string> = {
  DGCA: '#3B82F6',
  FAA: '#EF4444',
  EASA: '#10B981',
}

// Screens
function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aviation Academy</Text>
        <Text style={styles.headerSubtitle}>Your aviation career starts here</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Courses</Text>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={[styles.regionBadge, { backgroundColor: regionColors[course.region] }]}>
              <Text style={styles.regionBadgeText}>{course.region}</Text>
            </View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            <View style={styles.courseFooter}>
              <Text style={styles.coursePrice}>₹{course.price.toLocaleString()}</Text>
              <Text style={styles.continueButton}>Continue →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Tests</Text>
        {exams.map((exam) => (
          <TouchableOpacity key={exam.id} style={styles.examCard}>
            <View style={styles.examInfo}>
              <Text style={styles.examTitle}>{exam.title}</Text>
              <Text style={styles.examDetails}>{exam.duration} min • {exam.questions} questions</Text>
            </View>
            <View style={[styles.examRegion, { backgroundColor: regionColors[exam.region] }]}>
              <Text style={styles.examRegionText}>{exam.region}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <StatusBar style="light" />
    </ScrollView>
  )
}

function CoursesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <Text style={styles.headerSubtitle}>Browse all available courses</Text>
      </View>

      <View style={styles.section}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.fullCourseCard}>
            <View style={styles.fullCourseContent}>
              <View style={[styles.regionBadge, { backgroundColor: regionColors[course.region] }]}>
                <Text style={styles.regionBadgeText}>{course.region}</Text>
              </View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>
              <View style={styles.courseFooter}>
                <Text style={styles.coursePrice}>₹{course.price.toLocaleString()}</Text>
                <TouchableOpacity style={styles.enrollButton}>
                  <Text style={styles.enrollButtonText}>Enroll Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

function ExamsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MCP Tests</Text>
        <Text style={styles.headerSubtitle}>Practice for your certification</Text>
      </View>

      <View style={styles.section}>
        {exams.map((exam) => (
          <TouchableOpacity key={exam.id} style={styles.examListCard}>
            <View style={styles.examListContent}>
              <View style={[styles.examRegion, { backgroundColor: regionColors[exam.region] }]}>
                <Text style={styles.examRegionText}>{exam.region}</Text>
              </View>
              <Text style={styles.examTitle}>{exam.title}</Text>
              <Text style={styles.examDetails}>{exam.duration} minutes • {exam.questions} questions</Text>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Test</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RS</Text>
        </View>
        <Text style={styles.profileName}>Rahul Sharma</Text>
        <Text style={styles.profileEmail}>rahul.sharma@email.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Tests Taken</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Certificates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Test Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

// Tab Navigator
function TabNavigator() {
  return (
    <View style={styles.tabContainer}>
      <ScrollView style={styles.tabContent}>
        <HomeScreen />
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={styles.tabLabel}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📝</Text>
          <Text style={styles.tabLabel}>Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// Main App
export default function App() {
  return (
    <TabNavigator />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tabContent: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#1E293B',
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  regionBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  courseDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  continueButton: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  enrollButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  enrollButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  examCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  examDetails: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  examRegion: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  examRegionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fullCourseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullCourseContent: {
    padding: 16,
  },
  examListCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examListContent: {
    padding: 16,
  },
  examListContent: {
    padding: 16,
  },
  startButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#1E293B',
  },
  logoutItem: {
    marginTop: 16,
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingBottom: 24,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
})
