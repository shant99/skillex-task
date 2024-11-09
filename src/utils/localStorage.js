export const savedPagination = JSON.parse(
  localStorage.getItem("pagination")
) || {
  page: 1,
  limit: 10,
};
export const savedFilters = JSON.parse(localStorage.getItem("filters")) || {};
