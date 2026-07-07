const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clean up existing data
  await prisma.lifeEvent.deleteMany();
  await prisma.financialState.deleteMany();
  await prisma.userTwin.deleteMany();

  const user = await prisma.userTwin.create({
    data: {
      name: "John Doe",
      stateOfResidence: "CA",
      filingStatus: "Single",
      riskTolerance: 8,
      financialState: {
        create: {
          netWorth: 2450890,
          taxEfficiency: 94,
          portfolioDrift: 1.2,
          safeWithdrawalRate: 98400
        }
      },
      lifeEvents: {
        create: [
          {
            type: "JOB_CHANGE",
            title: "Joined Startup Inc.",
            date: "Oct 2025",
            impact: "High Earner Node triggered. ISO grants received."
          },
          {
            type: "RELOCATION",
            title: "Moved to Texas",
            date: "Mar 2024",
            impact: "Zero state income tax factored into projections."
          },
          {
            type: "DEPENDENT_ADDED",
            title: "First Child Born",
            date: "Nov 2022",
            impact: "529 Plan established. Beneficiaries updated."
          }
        ]
      }
    }
  });

  console.log('Database seeded successfully!', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
