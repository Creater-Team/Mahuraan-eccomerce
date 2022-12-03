import React from "react";

const Ratings = ({ rating, text }) => {
  let star = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(<i key={i} className="mx-1 bi bi-star-fill"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(<i key={i} className="mx-1 bi bi-star-half"></i>);
    } else {
      star.push(<i key={i} className=" mx-1 bi bi-star"></i>);
    }
  }

  return (
    <>
      <div className="" style={{ color: "#FF851B" }}>
        {rating ? (
          <p>
            {star} <span className="text-gray-400">({Number(text).toFixed(2)})</span>{" "}
          </p>
        ) : (
          <p className="text-gray-400">(0 reviews)</p>
        )}
      </div>
    </>
  );
};

export default Ratings;
