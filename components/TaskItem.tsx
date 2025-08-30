import React, { memo, useEffect, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from "react-native"
import * as Haptics from "expo-haptics"
import type { Task } from "../types"
import type { Theme } from "../theme"

const { width } = Dimensions.get("window")

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
  theme: Theme
  index: number
}

export const TaskItem: React.FC<TaskItemProps> = memo(({ task, onToggle, onDelete, onEdit, theme, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const checkboxScale = useRef(new Animated.Value(1)).current
  const completionAnim = useRef(new Animated.Value(task.completed ? 1 : 0)).current

  useEffect(() => {
    // Entrance animation with staggered delay
    const delay = index * 100
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [index])

  useEffect(() => {
    // Completion animation
    Animated.timing(completionAnim, {
      toValue: task.completed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [task.completed])

  const handleToggle = () => {
    // Haptic feedback
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    
    // Checkbox animation
    Animated.sequence([
      Animated.timing(checkboxScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(checkboxScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    onToggle(task.id)
  }

  const handleDelete = () => {
    // Haptic feedback for delete
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    }
    
    const deleteTask = () => {
      // Exit animation
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDelete(task.id)
      })
    }

    if (Platform.OS === "web") {
      // For web, use confirm dialog
      if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
        deleteTask()
      }
    } else {
      // For mobile, use Alert
      Alert.alert(
        "Delete Task",
        `Are you sure you want to delete "${task.title}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: deleteTask,
          },
        ],
        { cancelable: true }
      )
    }
  }

  const handleEdit = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onEdit(task)
  }

  const formatDate = (date?: Date) => {
    if (!date) return ""
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
          transform: [
            { scale: scaleAnim },
            { translateX: slideAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.taskContent}
        onPress={handleToggle}
        accessibilityLabel={`${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.checkbox,
            {
              borderColor: task.completed ? theme.colors.success : theme.colors.border,
              backgroundColor: task.completed ? theme.colors.success : "transparent",
              transform: [{ scale: checkboxScale }],
            },
          ]}
        >
          {task.completed && (
            <Animated.Text
              style={[
                styles.checkmark,
                {
                  opacity: completionAnim,
                  transform: [
                    {
                      scale: completionAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              ✓
            </Animated.Text>
          )}
        </Animated.View>

        <View style={styles.taskInfo}>
          <Animated.Text
            style={[
              styles.title,
              {
                color: task.completed ? theme.colors.textSecondary : theme.colors.text,
                opacity: completionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                }),
              },
              task.completed && styles.titleCompleted,
            ]}
          >
            {task.title}
          </Animated.Text>
          
          {task.description && (
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.textSecondary,
                  opacity: task.completed ? 0.5 : 0.8,
                },
              ]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          )}
          
          {task.createdAt && (
            <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
              {formatDate(task.createdAt)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary + "15" }]}
          onPress={handleEdit}
          accessibilityLabel={`Edit task: ${task.title}`}
          accessibilityRole="button"
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>✎</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.danger + "15" }]}
          onPress={handleDelete}
          accessibilityLabel={`Delete task: ${task.title}`}
          accessibilityRole="button"
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: theme.colors.danger }]}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
})

TaskItem.displayName = "TaskItem"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    marginRight: 16,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
    fontStyle: "italic",
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
})