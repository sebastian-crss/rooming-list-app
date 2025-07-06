import { PrismaClient } from '../generated/prisma';
import { resetAndSeed } from '../src/controllers/seed.controller';

const prisma = new PrismaClient();

async function main() {
  await resetAndSeed({} as any, {} as any);

  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
