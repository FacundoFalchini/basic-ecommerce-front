import React, { useState } from "react";
import PaginatedProducts from "../PaginatedProducts/PaginatedProducts";

const OtroComponente = () => {
  const [rangeInfo, setRangeInfo] = useState("");

  // Esta función se ejecutará cuando cambie la página en PaginatedProducts
  const handlePageChange = (info) => {
    setRangeInfo(info);
  };

  return (
    <div>
      <PaginatedProducts onPageChange={handlePageChange} />
      <div>{rangeInfo}</div>
    </div>
  );
};

export default OtroComponente;
