export function minIndex(arr: number[]) {
  let ii = 0
  for (let i = 0; i < arr.length; i++) ii = arr[ii] <= arr[i] ? ii : i
  return ii
}

export function queueMicro(cb: () => void) {
  queueMicrotask ? queueMicrotask(cb) : Promise.resolve().then(cb)
}

type Props = {
  cols: number
  gap: number
}

type Ops<T> = {
  // w
  getW(el: T): number
  setW(el: T, v: number): void
  // h
  getH(el: T): number
  setH(el: T, v: number): void
  // padding
  getPad(el: T): [number, number, number, number]
  // xy
  setX(el: T, v: number): void
  setY(el: T, v: number): void
  // children
  getChildren(el: T): { [index: number]: T, length: number }
}

export function flow_layout<T>(container: T, { getW, setW, getH, setH, getPad, setX, setY, getChildren }: Ops<T>, { cols, gap }: Props) {
  const [pt, pr, pb, pl] = getPad(container)
  const els = getChildren(container), len = els.length

  if (len) {
    const ew = (getW(container) - gap * (cols - 1) - (pl + pr)) / cols

    // 获取每个 item 的高度
    Array.prototype.forEach.call(els, el => setW(el, ew))
    const hs = Array.prototype.map.call(els, el => getH(el)) as number[]

    // 计算位置
    const stack = Array(cols).fill(pt)

    for (let i = 0; i < len; i++) {
      const el = els[i]
      const col = minIndex(stack)
      setY(el, stack[col])
      setX(el, pl + (ew + gap) * col)
      stack[col] += hs[i] + gap
    }

    // 设置容器高度
    setH(container, Math.max(...stack) - gap + pb)
  } else {
    setH(container, pt + pb)
  }
}