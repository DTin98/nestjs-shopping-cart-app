export const formatMoney = (money: number | undefined) => {
    if (!money) {
        return money;
    }

    return money.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};
