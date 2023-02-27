// Clone an onbject deeply
export function cloneObject(obj: any): any {
  return JSON.parse(JSON.stringify(obj))
}
// Clone an array deeply
export function cloneArray(arr: any[]): any[] {
  return JSON.parse(JSON.stringify(arr))
}
