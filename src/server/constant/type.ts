export type ResProps<T = undefined> = Promise<{
  stat: boolean,
  msg: string,
  data: T,
}>
