"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Animated,
  Switch,
  Dimensions,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import * as Haptics from "expo-haptics"
import type { Task } from "./types"
import { TaskItem } from "./components/TaskItem"
import { EmptyState } from "./components/EmptyState"
import { TaskModal } from "./components/TaskModal"
import { getTheme } from "./theme"

const { width } = Dimensions.get("window")

export default function App() {
  const systemColorScheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark")
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputText, setInputText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  const theme = getTheme(isDarkMode)

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  useEffect(() => {
    setIsDarkMode(systemColorScheme === "dark")
  }, [systemColorScheme])

  const addTask = (title: string, description?: string) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    // Haptic feedback for adding task
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      description: description?.trim() || undefined,
      completed: false,
      createdAt: new Date(),
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
    setInputText("")
  }

  const editTask = (id: string, title: string, description?: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: title.trim(), description: description?.trim() || undefined }
          : task
      )
    )
  }

  const toggleTask = (id: string) => {
    // Haptic feedback for toggle
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    // Haptic feedback for delete
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleAddPress = () => {
    if (inputText.trim()) {
      setModalMode("add")
      setEditingTask(null)
      setModalVisible(true)
    }
  }

  const handleQuickAdd = () => {
    addTask(inputText)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setModalMode("edit")
    setModalVisible(true)
  }

  const handleModalSave = (title: string, description: string) => {
    if (modalMode === "add") {
      addTask(title, description)
    } else if (modalMode === "edit" && editingTask) {
      editTask(editingTask.id, title, description)
    }
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditingTask(null)
  }

  const toggleTheme = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    setIsDarkMode(!isDarkMode)
  }

  const isAddDisabled = !inputText.trim()
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length

  const dynamicStyles = createDynamicStyles(theme)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Tasks</Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                {totalTasks === 0
                  ? "No tasks yet"
                  : `${completedTasks}/${totalTasks} completed`}
              </Text>
            </View>
            <View style={styles.themeToggle}>
              <Text style={[styles.themeLabel, { color: theme.colors.textSecondary }]}>
                {isDarkMode ? "🌙" : "☀️"}
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
                thumbColor={isDarkMode ? "#FFFFFF" : "#FFFFFF"}
                ios_backgroundColor="#E5E7EB"
              />
            </View>
          </View>
          
          {totalTasks > 0 && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(completedTasks / totalTasks) * 100}%`,
                      backgroundColor: theme.colors.success,
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </View>

        {/* Task List */}
        <View style={styles.listContainer}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TaskItem
                task={item}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={handleEditTask}
                theme={theme}
                index={index}
              />
            )}
            ListEmptyComponent={() => <EmptyState theme={theme} />}
            contentContainerStyle={tasks.length === 0 ? styles.emptyListContent : styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}
          />
        </View>

        {/* Input Bar */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={styles.inputBar}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholder="What needs to be done?"
                placeholderTextColor={theme.colors.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleAddPress}
                returnKeyType="done"
                accessibilityLabel="Task input field"
                accessibilityHint="Enter a task description and press Add"
                multiline={false}
                maxLength={200}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: isAddDisabled ? theme.colors.primaryDisabled : theme.colors.primary,
                },
                isAddDisabled && styles.addButtonDisabled,
              ]}
              onPress={handleAddPress}
              disabled={isAddDisabled}
              accessibilityLabel="Add task"
              accessibilityRole="button"
              accessibilityState={{ disabled: isAddDisabled }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.addButtonText,
                  {
                    color: isAddDisabled ? theme.colors.textDisabled : "#FFFFFF",
                  },
                ]}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>

      {/* Task Modal */}
      <TaskModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSave={handleModalSave}
        theme={theme}
        task={editingTask}
        mode={modalMode}
      />
    </SafeAreaView>
  )
}

const createDynamicStyles = (theme: any) =>
  StyleSheet.create({
    // Dynamic styles based on theme can be added here if needed
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  themeLabel: {
    fontSize: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    paddingBottom: 20,
  },
  emptyListContent: {
    flex: 1,
  },
  inputContainer: {
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBar: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-end",
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  textInput: {
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
})