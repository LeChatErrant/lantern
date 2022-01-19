export class LanternError extends Error {
  constructor(msg: string) {
    super(`Error : ${msg}`);
  }
}
