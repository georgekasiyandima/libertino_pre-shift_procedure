'use client'

import { SOSMessage } from '@/types'
import { format, formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

interface SOSMessagingProps {
  messages: SOSMessage[]
  onResolve?: (id: string) => void
}

const priorityColors = {
  low: 'bg-blue-100 border-blue-300 text-blue-800',
  medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  high: 'bg-orange-100 border-orange-300 text-orange-800',
  urgent: 'bg-red-100 border-red-400 text-red-900',
}

const typeIcons = {
  location: '📍',
  request: '🆘',
  alert: '⚠️',
  bottleneck: '🚨',
}

export default function SOSMessaging({ messages, onResolve }: SOSMessagingProps) {
  const [filter, setFilter] = useState<'all' | 'active'>('active')

  if (!messages || messages.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🆘</span>
          SOS Messages
        </h2>
        <p className="text-gray-500 text-sm">No active SOS messages.</p>
      </section>
    )
  }

  const activeMessages = messages.filter((m) => !m.resolved)
  const displayMessages = filter === 'active' ? activeMessages : messages

  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-red-500">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">🆘</span>
          SOS Messages
          {activeMessages.length > 0 && (
            <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {activeMessages.length} Active
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-xs rounded ${
              filter === 'active'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded ${
              filter === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-3 border-2 ${
              priorityColors[message.priority]
            } ${message.resolved ? 'opacity-60' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start space-x-2 flex-1">
                <span className="text-2xl">{typeIcons[message.type]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm">{message.title}</h3>
                    <span className="text-xs font-bold uppercase px-2 py-0.5 bg-white/50 rounded">
                      {message.priority}
                    </span>
                  </div>
                  <p className="text-sm mb-1">{message.message}</p>
                  {message.location && (
                    <p className="text-xs font-semibold mt-1">
                      📍 Location: {message.location}
                    </p>
                  )}
                </div>
              </div>
              {!message.resolved && onResolve && (
                <button
                  onClick={() => onResolve(message.id)}
                  className="ml-2 bg-white text-red-600 px-3 py-1 rounded text-xs font-semibold hover:bg-red-50 transition"
                >
                  Resolve
                </button>
              )}
            </div>
            <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-current/20">
              <span>
                By {message.createdBy} •{' '}
                {formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {message.resolved && message.resolvedAt && (
                <span className="text-green-700 font-semibold">
                  ✓ Resolved {format(new Date(message.resolvedAt), 'h:mm a')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


