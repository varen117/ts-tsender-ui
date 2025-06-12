"use client"
import { useState, useMemo } from "react";
import {InputForm}  from "./ui/InputField";
import {chainsToTSender, tsenderAbi, erc20Abi} from "@/constants"
import {useChainId, useReadContract, useConfig, useAccount, useWriteContract} from "wagmi"
import {readContract, waitForTransactionReceipt} from "@wagmi/core"
import {calculateTotal} from "@/utils"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amounts, setAmounts] = useState("");
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total: number = useMemo(() => calculateTotal(amounts), [amounts]); //输入的总的金额
    const {writeContractAsync, data:hash, isPending} = useWriteContract();


    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 space-y-6 border border-gray-100 dark:border-gray-800">
                <InputForm 
                    label="Token Address" 
                    placeholder="0x" 
                    value={tokenAddress} 
                    onChange={e => setTokenAddress(e.target.value)}
                />

                <InputForm 
                    label="Recipients (comma or new line separated)" 
                    placeholder="0xf3..."
                    value={recipients} 
                    onChange={e => setRecipients(e.target.value)}
                    large={true}
                />

                <InputForm 
                    label="Amounts (wei; comma or new line separated)" 
                    placeholder="100,200,300..."
                    value={amounts} 
                    onChange={e => setAmounts(e.target.value)}
                    large={true}
                />
                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition shadow-xs"
                >
                    提交
                </button>
            </div>
        </div>
    );
    /**
     * 提交事件
     */
    async function handleSubmit() {
        console.log("执行批准操作...")
        //1.检查是否已经获得批准
        // 2.如果没有批准就批准合约发送代币
        //3.如果已经批准则调用合约函数交互
        //------
        //获取发送地址
        const tSenderAddress = chainsToTSender[chainId]["tsender"];
        const approvedAmount = await getApprovedAmount(tSenderAddress);
        if (approvedAmount < total) {
            //如果空投的金额够用直接批准并调用空投函数
            const approveHash = await writeContractAsync({
                abi:erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args:[tSenderAddress as `0x${string}`, BigInt(total)]
            })
            // 等待交易被打包
            const approvalReceipt = waitForTransactionReceipt(config, {
                hash:approveHash
            })

            //调用空投函数
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            })
        }else {
            console.log("执行空投操作...")
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            },)
        }
        console.log(approvedAmount)
    
    }
    /**
     * 获取批准金额
     */
    async function getApprovedAmount(tSenderAddress:string | null): Promise<number> {
        if(!tSenderAddress) {
            alert("No address found, please use a supported chain")
            return 0;
        }
        // 读取合约，导入wagmi核心库，然后用这个函数
        const result = await readContract(config, {
            abi: erc20Abi, 
            address: tokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [account.address, tSenderAddress as `0x${string}`]
        });
        return result as number;

    }

    
}