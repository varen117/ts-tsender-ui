/**
 * 计算输入的数据的总和
 * @param amounts 数组
 * @returns 计算值
 */
export function calculateTotal(amounts: string): number {
    if (!amounts) return 0;
    return amounts
        .split(/[\n,]+/)
        .map(s => s.trim())
        .filter(Boolean)
        .map(Number)
        .filter(n => !isNaN(n))
        .reduce((acc, n) => acc + n, 0);
}
