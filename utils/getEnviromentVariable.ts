/**
 * Get environment variable type safe
 * @param {string} name
 * @returns {string}
 */
export function getEnvironmentVariable(name: string): string {
  const variable = process.env[name];
  if (variable === undefined) {
    throw new Error(`Environment variable ${name} is undefined`);
  }

  return variable;
}
