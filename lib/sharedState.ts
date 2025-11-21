// Shared state for API routes
// This ensures all routes access the same data instances

import { SOSMessage, FloorMessage, Menu } from '@/types'

// SOS Messages
export const sosMessagesStore: SOSMessage[] = []

// Floor Messages
export const floorMessagesStore: FloorMessage[] = []

// Helper functions
export function addSOSMessage(message: SOSMessage) {
  sosMessagesStore.unshift(message)
}

export function getSOSMessages() {
  return sosMessagesStore.filter((msg) => !msg.resolved)
}

export function resolveSOSMessage(id: string) {
  const message = sosMessagesStore.find((m) => m.id === id)
  if (message) {
    message.resolved = true
    message.resolvedAt = new Date().toISOString()
  }
}

export function addFloorMessage(message: FloorMessage) {
  floorMessagesStore.unshift(message)
  // Keep only last 20 messages
  if (floorMessagesStore.length > 20) {
    floorMessagesStore.splice(20)
  }
}

export function getFloorMessages() {
  return floorMessagesStore
}

// Menu storage
export let currentMenuStore: Menu | null = null

export function setCurrentMenu(menu: Menu | null) {
  currentMenuStore = menu
}

export function getCurrentMenu() {
  return currentMenuStore
}

