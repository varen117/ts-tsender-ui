/**
 * 包装提供者，希望整个应用程序都知道我们的钱包，封装全局配置
 */
"use client"

import {useState, type ReactNode} from "react"
import config from "@/rainbowkitConfig"
import {WagmiProvider} from "wagmi"
import { RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

/**
 * ------------------------------------------------------------------
wagmi 是一个用于构建 Web3 应用的 React 库，它封装了 Ethers.js，提供了 React 风格的 hooks（比如 useAccount, useConnect, useContractRead 等）来和以太坊交互。WagmiProvider 是 wagmi 的上下文提供者，必须包裹在你的应用顶层组件中，这样下面的组件才能使用 wagmi 的所有功能。
它接收一个 config 参数（这段代码从 @/rainbowkitConfig 引入），其中配置了：
	•	支持哪些钱包连接（MetaMask、WalletConnect 等）
	•	连接哪些链（比如 mainnet, sepolia 等）
	•	provider 的设置（例如使用 Alchemy、Infura 等）
 * ------------------------------------------------------------------
RainbowKitProvider是 RainbowKit 提供的组件，用于包裹整个应用，使其具备“美观易用”的钱包连接 UI。它和 wagmi 搭配使用，专注于提供极佳的用户体验，比如连接钱包的弹窗、钱包列表、链切换提示等。RainbowKitProvider 一般用在 WagmiProvider 之内，因为 RainbowKit 依赖 wagmi 提供的上下文。
 * ------------------------------------------------------------------
QueryClientProvider 是来自 @tanstack/react-query 的一个组件，它的作用是为整个 React 应用提供 React Query 的上下文。React Query 是一个用于处理异步数据（特别是服务端数据，如 API 请求）的库，提供了自动缓存、请求重试、分页、数据同步等高级功能。放在 WagmiProvider 和 RainbowKitProvider 中间，是因为 React Query 可能被 RainbowKit 或你应用中的其他组件用来获取链上或 off-chain 的数据，比如获取链上代币余额、查询合约状态、发起交易等。

最外层是 WagmiProvider，提供链连接和 Web3 的核心能力
中间是 QueryClientProvider，提供数据请求与缓存能力
最内层是 RainbowKitProvider，负责显示用户连接钱包相关的 UI
最终包裹的是 props.children，也就是你整个应用的实际内容，它们可以使用这三个 provider 提供的上下文能力，比如调用链上合约、请求 off-chain 数据、显示钱包连接界面等。

 */
export function Providers(props: {children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient)
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}