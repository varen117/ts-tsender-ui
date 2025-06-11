import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaRegPaperPlane } from "react-icons/fa";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white dark:bg-black dark:border-gray-800">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                <FaRegPaperPlane className="w-7 h-7 text-blue-500" />
                <span>TSender</span>
            </div>
            <ConnectButton />
        </header>
    );
}
