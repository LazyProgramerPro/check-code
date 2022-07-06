export const formatString = (string: string) => {
  if (string) return string.replace(/[&\/\\#,+()$~%'":*?<>{}\[\]^|]/g, '');
  return string;
}
