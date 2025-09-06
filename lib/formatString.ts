export const formatString = (str?: string) => {
  return (str ?? "").replaceAll("_", " ");
};
