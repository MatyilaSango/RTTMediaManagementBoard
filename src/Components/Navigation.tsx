"use client"
import React from 'react'
import Image from 'next/image'
import homeIcon from "@/images/home.svg"
import salesIcon from "@/images/sales.svg"
import usersIcon from "@/images/users.svg"
import subscriptionIcon from "@/images/subscription.svg"
import plansIcon from "@/images/plans.svg"
import Link from 'next/link'

export default function Navigation() {
    const navItems = [
        {
            icon: homeIcon,
            name: "Dashboard",
            link: "/Dashboard"
        },
        {
            icon: salesIcon,
            name: "Sales",
            link: "/Sales"
        },
        {
            icon: usersIcon,
            name: "Users",
            link: "/Users"
        },
        {
            icon: subscriptionIcon,
            name: "Subscriptions",
            link: "/Subscriptions"
        },
        {
            icon: plansIcon,
            name: "Plans",
            link: "/Plans"
        }
        
    ]

    const handleNavOnclick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.currentTarget.classList.add("loader")
        setTimeout(() => {
            e.currentTarget.classList.remove("loader")
        }, 3000)
    }

    return (
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 w-52 text-base text-white h-full">
            {navItems.map(item =>
                <Link href={item.link} key={item.name}>
                    <div className="h-13 min-w-fit flex items-center border-y-4 p-3 cursor-pointer hover:bg-blue-600" onClick={(e) => handleNavOnclick}>
                        <Image alt='' src={item.icon} className="h-6" />
                        <span className="ml-2">{item.name}</span>
                    </div>
                </Link>
            )}
        </div>
    )
}
