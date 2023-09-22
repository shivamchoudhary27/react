export const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 10; i++) {
    const startYear = currentYear + i;
    const endYear = startYear + 1;
    const yearString = `${startYear}-${endYear.toString().substr(2)}`;
    const yearObj = { id: yearString, name: yearString };
    years.push(yearObj);
  }
  return years;
};

export function getCurrentBatchYear() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return `${currentYear}-${nextYear.toString().substr(2)}`;
}
