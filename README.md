This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

------------------------------------------------------------------------------------------------------------

## 安装next-app
```shell
pnpm create next-app@latest
```
## wagmi核心库
```shell
pnpm add @wagmi/core
```
# 目录解释

`pnpm-lock.yaml：` 是 pnpm 管理依赖时自动生成的锁定文件，保证依赖版本一致、安装过程可复现，是现代前端项目不可或缺的一部分。

`postcss.config.mjs`：的作用是配置 PostCSS 工具，指定在处理 CSS 时要用哪些插件。它让你可以自定义 CSS 的构建流程，比如集成 Tailwind CSS、自动加前缀等。简单来说，这个文件决定了你的 CSS 在构建时会经过哪些自动化处理。

`package.json` 是 Node.js 和前端项目的**核心配置文件**，其主要作用有：

1. **描述项目信息**：如项目名称、版本、作者等。
2. **管理依赖**：记录项目所需的依赖包及其版本。
3. **定义脚本命令**：如启动、构建、测试等常用命令。
4. **配置项目行为**：可以配置工具、插件等的参数。

简而言之，`package.json` 让项目的依赖、配置信息和常用命令都集中管理，是项目能被正确安装、运行和维护的基础。


`tsconfig.json` 是 TypeScript 项目的**配置文件**，其主要作用是：

1. **指定 TypeScript 编译选项**：比如目标 JavaScript 版本、模块系统、严格模式等。
2. **定义项目文件范围**：决定哪些文件会被 TypeScript 编译（通过 `include`、`exclude`、`files` 等字段）。
3. **配置路径别名**：可以为导入路径设置简写（如 `@/components`）。
4. **支持编辑器智能提示**：让编辑器根据配置提供更准确的类型检查和补全。

简而言之，`tsconfig.json` 控制 TypeScript 如何检查和编译你的代码，是 TypeScript 项目的核心配置文件。

`next.config.ts` 是 Next.js 项目的**配置文件**，用于自定义和扩展 Next.js 的默认行为。它的主要作用包括：

1. **配置构建和运行参数**：如自定义构建目录、环境变量、页面扩展名等。
2. **定制 Webpack、Babel 等工具**：可以通过配置项或函数修改底层打包工具的行为。
3. **开启或关闭 Next.js 的特性**：如图片优化、国际化（i18n）、API 路由等。
4. **插件集成**：可以集成各种 Next.js 插件，增强项目功能。

简而言之，`next.config.ts` 让你可以根据项目需求灵活调整 Next.js 的运行和构建方式。

------
`.ts` 和 `.tsx` 都是 TypeScript 文件，但它们有以下区别：

- **.ts 文件**：只能写 TypeScript 代码，**不能**直接写 JSX 语法（即 React 组件里的 `<div>...</div>` 这种标签）。
- **.tsx 文件**：可以写 TypeScript 代码，也**可以**直接写 JSX 语法，通常用于 React 组件开发。

**总结**：  
- 如果你的文件里需要写 JSX（比如 React 组件），用 `.tsx`。  
- 如果只是普通的 TypeScript 代码，不涉及 JSX，用 `.ts`。

---

### useMemo 的作用

`useMemo` 是 React 的一个 Hook，用于**缓存计算结果**，只有依赖项发生变化时才会重新计算。  
常用于**性能优化**，避免在每次渲染时都执行开销较大的计算。

**用法示例：**
```js
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
只有 `a` 或 `b` 变化时，`computeExpensiveValue` 才会重新执行。

---

### useMemo 和 useState 的区别

|            | useMemo                                      | useState                        |
|------------|----------------------------------------------|---------------------------------|
| 作用       | 缓存计算结果，优化性能                        | 存储和管理组件的本地状态        |
| 触发更新   | 依赖项变化时重新计算                          | 调用 setState 时更新            |
| 用途       | 记忆值（通常是计算结果）                      | 记忆值（通常是用户输入、数据等）|
| 典型场景   | 复杂/耗时计算、依赖变化时才重新计算            | 组件内部数据的增删改查          |

**一句话总结：**  
- `useMemo` 用于缓存和复用计算结果，提升性能；  
- `useState` 用于存储和更新组件的本地状态。
