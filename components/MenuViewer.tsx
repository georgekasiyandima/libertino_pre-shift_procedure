'use client'

import { Menu } from '@/types'
import { format } from 'date-fns'
import { useState } from 'react'

interface MenuViewerProps {
  menu: Menu | null
}

export default function MenuViewer({ menu }: MenuViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!menu) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📋</span>
          Current Menu
        </h2>
        <p className="text-gray-500 text-sm">No menu uploaded yet.</p>
      </section>
    )
  }

  return (
    <>
      <section className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-indigo-500">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📋</span>
            Current Menu: {menu.name}
            <span className="ml-3 text-sm font-normal bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
              {menu.type.charAt(0).toUpperCase() + menu.type.slice(1)}
            </span>
          </h2>
          <button
            onClick={() => setIsFullscreen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
          >
            View Full Screen
          </button>
        </div>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={menu.imageUrl}
            alt={menu.name}
            className="w-full h-auto object-contain max-h-96"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `
                  <div class="p-8 text-center text-gray-500">
                    <p class="mb-2">Menu image not available</p>
                    ${menu.pdfUrl ? `<a href="${menu.pdfUrl}" target="_blank" class="text-indigo-600 hover:underline">View PDF instead</a>` : ''}
                  </div>
                `
              }
            }}
          />
        </div>

        <div className="mt-3 flex justify-between items-center text-xs text-gray-600">
          <span>
            Uploaded {format(new Date(menu.uploadedAt), 'MMM d, yyyy')} by {menu.uploadedBy}
          </span>
          {menu.pdfUrl && (
            <a
              href={menu.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Download PDF
            </a>
          )}
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 z-10"
            >
              Close (ESC)
            </button>
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {menu.pdfUrl && (
              <div className="mt-4 text-center">
                <a
                  href={menu.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 inline-block"
                >
                  Download PDF Version
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}


