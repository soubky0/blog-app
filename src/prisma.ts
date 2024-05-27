import { PrismaClient } from '@prisma/client';
import { START_PRISMA_STUDIO, PRISMA_STUDIO_PORT } from './secrets'
import { exec } from 'child_process';
import {logger} from "./logger";
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    const before = Date.now()

    const result = await next(params)

    const after = Date.now()

    logger.info(`Query ${params.model}.${params.action} took ${after - before}ms`)

    return result
})

async function main() {
    if (START_PRISMA_STUDIO) {
        exec(`npx prisma studio --port ${PRISMA_STUDIO_PORT} --browser none`)
        console.log(`Prisma Studio is running at http://localhost:${PRISMA_STUDIO_PORT}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

export default prisma;
