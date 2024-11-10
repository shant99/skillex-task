const addPopularity = (item) => {
  return {
    ...item,
    popularity: item.rating * 10 - item.price / 20,
  };
};

export const sortData = (products, sortOption) => {
  const data = products.map(addPopularity);

  switch (sortOption) {
    case "price_asc":
      return data.sort((a, b) => a.price - b.price);
    case "price_desc":
      return data.sort((a, b) => b.price - a.price);
    case "rating_asc":
      return data.sort((a, b) => a.rating - b.rating);
    case "rating_desc":
      return data.sort((a, b) => b.rating - a.rating);
    case "popularity_asc":
      return data.sort((a, b) => a.popularity - b.popularity);
    case "popularity_desc":
      return data.sort((a, b) => b.popularity - a.popularity);
    default:
      return data;
  }
};
