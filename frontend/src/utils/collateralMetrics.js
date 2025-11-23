function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function computeClientMetrics(client) {
  let totalCollateralUsd = 0;
  let totalDebtUsd = 0;
  let weightedRateNumerator = 0;

  let totalBtcCollateral = 0;
  let totalEthCollateral = 0;

  client.positions.forEach((pos) => {
    const collatUsd = pos.collateralAmount * pos.collateralPriceUsd;
    const debtUsd = pos.debtAmount;

    totalCollateralUsd += collatUsd;
    totalDebtUsd += debtUsd;

    weightedRateNumerator += debtUsd * pos.borrowApr;

    if (pos.asset === "BTC") totalBtcCollateral += pos.collateralAmount;
    if (pos.asset === "ETH") totalEthCollateral += pos.collateralAmount;
  });

  const collateralizationRatio =
    totalDebtUsd === 0 ? Infinity : totalCollateralUsd / totalDebtUsd;

  const threshold = 0.9;
  const maxDebtSafe = totalCollateralUsd * threshold;
  const riskRaw =
    maxDebtSafe === 0 ? 0 : totalDebtUsd / maxDebtSafe;

  const riskPercent = clamp(riskRaw * 100, 0, 100);

  const avgBorrowRate =
    totalDebtUsd === 0 ? 0 : weightedRateNumerator / totalDebtUsd;

  let btcLiqPrice = null;
  if (totalBtcCollateral > 0 && totalDebtUsd > 0) {
    btcLiqPrice = totalDebtUsd / (threshold * totalBtcCollateral);
  }

  let ethLiqPrice = null;
  if (totalEthCollateral > 0 && totalDebtUsd > 0) {
    ethLiqPrice = totalDebtUsd / (threshold * totalEthCollateral);
  }

  return {
    totalCollateralUsd,
    totalDebtUsd,
    collateralizationRatio,
    riskPercent,
    avgBorrowRate,
    btcLiqPrice,
    ethLiqPrice
  };
}

export function getClientsWithMetrics(clients) {
  return clients.map((client) => ({
    ...client,
    metrics: computeClientMetrics(client),
  }));
}
