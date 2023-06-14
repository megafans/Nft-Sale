import React from 'react'

export const Skeleton = () => (
  <div className="w-full h-full p-4 border border-gray-600 rounded-md mx-auto">
    <div className="flex animate-pulse flex-row items-center h-full justify-center">
      <div className="flex flex-col space-y-3">
        <div className="w-64 bg-gray-600 h-56 rounded-md "></div>
        <div className="w-8 bg-gray-600 h-8 rounded-full "></div>
        <div className="w-48 bg-gray-600 h-4 rounded-md "></div>
      </div>
    </div>
  </div>
)
