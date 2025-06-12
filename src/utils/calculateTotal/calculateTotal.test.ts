import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculateTotal';

describe('calculateTotal - 强化版测试', () => {
    it('空字符串应返回 0', () => {
        expect(calculateTotal('')).toBe(0);
    });

    it('只包含空格和换行应返回 0', () => {
        expect(calculateTotal('  \n \n ,  ,')).toBe(0);
    });

    it('逗号 + 换行混合分隔的整数', () => {
        expect(calculateTotal('1,2\n3')).toBe(6);
    });

    it('支持小数点计算', () => {
        expect(calculateTotal('1.5,2\n3')).toBeCloseTo(6.5);
    });

    it('支持负数计算', () => {
        expect(calculateTotal('-1,2\n-3.5')).toBeCloseTo(-2.5);
    });

    it('忽略非法数字（如NaN、字母等）', () => {
        expect(calculateTotal('1,a,b\n2,,3.1,x')).toBeCloseTo(6.1);
    });

    it('能处理前后空格的输入', () => {
        expect(calculateTotal('  1.1 ,   2.2 \n 3.3   ')).toBeCloseTo(6.6);
    });

    it('只含非法字符应返回 0', () => {
        expect(calculateTotal('abc,xyz\n***')).toBe(0);
    });

    it('多个连续分隔符也不影响结果', () => {
        expect(calculateTotal('1,,,\n\n2,,,3')).toBe(6);
    });

    it('小数 + 负数 + 空格 + 混合符号组合测试', () => {
        expect(calculateTotal(' -1.5 , 2.5\n 3 , -4.0 , abc , 1.0')).toBeCloseTo(1.0);
    });
});