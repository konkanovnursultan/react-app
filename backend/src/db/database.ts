import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const dbPath = path.resolve(__dirname, '../../users.db')
const db = new Database(dbPath)

const schema = fs.readFileSync(
  path.resolve(__dirname, './schema.sql'),
  'utf-8'
)

db.exec(schema)

export default db
