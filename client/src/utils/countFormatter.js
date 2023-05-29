// format count with comma
export const formatCount = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(value);
};
