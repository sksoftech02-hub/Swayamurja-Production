const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const lead = await prisma.lead.create({
    data: {
      fullName: 'Vikram Joshi',
      phone: '9822199887',
      email: 'vikram.j@gmail.com',
      serviceType: 'Residential Rooftop Solar',
      monthlyBill: 6200.00,
      city: 'Pune (Aundh)',
      notes: 'Testing PostgreSQL direct insert',
      status: 'NEW',
    }
  });
  console.log('Created lead in PostgreSQL:', lead.id, lead.fullName);

  await prisma.auditLog.create({
    data: {
      username: 'public_visitor',
      action: 'INSERT',
      targetTable: 'leads',
      targetId: lead.id,
      newValues: { fullName: lead.fullName, phone: lead.phone },
      ipAddress: '127.0.0.1',
    }
  });
  console.log('Created AuditLog entry in PostgreSQL!');

  const count = await prisma.lead.count();
  console.log('Total leads now in PostgreSQL:', count);
  await prisma.$disconnect();
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
