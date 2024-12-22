import bcrypt from "bcrypt";

export const hashValue = async (
  value: string,
  saltRounds: number = 10
): Promise<string> => {
  return bcrypt.hash(value, saltRounds);
};

export const compareValue = async (value: string, hashedValue: string) => {
  bcrypt.compare(value, hashedValue).catch(() => false);
};
