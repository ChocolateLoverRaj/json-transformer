export type JsonArray = Json[]
export interface JsonObject {
  [key: string]: Json
}
export type Json = string | number | boolean | null | JsonArray | JsonObject
