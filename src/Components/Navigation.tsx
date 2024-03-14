"use client"
import React from 'react'
import Image from 'next/image'
import homeIcon from "@/images/home.svg"
import salesIcon from "@/images/sales.svg"
import usersIcon from "@/images/users.svg"
import subscriptionIcon from "@/images/subscription.svg"
import Link from 'next/link'

export default function Navigation() {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-blue-900 w-52 text-base text-white h-full">
        <Link href="/">
            <div className="h-13 flex items-center border-y-4 p-3 cursor-pointer hover:bg-blue-600">
                <Image alt='' src={homeIcon} className="h-6" />
                <span className="ml-2">Dashboard</span>
            </div>
        </Link>
        <Link href="/Sales">
            <div className="h-13 flex items-center border-y-4 p-3 cursor-pointer hover:bg-blue-600">
                <Image alt='' src={salesIcon} className="h-6" />
                <span className="ml-2">Sales</span>
            </div>
        </Link>
        <Link href="/Users">
            <div className="h-13 flex items-center border-y-4 p-3 cursor-pointer hover:bg-blue-600">
                <Image alt='' src={usersIcon} className="h-6" />
                <span className="ml-2">Users</span>
            </div>
        </Link>
        <Link href="/Subscriptions">
            <div className="h-13 flex items-center border-y-4 p-3 cursor-pointer hover:bg-blue-600">
                <Image alt='' src={subscriptionIcon} className="h-6" />
                <span className="ml-2">Subscriptions</span>
            </div>
        </Link>
    </div>
  )    
}
