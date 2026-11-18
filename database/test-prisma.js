const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- TESTING PRISMA CLIENT QUERY TO POSTGRESQL ---');
  const roles = await prisma.role.findMany({ include: { users: true } });
  console.log(`Roles count: ${roles.length}`);
  roles.forEach(r => console.log(`Role: ${r.roleCode} (${r.roleName}) | Users: ${r.users.map(u => u.username).join(', ')}`));

  const leads = await prisma.lead.findMany();
  console.log(`\nLeads count in PostgreSQL: ${leads.length}`);
  leads.forEach(l => console.log(`- ${l.fullName} (${l.phone}) - ${l.serviceType} - Monthly: ₹${l.monthlyBill} - Status: ${l.status}`));

  const projects = await prisma.project.findMany();
  console.log(`\nProjects count in PostgreSQL: ${projects.length}`);

  const auditLogs = await prisma.auditLog.findMany();
  console.log(`\nAudit Logs count in PostgreSQL: ${auditLogs.length}`);

  await prisma.$disconnect();
  console.log('\nPrisma + PostgreSQL Query Test 100% SUCCESSFUL!');
}

main().catch(err => {
  console.error('Prisma query error:', err);
  process.exit(1);
});
