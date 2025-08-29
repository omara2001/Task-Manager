"use client"

import { useState } from "react"
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
} from "react-native"
import { StatusBar } from "expo-status-bar"
import type { Task } from "./types"
import { TaskItem } from "./components/TaskItem"
import { EmptyState } from "./components/EmptyState"

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputText, setInputText] = useState("")

  const addTask = (title: string) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
    setInputText("")
  }

  const toggleTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleAddPress = () => {
    addTask(inputText)
  }

  const isAddDisabled = !inputText.trim()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {tasks.length === 0 ? "No tasks" : `${tasks.length} task${tasks.length === 1 ? "" : "s"}`}
        </Text>
      </View>

      {/* Task List */}
      <View style={styles.listContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />}
          ListEmptyComponent={EmptyState}
          contentContainerStyle={tasks.length === 0 ? styles.emptyListContent : styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Input Bar */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a new task..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAddPress}
            returnKeyType="done"
            accessibilityLabel="Task input field"
            accessibilityHint="Enter a task description and press Add"
          />
          <TouchableOpacity
            style={[styles.addButton, isAddDisabled && styles.addButtonDisabled]}
            onPress={handleAddPress}
            disabled={isAddDisabled}
            accessibilityLabel="Add task"
            accessibilityRole="button"
            accessibilityState={{ disabled: isAddDisabled }}
          >
            <Text style={[styles.addButtonText, isAddDisabled && styles.addButtonTextDisabled]}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyListContent: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  inputBar: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginRight: 12,
  },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  addButtonTextDisabled: {
    color: "#9CA3AF",
  },
})
