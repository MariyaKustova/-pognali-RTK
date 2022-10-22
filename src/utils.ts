export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const editName = (name: string) => {
  const indexDot = name.indexOf('.');
  return indexDot ? name.substring(indexDot + 1) : name;
}
