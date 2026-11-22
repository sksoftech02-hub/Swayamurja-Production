export interface SolarTariffConfig {
  residentialUnitRate?: number;
  commercialUnitRate?: number;
  housingUnitRate?: number;
  pmSuryaGhar1Kw?: number;
  pmSuryaGhar2Kw?: number;
  pmSuryaGhar3KwMax?: number;
}

export interface SolarEstimate {
  kw: number;
  roofSqft: number;
  tariffRate: number;
  subsidy: number;
  subsidyText: string;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavingsLakhs: number;
  paybackYears: string;
  co2Tons: string;
}

export function calculateSolar(
  monthlyBill: number,
  category: 'residential' | 'commercial' | 'housing',
  isMarathi: boolean = false,
  customTariffs?: SolarTariffConfig
): SolarEstimate {
  const resRate = customTariffs?.residentialUnitRate && customTariffs.residentialUnitRate > 0 ? customTariffs.residentialUnitRate : 8.5;
  const comRate = customTariffs?.commercialUnitRate && customTariffs.commercialUnitRate > 0 ? customTariffs.commercialUnitRate : 11.5;
  const socRate = customTariffs?.housingUnitRate && customTariffs.housingUnitRate > 0 ? customTariffs.housingUnitRate : 9.2;

  const sub1Kw = customTariffs?.pmSuryaGhar1Kw !== undefined ? customTariffs.pmSuryaGhar1Kw : 30000;
  const sub2Kw = customTariffs?.pmSuryaGhar2Kw !== undefined ? customTariffs.pmSuryaGhar2Kw : 60000;
  const sub3KwMax = customTariffs?.pmSuryaGhar3KwMax !== undefined ? customTariffs.pmSuryaGhar3KwMax : 78000;

  let tariffPerUnit = resRate;
  if (category === 'commercial') tariffPerUnit = comRate;
  else if (category === 'housing') tariffPerUnit = socRate;

  const monthlyUnits = monthlyBill / tariffPerUnit;
  let kw = Math.max(1, Math.round((monthlyUnits / 120) * 10) / 10);

  if (category === 'residential' && kw > 15) kw = 15;
  if (category === 'commercial' && kw > 500) kw = 500;

  const roofSqft = Math.round(kw * 90);

  let subsidy = 0;
  let subsidyText = '';

  if (category === 'residential') {
    if (kw <= 1) subsidy = sub1Kw;
    else if (kw <= 2) subsidy = sub2Kw;
    else subsidy = sub3KwMax;
    subsidyText = `₹ ${Math.round(subsidy).toLocaleString('en-IN')}`;
  } else if (category === 'housing') {
    subsidy = Math.min(Math.round(kw * 18000), 900000);
    subsidyText = `₹ ${subsidy.toLocaleString('en-IN')}`;
  } else {
    subsidy = 0;
    subsidyText = isMarathi ? '४०% प्राप्तिकर लाभ' : '40% Tax Depreciation';
  }

  const monthlySavings = Math.round(monthlyBill * 0.9);
  const annualSavings = monthlySavings * 12;
  const lifetimeSavingsLakhs = Math.round(((annualSavings * 25) / 100000) * 10) / 10;
  const paybackYears =
    category === 'residential'
      ? isMarathi
        ? '३.२ वर्षे'
        : '3.2 Years'
      : isMarathi
      ? '२.९ वर्षे'
      : '2.9 Years';
  const co2Tons = (kw * 1.2).toFixed(1);

  return {
    kw,
    roofSqft,
    tariffRate: tariffPerUnit,
    subsidy,
    subsidyText,
    monthlySavings,
    annualSavings,
    lifetimeSavingsLakhs,
    paybackYears,
    co2Tons,
  };
}
