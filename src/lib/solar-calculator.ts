export interface SolarEstimate {
  kw: number;
  roofSqft: number;
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
  isMarathi: boolean = false
): SolarEstimate {
  let tariffPerUnit = 8.5; // Average MSEDCL residential tier
  if (category === 'commercial') tariffPerUnit = 11.5;
  else if (category === 'housing') tariffPerUnit = 9.2;

  const monthlyUnits = monthlyBill / tariffPerUnit;
  let kw = Math.max(1, Math.round((monthlyUnits / 120) * 10) / 10);
  
  if (category === 'residential' && kw > 15) kw = 15;
  if (category === 'commercial' && kw > 500) kw = 500;

  const roofSqft = Math.round(kw * 90);

  let subsidy = 0;
  let subsidyText = '';

  if (category === 'residential') {
    if (kw <= 1) subsidy = 30000;
    else if (kw <= 2) subsidy = 60000;
    else subsidy = 78000;
    subsidyText = `₹ ${subsidy.toLocaleString('en-IN')}`;
  } else if (category === 'housing') {
    subsidy = Math.min(kw * 18000, 900000);
    subsidyText = `₹ ${subsidy.toLocaleString('en-IN')}`;
  } else {
    subsidy = 0;
    subsidyText = isMarathi ? '४०% प्राप्तिकर लाभ' : '40% Tax Depreciation';
  }

  const monthlySavings = Math.round(monthlyBill * 0.90);
  const annualSavings = monthlySavings * 12;
  const lifetimeSavingsLakhs = Math.round(((annualSavings * 25) / 100000) * 10) / 10;
  const paybackYears = category === 'residential' 
    ? (isMarathi ? '३.२ वर्षे' : '3.2 Years') 
    : (isMarathi ? '२.९ वर्षे' : '2.9 Years');
  const co2Tons = (kw * 1.2).toFixed(1);

  return {
    kw,
    roofSqft,
    subsidy,
    subsidyText,
    monthlySavings,
    annualSavings,
    lifetimeSavingsLakhs,
    paybackYears,
    co2Tons
  };
}
