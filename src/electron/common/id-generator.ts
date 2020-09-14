import { randomBytes } from "crypto"

const nextId = () => randomBytes(16).toString("hex")

export default nextId