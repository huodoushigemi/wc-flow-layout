export function minii(arr: number[]) {
  let ii = 0
  for (let i = 0; i < arr.length; i++) ii = arr[ii] <= arr[i] ? ii : i
  return ii
}

export function queueMicro(cb: () => void) {
  queueMicrotask ? queueMicrotask(cb) : Promise.resolve().then(cb)
}