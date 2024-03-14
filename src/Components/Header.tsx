import Image from 'next/image'
import React from 'react'
import userIcon from "@/images/user.svg"

export default function Header() {
  return (
    <div className="h-20 flex items-center justify-between pl-4 pr-4 text-white bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="text-3xl font-bold">Dashboard</div>
      <div className="flex items-center">
        <div className="mr-3">
          <div>
            <span >Username</span>
          </div>
          <div>
            <span className="flex justify-center text-xs cursor-pointer hover:text-black">Logout</span>
          </div>
        </div>
        <Image alt='' src={userIcon} />
      </div>
    </div>
  )
}
