import pino from "pino";

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'hostname,pid',
        }
    }
});

export default logger