import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircularProgress } from "./CircularProgress";

interface HabitCardProps {
  title: string;
  icon: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
  impact: string;
  showCircular?: boolean;
}

export function HabitCard({
  title,
  icon,
  current,
  goal,
  unit,
  color,
  impact,
  showCircular = false,
}: HabitCardProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.impact}>{impact}</Text>
          </View>
        </View>
      </View>

      {showCircular ? (
        <View style={styles.circularContainer}>
          <CircularProgress percentage={percentage} color={color}>
            <View style={styles.circularContent}>
              <Text style={[styles.currentValue, { color }]}>{current}</Text>
              <Text style={styles.goalText}>of {goal}</Text>
            </View>
          </CircularProgress>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
      ) : (
        <View style={styles.progressContainer}>
          <View style={styles.valuesRow}>
            <Text style={[styles.currentLarge, { color }]}>
              {current} {unit}
            </Text>
            <Text style={styles.goalSmall}>
              Goal: {goal} {unit}
            </Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: `${color}20` }]}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percentage}%`, backgroundColor: color },
              ]}
            />
          </View>
          <Text style={[styles.percentageText, { color }]}>
            {percentage.toFixed(0)}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  impact: {
    fontSize: 13,
    color: '#6B7280',
  },
  circularContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  circularContent: {
    alignItems: 'center',
  },
  currentValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 12,
    color: '#6B7280',
  },
  unitText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    gap: 8,
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  currentLarge: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goalSmall: {
    fontSize: 13,
    color: '#6B7280',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
  },
});
