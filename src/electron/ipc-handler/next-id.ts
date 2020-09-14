import nextId from "../common/id-generator";

const generateNextId = (): Promise<string> => Promise.resolve(nextId())

export default generateNextId