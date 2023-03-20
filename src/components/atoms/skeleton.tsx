import React from 'react'

export const Skeleton = () => (
  <div className="w-60 h-auto p-4 border border-gray-600 rounded-md mx-auto">
    <div className="flex animate-pulse flex-row items-center h-full justify-center">
      <div className="flex flex-col space-y-3">
        <div className="w-48 bg-gray-600 h-32 rounded-md "></div>
        <div className="w-48 bg-gray-600 h-4 rounded-md "></div>
        <div className="w-36 bg-gray-600 h-4 rounded-md "></div>
      </div>
    </div>
  </div>
)
