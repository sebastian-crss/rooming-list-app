#!/bin/sh

echo "🧪 Running tests (unit only)..."
npm run test

echo "🛠️ Generating Prisma client..."
npx prisma generate

echo "📦 Running migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npm run seed

echo "🚀 Starting server..."
npm run dev
