import { writeFileSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"

const URL = process.env.OPENAPI_URL ?? "http://localhost:5000/api-json"
const OUT = "./openapi/openapi.json"

const res = await fetch(URL)
if (!res.ok) {
  console.error(`Failed to fetch OpenAPI spec from ${URL}: ${res.status} ${res.statusText}`)
  process.exit(1)
}

const text = await res.text()
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, text)
console.log(`OpenAPI spec saved to ${OUT}`)