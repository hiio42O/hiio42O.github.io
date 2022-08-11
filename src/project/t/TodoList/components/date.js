export const dateToString = (date) => {
  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    M = date.getMinutes(),
    S = date.getSeconds();
  return `${NumPadStart(y)}-${NumPadStart(m)}-${NumPadStart(d)} ${NumPadStart(
    H
  )}:${NumPadStart(M)}:${NumPadStart(S)}`;
};

export const NumPadStart = (num) => {
  return String(num).padStart(2, "0");
};
