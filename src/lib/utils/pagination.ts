export function getPagination(items: any[], currentPage: number, perPage: number) {
  const totalPages = Math.ceil(items.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);
  return { currentItems, totalPages, currentPage };
}