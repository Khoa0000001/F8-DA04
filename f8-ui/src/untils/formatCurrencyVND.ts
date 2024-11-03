/* eslint-disable @typescript-eslint/no-explicit-any */
const formatCurrencyVND = (amount: any) => {
    const formattedAmount = amount.toLocaleString('vi-VN');
    return `${formattedAmount}đ`;
};

export default formatCurrencyVND;
