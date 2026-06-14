// Shared pure utilities (date formatting, string helpers, etc.)
// Add real functions as needed across sprints.

export const utilsVersion = '0.1.0-sprint0';

export function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
