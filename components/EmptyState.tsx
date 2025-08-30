import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import type { Theme } from "../theme"

interface EmptyStateProps {
  theme: Theme
}

export const EmptyState: React.FC<EmptyStateProps> = ({ theme }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const bounceAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous bounce animation for emoji
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    )
    
    const timer = setTimeout(() => {
      bounceAnimation.start()
    }, 1000)

    return () => {
      clearTimeout(timer)
      bounceAnimation.stop()
    }
  }, [])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.emoji,
          {
            transform: [
              {
                translateY: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      >
        📝
      </Animated.Text>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        No tasks yet
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Add your first task below to get started!
      </Text>
      <View style={styles.features}>
        <Text style={[styles.feature, { color: theme.colors.textSecondary }]}>
          ✓ Tap to mark complete
        </Text>
        <Text style={[styles.feature, { color: theme.colors.textSecondary }]}>
          ✓ Swipe or tap ✕ to delete
        </Text>
        <Text style={[styles.feature, { color: theme.colors.textSecondary }]}>
          ✓ Dark/Light mode support
        </Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    fontWeight: "500",
  },
  features: {
    alignItems: "flex-start",
    gap: 8,
  },
  feature: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
})