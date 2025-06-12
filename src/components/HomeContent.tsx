"use client"
import AirdropForm from "./AirdropForm"
import {useAccount} from "wagmi"

export default function HomeContent() {
    const {isConnected} = useAccount();

    return (
        <div>
            {isConnected ? (
                <AirdropForm/>
            ):(
                <h1 className="text-center text-2xl font-bold">please connect wallet</h1>
            )}
        </div>
    )
}