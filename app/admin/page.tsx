'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  SaladOfTheDay,
  DessertOfTheDay,
  WaiterAllocation,
  SOSMessage,
  FloorMessage,
  ItemLocation,
} from '@/types'

export default function AdminPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('salad')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  )

  // Form states
  const [salad, setSalad] = useState<SaladOfTheDay>({
    id: '1',
    name: '',
    description: '',
    price: '',
    ingredients: [],
  })
  const [dessert, setDessert] = useState<DessertOfTheDay>({
    id: '1',
    name: '',
    description: '',
    price: '',
  })
  const [sosMessage, setSosMessage] = useState<Partial<SOSMessage>>({
    type: 'location',
    priority: 'medium',
    title: '',
    message: '',
    location: '',
  })
  const [floorMessage, setFloorMessage] = useState<Partial<FloorMessage>>({
    type: 'update',
    priority: 'medium',
    message: '',
    section: 'All',
  })
  const [itemLocation, setItemLocation] = useState<Partial<ItemLocation>>({
    item: '',
    location: '',
    section: 'Storage',
  })
  const [menuFile, setMenuFile] = useState<File | null>(null)
  const [menuName, setMenuName] = useState('')
  const [menuType, setMenuType] = useState<'brunch' | 'dinner' | 'lunch' | 'special'>('brunch')
  const [uploading, setUploading] = useState(false)

  const handleSave = async (endpoint: string, data: any) => {
    setLoading(true)
    setMessage(null)
    try {
      const response = await fetch(`/api/admin/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to save')
      setMessage({ type: 'success', text: 'Saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
      return true
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save. Please try again.' })
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleSOSSubmit = async () => {
    if (!sosMessage.title || !sosMessage.message) {
      setMessage({ type: 'error', text: 'Please fill in title and message' })
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      const response = await fetch('/api/admin/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sosMessage,
          createdBy: 'Admin', // You can make this dynamic later
        }),
      })
      if (!response.ok) throw new Error('Failed to post SOS message')
      
      setMessage({ type: 'success', text: 'SOS message posted successfully!' })
      
      // Clear form fields
      setSosMessage({
        type: 'location',
        priority: 'medium',
        title: '',
        message: '',
        location: '',
      })
      
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to post SOS message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleFloorMessageSubmit = async () => {
    if (!floorMessage.message) {
      setMessage({ type: 'error', text: 'Please enter a message' })
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      const response = await fetch('/api/admin/floor-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(floorMessage),
      })
      if (!response.ok) throw new Error('Failed to post floor message')
      
      setMessage({ type: 'success', text: 'Floor message posted successfully!' })
      
      // Clear form fields
      setFloorMessage({
        type: 'update',
        priority: 'medium',
        message: '',
        section: 'All',
      })
      
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to post floor message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-8">
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
              <p className="text-primary-100 text-sm">
                Update briefing information and manage floor communications
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              View Briefing
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-6 max-w-4xl">
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-400'
                : 'bg-red-100 text-red-800 border border-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-4">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'salad', label: '🥗 Salad of Day' },
              { id: 'dessert', label: '🍰 Dessert of Day' },
              { id: 'menu', label: '📋 Upload Menu' },
              { id: 'sos', label: '🆘 SOS Message' },
              { id: 'floor', label: '📢 Floor Update' },
              { id: 'location', label: '📍 Item Location' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold text-sm transition ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Salad Form */}
        {activeTab === 'salad' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Update Salad of the Day</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={salad.name}
                  onChange={(e) => setSalad({ ...salad, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Pear, Walnuts, Gorgonzola, Arugula"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  value={salad.description}
                  onChange={(e) => setSalad({ ...salad, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Describe the salad..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Price</label>
                <input
                  type="text"
                  value={salad.price}
                  onChange={(e) => setSalad({ ...salad, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., R135 / R250"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  value={salad.ingredients?.join(', ') || ''}
                  onChange={(e) =>
                    setSalad({
                      ...salad,
                      ingredients: e.target.value.split(',').map((i) => i.trim()),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Pear, Walnuts, Gorgonzola, Arugula"
                />
              </div>
              <button
                onClick={() => handleSave('salad', salad)}
                disabled={loading}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Salad'}
              </button>
            </div>
          </div>
        )}

        {/* Dessert Form */}
        {activeTab === 'dessert' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Update Dessert of the Day</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={dessert.name}
                  onChange={(e) => setDessert({ ...dessert, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Tiramisu"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  value={dessert.description}
                  onChange={(e) => setDessert({ ...dessert, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Describe the dessert..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Price</label>
                <input
                  type="text"
                  value={dessert.price}
                  onChange={(e) => setDessert({ ...dessert, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., R120"
                />
              </div>
              <button
                onClick={() => handleSave('dessert', dessert)}
                disabled={loading}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Dessert'}
              </button>
            </div>
          </div>
        )}

        {/* Menu Upload Form */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Upload Menu for Floor Personnel</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Menu Name</label>
                <input
                  type="text"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., New Brunch Menu, Summer Menu 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Menu Type</label>
                <select
                  value={menuType}
                  onChange={(e) => setMenuType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="brunch">Brunch</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="special">Special</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Menu Image/PDF</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setMenuFile(file)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported: JPG, PNG, PDF (Max 10MB)
                </p>
                {menuFile && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Selected: {menuFile.name} ({(menuFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <button
                onClick={async () => {
                  if (!menuFile || !menuName) {
                    setMessage({ type: 'error', text: 'Please fill all fields and select a file' })
                    return
                  }
                  setUploading(true)
                  setMessage(null)
                  try {
                    const formData = new FormData()
                    formData.append('file', menuFile)
                    formData.append('name', menuName)
                    formData.append('type', menuType)

                    const response = await fetch('/api/admin/menu', {
                      method: 'POST',
                      body: formData,
                    })
                    if (!response.ok) throw new Error('Failed to upload')
                    setMessage({ type: 'success', text: 'Menu uploaded successfully!' })
                    setMenuFile(null)
                    setMenuName('')
                    setTimeout(() => setMessage(null), 3000)
                  } catch (error) {
                    setMessage({ type: 'error', text: 'Failed to upload menu. Please try again.' })
                  } finally {
                    setUploading(false)
                  }
                }}
                disabled={uploading || !menuFile || !menuName}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Menu'}
              </button>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Uploaded menus will be visible to all floor personnel on the briefing page.
                  They can view it in full screen for easy reference.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SOS Message Form */}
        {activeTab === 'sos' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Create SOS Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Type</label>
                <select
                  value={sosMessage.type}
                  onChange={(e) =>
                    setSosMessage({ ...sosMessage, type: e.target.value as any })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="location">📍 Location</option>
                  <option value="request">🆘 Request</option>
                  <option value="alert">⚠️ Alert</option>
                  <option value="bottleneck">🚨 Bottleneck</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Priority</label>
                <select
                  value={sosMessage.priority}
                  onChange={(e) =>
                    setSosMessage({ ...sosMessage, priority: e.target.value as any })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={sosMessage.title}
                  onChange={(e) => setSosMessage({ ...sosMessage, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Need napkins urgently"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea
                  value={sosMessage.message}
                  onChange={(e) => setSosMessage({ ...sosMessage, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Detailed message..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Location (optional)</label>
                <input
                  type="text"
                  value={sosMessage.location}
                  onChange={(e) => setSosMessage({ ...sosMessage, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Storage room, shelf 3"
                />
              </div>
              <button
                onClick={handleSOSSubmit}
                disabled={loading || !sosMessage.title || !sosMessage.message}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post SOS Message'}
              </button>
            </div>
          </div>
        )}

        {/* Floor Message Form */}
        {activeTab === 'floor' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Post Floor Update</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Type</label>
                <select
                  value={floorMessage.type}
                  onChange={(e) =>
                    setFloorMessage({ ...floorMessage, type: e.target.value as any })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="update">📢 Update</option>
                  <option value="warning">⚠️ Warning</option>
                  <option value="info">ℹ️ Info</option>
                  <option value="bottleneck">🚨 Bottleneck</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Section</label>
                <select
                  value={floorMessage.section}
                  onChange={(e) =>
                    setFloorMessage({ ...floorMessage, section: e.target.value as any })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="All">All Sections</option>
                  <option value="MDA">MDA</option>
                  <option value="Outside">Outside</option>
                  <option value="Library">Library</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Priority</label>
                <select
                  value={floorMessage.priority}
                  onChange={(e) =>
                    setFloorMessage({ ...floorMessage, priority: e.target.value as any })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea
                  value={floorMessage.message}
                  onChange={(e) => setFloorMessage({ ...floorMessage, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="e.g., Table 12 needs immediate attention - guest waiting"
                />
              </div>
              <button
                onClick={handleFloorMessageSubmit}
                disabled={loading || !floorMessage.message}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Floor Update'}
              </button>
            </div>
          </div>
        )}

        {/* Item Location Form */}
        {activeTab === 'location' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Add Item Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Item Name</label>
                <input
                  type="text"
                  value={itemLocation.item}
                  onChange={(e) => setItemLocation({ ...itemLocation, item: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Napkins, Candles, Cutlery"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={itemLocation.location}
                  onChange={(e) =>
                    setItemLocation({ ...itemLocation, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Storage room, shelf 3, top drawer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Section</label>
                <select
                  value={itemLocation.section}
                  onChange={(e) =>
                    setItemLocation({ ...itemLocation, section: e.target.value as any })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Storage">Storage</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="MDA">MDA</option>
                  <option value="Outside">Outside</option>
                  <option value="Library">Library</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Quantity (optional)</label>
                <input
                  type="text"
                  value={itemLocation.quantity}
                  onChange={(e) =>
                    setItemLocation({ ...itemLocation, quantity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 2 boxes, 50 units"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Notes (optional)</label>
                <textarea
                  value={itemLocation.notes}
                  onChange={(e) => setItemLocation({ ...itemLocation, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Additional notes..."
                />
              </div>
              <button
                onClick={() => handleSave('item-location', itemLocation)}
                disabled={loading}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Add Item Location'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

