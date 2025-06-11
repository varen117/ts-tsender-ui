'use client'

import { useState } from "react";
import { FaRegAddressCard, FaUsers, FaCoins, FaInfoCircle } from "react-icons/fa";

export default function InputField() {
    const [token, setToken] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amounts, setAmounts] = useState("");

    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 space-y-6 border border-gray-100 dark:border-gray-800">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                        <FaRegAddressCard className="text-purple-500" /> Token Address
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="0x..."
                        value={token}
                        onChange={e => setToken(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                        <FaUsers className="text-purple-500" /> Recipients
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 min-h-[60px]"
                        placeholder="Address1, Address2, ... 或每行一个地址"
                        value={recipients}
                        onChange={e => setRecipients(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                        <FaCoins className="text-purple-500" /> Amounts (wei)
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 min-h-[60px]"
                        placeholder="1000000000000000000, 2000000000000000000, ... 或每行一个金额"
                        value={amounts}
                        onChange={e => setAmounts(e.target.value)}
                    />
                </div>
                {/* 详情卡片 */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4 flex items-start gap-3">
                    <FaInfoCircle className="text-purple-500 mt-1" />
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                        <div><b>Token Address</b>: {token || <span className="text-gray-400">未填写</span>}</div>
                        <div><b>Recipients</b>: {recipients ? recipients.split(/[\n,]+/).filter(Boolean).length : <span className="text-gray-400">未填写</span>} 个地址</div>
                        <div><b>Amounts</b>: {amounts ? amounts.split(/[\n,]+/).filter(Boolean).length : <span className="text-gray-400">未填写</span>} 个金额</div>
                    </div>
                </div>
                <button
                    className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                    type="button"
                >
                    提交
                </button>
            </div>
        </div>
    );
}
