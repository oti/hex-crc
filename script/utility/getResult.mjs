const thresholds = {
  normal: {
    AA: 4.5,
    AAA: 7,
  },
  large: {
    AA: 3,
    AAA: 4.5,
  },
};

export function getResult(ratio) {
  const nAAA = 7;
  const nAA = 4.5;
  const lAAA = 4.5;
  const lAA = 3;

  const normal = ratio >= nAAA ? "AAA" : ratio >= nAA ? "AA" : "Failure";
  const large = ratio >= lAAA ? "AAA" : ratio >= lAA ? "AA" : "Failure";

  return {
    normal,
    large,
  };
}
