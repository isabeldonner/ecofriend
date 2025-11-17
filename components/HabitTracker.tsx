import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { HabitCard } from "./HabitCard";

const habits = [
  {
    id: 1,
    title: "Miles Driven",
    icon: "🚗",
    current: 45,
    goal: 200,
    unit: "miles",
    color: "#EF4444",
    impact: "15 lbs CO₂ saved",
    showCircular: false,
  },
  {
    id: 2,
    title: "Recycled This Week",
    icon: "♻️",
    current: 12,
    goal: 20,
    unit: "lbs",
    color: "#22C55E",
    impact: "8 lbs waste diverted",
    showCircular: true,
  },
  {
    id: 3,
    title: "Energy Saved",
    icon: "⚡",
    current: 75,
    goal: 100,
    unit: "kWh",
    color: "#EAB308",
    impact: "55 lbs CO₂ reduced",
    showCircular: false,
  },
  {
    id: 4,
    title: "Water Conservation",
    icon: "💧",
    current: 320,
    goal: 500,
    unit: "gallons",
    color: "#3B82F6",
    impact: "320 gallons saved",
    showCircular: true,
  },
  {
    id: 5,
    title: "Reusable Bags Used",
    icon: "🛍️",
    current: 8,
    goal: 10,
    unit: "bags",
    color: "#A855F7",
    impact: "8 plastic bags avoided",
    showCircular: false,
  },
  {
    id: 6,
    title: "Plant-Based Meals",
    icon: "🌿",
    current: 14,
    goal: 21,
    unit: "meals",
    color: "#10B981",
    impact: "28 lbs CO₂ saved",
    showCircular: true,
  },
];

export function HabitTracker() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const totalCO2Saved = 106;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <View style={styles.statContent}>
              <View style={[styles.iconCircle, { backgroundColor: '#22C55E' }]}>
                <Text style={styles.iconText}>📈</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Total CO₂ Saved</Text>
                <Text style={[styles.statValue, { color: '#22C55E' }]}>
                  {totalCO2Saved} lbs
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FFF7ED' }]}>
            <View style={styles.statContent}>
              <View style={[styles.iconCircle, { backgroundColor: '#F97316' }]}>
                <Text style={styles.iconText}>🔥</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Current Streak</Text>
                <Text style={[styles.statValue, { color: '#F97316' }]}>
                  {currentStreak} days
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <View style={styles.statContent}>
              <View style={[styles.iconCircle, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.iconText}>📅</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>This Week</Text>
                <Text style={[styles.statValue, { color: '#3B82F6' }]}>6/6</Text>
                <Text style={styles.statSubLabel}>habits tracked</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Section Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your Environmental Habits</Text>
            <Text style={styles.sectionSubtitle}>
              Track your daily actions and see your positive impact
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>This Week</Text>
          </View>
        </View>

        {/* Habits Grid */}
        <View style={styles.habitsGrid}>
          {habits.map((habit) => (
            <HabitCard key={habit.id} {...habit} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.quickActionsTitle}>Quick Log</Text>
          <View style={styles.quickActionsButtons}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>♻️</Text>
              <Text style={styles.quickActionText}>Log Recycling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🚗</Text>
              <Text style={styles.quickActionText}>Add Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🌿</Text>
              <Text style={styles.quickActionText}>Log Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🛍️</Text>
              <Text style={styles.quickActionText}>Used Bag</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Impact Summary */}
        <View style={styles.impactCard}>
          <Text style={styles.impactTitle}>🌍 Your Impact This Month</Text>
          <Text style={styles.impactSubtitle}>
            You're making a real difference! Keep up the great work.
          </Text>
          <View style={styles.impactStats}>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatLabel}>CO₂ Reduced</Text>
              <Text style={styles.impactStatValue}>106 lbs</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatLabel}>Waste Diverted</Text>
              <Text style={styles.impactStatValue}>48 lbs</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatLabel}>Water Saved</Text>
              <Text style={styles.impactStatValue}>1,280 gal</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatLabel}>Trees Equivalent</Text>
              <Text style={styles.impactStatValue}>2.3 🌲</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  statsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statSubLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
  },
  habitsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  quickActionsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  quickActionsButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  quickActionIcon: {
    fontSize: 16,
  },
  quickActionText: {
    fontSize: 14,
    color: '#374151',
  },
  impactCard: {
    backgroundColor: '#10B981',
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  impactSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
    marginBottom: 20,
  },
  impactStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  impactStat: {
    flex: 1,
    minWidth: '40%',
  },
  impactStatLabel: {
    fontSize: 12,
    color: '#D1FAE5',
    marginBottom: 4,
  },
  impactStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
