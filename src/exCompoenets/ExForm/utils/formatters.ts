export const customFormatters = {
  changeNumber: (value: string) =>
    Number(value.replace(/[^\d]/g, '')).toLocaleString(),
};
