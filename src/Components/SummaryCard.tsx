import { TSummaryCard } from "@/types";
import Image from "next/image";

export default function SummaryCard({ bgColor, icon, amount, description }: TSummaryCard) {

    return (
        <div className={`p-4 text-white min-w-64 max-w-80 w-full h-28 shadow rounded-lg bg-gradient-to-r from-${bgColor.from}-800 to-${bgColor.to}-800 flex`}>
            <div className="w-3/4 h-full flex flex-row flex-wrap content-between">
                <div className="font-bold text-4xl w-full">{amount}</div>
                <div className="w-full">{description}</div>
            </div>
            <div className="flex justify-center items-center w-1/4">
                <div className="w-20 h-20">
                    <Image className="h-20 w-auto" alt="" src={icon} />
                </div>
            </div>
        </div>
    )
}