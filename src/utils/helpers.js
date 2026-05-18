export const riskStyle = {
  low: "bg-green-50 text-green-800 border border-green-200",
  mid: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  high: "bg-red-50 text-red-800 border border-red-200",
};

export function getInterp(interpret, score) {
  if (typeof score === "string") return { text: "Bazı değerler test edilemez olarak işaretlendi.", cls: "mid" };
  return interpret?.find((i) => score <= i.max) || interpret?.[interpret.length - 1];
}