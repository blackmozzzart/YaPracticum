export const log = (msg: string) => {
  const baseMsg = '\x1b[33m Praktikum uploader: \x1b[0m';
  return console.log(baseMsg + msg);
}
