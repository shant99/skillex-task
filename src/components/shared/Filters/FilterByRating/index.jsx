import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const RatingFilter = ({ onRatingChange }) => {
  const { filters } = useSelector((state) => state.products);
  const [minRating, setMinRating] = useState(filters.rating);

  const ratingOptions = [
    { value: 0, label: "All Ratings" },
    { value: 1, label: "1 Star & Up" },
    { value: 2, label: "2 Stars & Up" },
    { value: 3, label: "3 Stars & Up" },
    { value: 4, label: "4 Stars & Up" },
    { value: 4.2, label: "4.2 Stars & Up" },
    { value: 4.4, label: "4.4 Stars & Up" },
    { value: 4.6, label: "4.6 Stars & Up" },
    { value: 4.8, label: "4.8 Stars & Up" },
    { value: 5, label: "5 Stars Only" },
  ];

  const handleChange = (e) => {
    onRatingChange(parseFloat(e.target.value));
    setMinRating(e.target.value);
  };

  useEffect(() => {
    if (!filters.rating) {
      setMinRating(0);
    }
  }, [filters.rating]);

  return (
    <div className="rating-filter">
      <div className="rating-dropdown">
        <select
          id="rating"
          className="rating-select"
          value={minRating}
          onChange={handleChange}
        >
          {ratingOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RatingFilter;
