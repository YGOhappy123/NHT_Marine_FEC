import { z } from 'zod'

const envSchema = z.object({
    VITE_NODE_ENV: z.enum(['development', 'testing', 'production']),
    VITE_SERVER_URL: z.url(),
    VITE_GG_CLIENT_ID: z.string().min(1)
})

export const parsedEnv = envSchema.parse(import.meta.env)
