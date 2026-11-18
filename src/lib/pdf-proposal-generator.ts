export interface ProposalData {
  clientName?: string;
  category: 'residential' | 'commercial' | 'housing';
  monthlyBill: number;
  kw: number;
  roofSqft: number;
  subsidy: number;
  subsidyText: string;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavingsLakhs: number;
  paybackYears: string;
  co2Tons: string;
  isMarathi?: boolean;
}

export function generateSolarProposalPDF(data: ProposalData): void {
  const proposalId = `SU-EPC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const categoryLabel =
    data.category === 'commercial'
      ? 'Commercial & Industrial (C&I MIDC)'
      : data.category === 'housing'
      ? 'Co-operative Housing Society'
      : 'Residential Rooftop (PM Surya Ghar)';

  const tariffRate = data.category === 'commercial' ? 11.5 : data.category === 'housing' ? 9.2 : 8.5;
  const estimatedUnits = Math.round(data.monthlyBill / tariffRate);
  const annualUnits = Math.round(data.kw * 1500);
  const grossEstimatedCost = Math.round(data.kw * (data.category === 'commercial' ? 44000 : 56000));
  const netEstimatedCost = Math.max(0, grossEstimatedCost - data.subsidy);
  const fiveYearSavings = data.annualSavings * 5;
  const tenYearSavings = data.annualSavings * 10;
  const co2Lifetime = (parseFloat(data.co2Tons) * 25).toFixed(0);
  const treesEquivalent = Math.round(data.kw * 42);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SwayamUrja - Solar Feasibility Proposal (${proposalId})</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    }
    body {
      color: #0f172a;
      background: #ffffff;
      font-size: 11.5px;
      line-height: 1.45;
    }
    .header {
      border-bottom: 2px solid #0e5a3c;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #0e5a3c;
      letter-spacing: -0.5px;
    }
    .brand-title span {
      color: #f59e0b;
    }
    .brand-sub {
      font-size: 9.5px;
      color: #475569;
      margin-top: 2px;
      font-weight: 600;
    }
    .meta-box {
      text-align: right;
      font-size: 10px;
      color: #475569;
    }
    .meta-ref {
      font-family: monospace;
      font-weight: 700;
      color: #0f172a;
      font-size: 11px;
    }
    .doc-banner {
      background: linear-gradient(135deg, #0e5a3c 0%, #157951 100%);
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .doc-banner h2 {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.2px;
    }
    .doc-banner .badge {
      background: rgba(255,255,255,0.2);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 16px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      background: #f8fafc;
    }
    .card-title {
      font-size: 11px;
      font-weight: 800;
      color: #0e5a3c;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;
      font-size: 11px;
    }
    .row-label {
      color: #64748b;
      font-weight: 500;
    }
    .row-val {
      font-weight: 700;
      color: #0f172a;
    }
    .highlight-val {
      color: #0e5a3c;
      font-weight: 800;
    }
    .gold-val {
      color: #d97706;
      font-weight: 800;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 10.5px;
    }
    th {
      background: #f1f5f9;
      color: #334155;
      text-align: left;
      padding: 6px 10px;
      font-weight: 700;
      border: 1px solid #e2e8f0;
    }
    td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 16px;
    }
    .spec-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px;
      text-align: center;
    }
    .spec-pill .num {
      font-size: 13px;
      font-weight: 800;
      color: #0e5a3c;
    }
    .spec-pill .lbl {
      font-size: 9px;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }
    .green-impact {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-around;
      text-align: center;
    }
    .green-impact .val {
      font-size: 14px;
      font-weight: 800;
      color: #047857;
    }
    .green-impact .lbl {
      font-size: 9.5px;
      color: #065f46;
      font-weight: 600;
    }
    .footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 10px;
      font-size: 9px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .print-btn {
      position: fixed;
      top: 15px;
      right: 15px;
      padding: 10px 18px;
      background: #0e5a3c;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    @media print {
      .print-btn {
        display: none;
      }
    }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <div class="header">
    <div>
      <div class="brand-title">Swayam<span>Urja</span></div>
      <div class="brand-sub">SwayamUrja Renewable Energy Pvt. Ltd. | EPC Solutions</div>
      <div class="brand-sub">CIN: U40106PN2020PTC195234 | GSTIN: 27AAMCS8921N1ZM | MNRE Channel Partner</div>
    </div>
    <div class="meta-box">
      <div>Reference: <span class="meta-ref">${proposalId}</span></div>
      <div>Date: <strong>${dateStr}</strong></div>
      <div>Location: Baner, Pune, Maharashtra 411045</div>
    </div>
  </div>

  <div class="doc-banner">
    <div>
      <h2>PRELIMINARY SOLAR EPC FEASIBILITY &amp; ROI REPORT</h2>
      <div style="font-size: 10px; opacity: 0.9; margin-top: 2px;">Prepared for: ${data.clientName ? data.clientName : 'Prospective Solar Client'}</div>
    </div>
    <div class="badge">${categoryLabel}</div>
  </div>

  <div class="specs-grid">
    <div class="spec-pill">
      <div class="num">${data.kw} kWp</div>
      <div class="lbl">Recommended System</div>
    </div>
    <div class="spec-pill">
      <div class="num">${data.roofSqft} sq.ft.</div>
      <div class="lbl">Rooftop Area Required</div>
    </div>
    <div class="spec-pill">
      <div class="num">${annualUnits.toLocaleString('en-IN')} kWh</div>
      <div class="lbl">Est. Annual Generation</div>
    </div>
    <div class="spec-pill">
      <div class="num">${data.paybackYears}</div>
      <div class="lbl">Capital Payback</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">1. Current Utility Consumption (MSEDCL Baseline)</div>
      <div class="row">
        <span class="row-label">Average Monthly Electricity Bill:</span>
        <span class="row-val">₹ ${data.monthlyBill.toLocaleString('en-IN')} / month</span>
      </div>
      <div class="row">
        <span class="row-label">Estimated Monthly Grid Units:</span>
        <span class="row-val">~${estimatedUnits.toLocaleString('en-IN')} Units (kWh)</span>
      </div>
      <div class="row">
        <span class="row-label">Tariff Rate Slab:</span>
        <span class="row-val">₹ ${tariffRate} / Unit</span>
      </div>
      <div class="row">
        <span class="row-label">Annual Utility Spend (Unleveraged):</span>
        <span class="row-val">₹ ${(data.monthlyBill * 12).toLocaleString('en-IN')} / year</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">2. Capital Outlay &amp; Financial Incentive</div>
      <div class="row">
        <span class="row-label">Estimated Turnkey EPC Outlay:</span>
        <span class="row-val">₹ ${grossEstimatedCost.toLocaleString('en-IN')}</span>
      </div>
      <div class="row">
        <span class="row-label">PM Surya Ghar Subsidy / Tax Depreciation:</span>
        <span class="gold-val">${data.subsidy > 0 ? `- ₹ ${data.subsidy.toLocaleString('en-IN')}` : data.subsidyText}</span>
      </div>
      <div class="row" style="border-top: 1px dashed #cbd5e1; margin-top: 4px; padding-top: 4px;">
        <span class="row-label" style="font-weight: 700; color: #0e5a3c;">Net Out-of-Pocket Investment:</span>
        <span class="highlight-val">₹ ${netEstimatedCost.toLocaleString('en-IN')}</span>
      </div>
      <div class="row">
        <span class="row-label">Displaces Daytime Grid Demand:</span>
        <span class="row-val" style="color: #047857;">88% – 100% (Zero Bill Target)</span>
      </div>
    </div>
  </div>

  <div class="card" style="margin-bottom: 16px;">
    <div class="card-title">3. 25-Year Cumulative Financial Savings Forecast</div>
    <table>
      <thead>
        <tr>
          <th>Timeline Horizon</th>
          <th>Annual Projected Savings</th>
          <th>Cumulative Savings</th>
          <th>Net Financial Yield</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Year 1</strong></td>
          <td>₹ ${data.annualSavings.toLocaleString('en-IN')}</td>
          <td>₹ ${data.annualSavings.toLocaleString('en-IN')}</td>
          <td><span style="color: #047857; font-weight: 700;">Immediate Cash Flow Positive</span></td>
        </tr>
        <tr>
          <td><strong>Year 5</strong></td>
          <td>₹ ${(data.annualSavings * 1.08).toLocaleString('en-IN')} (assuming 2% tariff hike)</td>
          <td>₹ ${fiveYearSavings.toLocaleString('en-IN')}</td>
          <td><strong>Full Payback Achieved</strong></td>
        </tr>
        <tr>
          <td><strong>Year 10</strong></td>
          <td>₹ ${(data.annualSavings * 1.18).toLocaleString('en-IN')}</td>
          <td>₹ ${tenYearSavings.toLocaleString('en-IN')}</td>
          <td>Pure Profit &amp; Free Clean Energy</td>
        </tr>
        <tr style="background: #fefce8; font-weight: 700;">
          <td><strong>25-Year Lifetime</strong></td>
          <td>Tier-1 Linear Yield Guaranteed</td>
          <td style="color: #b45309; font-size: 12px;">₹ ${data.lifetimeSavingsLakhs} Lakhs</td>
          <td style="color: #047857;">~28.4% Return on Investment (IRR)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card" style="margin-bottom: 16px;">
    <div class="card-title">4. Bill of Materials &amp; Turnkey Engineering Standards</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 10px;">
      <div>• <strong>Solar Modules:</strong> Tier-1 Monocrystalline Bifacial TOPCon (580Wp+, 22.8% Cell Efficiency)</div>
      <div>• <strong>Inverter:</strong> Three-Phase Smart On-Grid String Inverter with Integrated IoT Wi-Fi Telemetry</div>
      <div>• <strong>MMS Structure:</strong> Hot-Dip Galvanized 80µm Iron Structure (150 km/h Wind Speed Certified)</div>
      <div>• <strong>Protection:</strong> Dedicated Class-II Surge Protection Devices (SPD) + 3-Point Chemical Earthing</div>
      <div>• <strong>Net-Metering:</strong> Turnkey MSEDCL Liaisoning, CEIG Inspection &amp; Bi-Directional Meter Synchronization</div>
      <div>• <strong>Warranty:</strong> 25-Year Linear Power Output Warranty &amp; 10-Year Inverter Manufacturer Warranty</div>
    </div>
  </div>

  <div class="green-impact">
    <div>
      <div class="val">${co2Lifetime} Metric Tons</div>
      <div class="lbl">Lifetime CO₂ Emissions Offset</div>
    </div>
    <div>
      <div class="val">~${treesEquivalent} Trees</div>
      <div class="lbl">Equivalent Trees Planted</div>
    </div>
    <div>
      <div class="val">99.2% Uptime</div>
      <div class="lbl">Contracted Plant Availability</div>
    </div>
  </div>

  <div class="footer">
    <div>
      <strong>SwayamUrja Renewable Energy Pvt. Ltd.</strong> | Head Office: Baner, Pune, MH 411045
      <br>Contact: +91 92721 00623 | sales@swayamurja.com | www.swayamurja.com
    </div>
    <div style="text-align: right;">
      Generated via SwayamUrja Engineering Portal
      <br><em>Official document for management, board review &amp; loan appraisal.</em>
    </div>
  </div>

  <script>
    // Automatically trigger print dialog once DOM loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  if (!printWindow) {
    alert('Please allow popups for this site to view and download your PDF Solar Feasibility Report.');
  }
}
