import { species } from "fantastical";

const speciesNames = Object.keys(species);
const sexes: Sex[] = ['male', 'female'];
const randomArrayIndex = <T>(array: T[], cap = 0): number => {
  return Math.floor(Math.random() * (cap || array.length));
};

const max_species = speciesNames.length;
const max_sex = sexes.length;

export const getName = () => {
  const speciesName = speciesNames[randomArrayIndex(speciesNames, max_species)]!;
  const getName = species[speciesName as keyof typeof species] as (sex: Sex) => string;
  const sex = sexes[randomArrayIndex(sexes, max_sex)]!;
  return getName(sex);
};

export default getName;

type Sex = 'male'|'female';
