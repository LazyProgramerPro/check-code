export const gen_uuid = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const getFileExt = (filename: string) => {
  return filename.split('.').pop();
}
