import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../..')

export const dataDir = process.env.DATA_DIR || path.join(rootDir, 'data')
export const uploadsDir = process.env.UPLOADS_DIR || path.join(rootDir, 'uploads')
export const defaultDbPath = path.join(dataDir, 'africa-energy.db')
