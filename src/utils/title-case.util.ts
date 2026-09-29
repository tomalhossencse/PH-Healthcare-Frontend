export const titleCase = (str: string) => {
  return (
    str.toLocaleLowerCase().at(0)?.toUpperCase() +
    str.toLocaleLowerCase().slice(1)
  );
};
