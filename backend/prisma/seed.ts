import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const roomingList = await prisma.roomingList.create({
    data: {
      eventId: 1,
      hotelId: 1,
      rfpName: "Test RFP",
      cutOffDate: new Date(),
      status: "Active",
      agreement_type: "staff",
    },
  });

  console.log('Rooming List created:', roomingList);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
