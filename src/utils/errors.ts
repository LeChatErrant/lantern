export class LanternError extends Error {}

export class FileError extends LanternError {
  constructor(msg: string) {
    super(`File error : ${msg}`);
  }
}

export class PrismaError extends LanternError {
  constructor(msg: string) {
    super(`Prisma error : ${msg}`);
  }
}

export class ExecError extends LanternError {
  constructor(msg: string) {
    super(`Exec error : ${msg}`);
  }
}

export class DownloadError extends LanternError {
  constructor(msg: string) {
    super(`Download error : ${msg}`);
  }
}
