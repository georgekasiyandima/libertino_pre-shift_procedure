'use client'

import { FloorMessage } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { useState, useEffect } from 'react'

interface FloorMessagesProps {
  messages: FloorMessage[]
}

const typeColors = {
  update: 'bg-blue-50 border-blue-300 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  info: 'bg-green-50 border-green-300 text-green-800',
  bottleneck: 'bg-red-50 border-red-300 text-red-800',
}

const typeIcons = {
  update: '📢',
  warning: '⚠️',
  info: 'ℹ️',
  bottleneck: '🚨',
}

export default function FloorMessages({ messages }: FloorMessagesProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  if (!messages || messages.length === 0) {
    return null
  }

  // Filter active messages (not expired)
  const activeMessages = messages.filter((msg) => {
    if (msg.expiresAt) {
      return new Date(msg.expiresAt) > currentTime
    }
    return true
  })

  if (activeMessages.length === 0) {
    return null
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-indigo-500">
      <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">📢</span>
        Real-Time Floor Updates
        <span className="ml-auto text-sm font-normal text-gray-500">
          Live
        </span>
      </h2>
      <div className="space-y-2">
        {activeMessages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-3 border-2 ${typeColors[message.type]} animate-pulse`}
          >
            <div className="flex items-start space-x-2">
              <span className="text-xl">{typeIcons[message.type]}</span>
              <div className="flex-1">
                {message.section && message.section !== 'All' && (
                  <span className="text-xs font-bold uppercase bg-white/50 px-2 py-0.5 rounded mb-1 inline-block">
                    {message.section}
                  </span>
                )}
                <p className="text-sm font-medium">{message.message}</p>
                <p className="text-xs mt-1 opacity-75">
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600 flex items-center">
          <span className="mr-2">💡</span>
          <strong>Tip:</strong> Check this section regularly during rush for real-time updates
        </p>
      </div>
    </section>
  )
}


