import { Lead } from './types';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

// Initial seed leads for demonstration & instant CRM testing
const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rajesh Deshmukh',
    phone: '9822014589',
    email: 'rajesh.d@gmail.com',
    service: 'Residential Rooftop Solar',
    monthlyBill: '₹ 4,500',
    recommendedKw: '3.5 kW',
    subsidyAmount: '₹ 78,000',
    city: 'Pune (Kothrud)',
    notes: 'Interested in PM Surya Ghar subsidy; 800 sq ft concrete roof available.',
    status: 'Site Survey Scheduled',
    createdAt: '2026-11-06T10:30:00.000Z'
  },
  {
    id: 'lead-2',
    name: 'Mahindra Auto Components (Mr. Atul Shinde)',
    phone: '9422031120',
    email: 'ashinde@autocomp.co.in',
    service: 'Commercial & Industrial (C&I)',
    monthlyBill: '₹ 1,80,000',
    recommendedKw: '150 kW',
    subsidyAmount: '40% Tax Depreciation',
    city: 'Chakan MIDC, Pune',
    notes: 'Looking to displace diesel generator power and reduce high peak tariffs.',
    status: 'New',
    createdAt: '2026-11-07T08:15:00.000Z'
  },
  {
    id: 'lead-3',
    name: 'Suresh Patil',
    phone: '9158012390',
    email: 'spatil.agri@rediffmail.com',
    service: 'Agri-Solar & Pumping',
    monthlyBill: '₹ 8,500',
    recommendedKw: '7.5 kW',
    subsidyAmount: 'PM-KUSUM Subsidy',
    city: 'Satara',
    notes: 'Requires 7.5 HP solar pump for drip sugarcane irrigation.',
    status: 'Contacted',
    createdAt: '2026-11-05T14:20:00.000Z'
  }
];

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getLeads(): Lead[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_LEADS, null, 2), 'utf-8');
      return INITIAL_LEADS;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data) as Lead[];
  } catch (err) {
    console.error('Error reading leads:', err);
    return INITIAL_LEADS;
  }
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  ensureDataDir();
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  leads.unshift(newLead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead['status']): Lead | null {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  leads[index].status = status;
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return leads[index];
}
