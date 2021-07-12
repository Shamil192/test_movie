import React from "react";
import Pagination from "@material-ui/lab/Pagination";

function Pages({ setPage, pageNum = 10 }) {

  const pageChange = (page) => {
    setPage(page);
    window.scroll(0, 0)
  };
  return (
    <div className='container my-5'>
      <Pagination
        count={pageNum}
        onChange={(e) => pageChange(e.target.textContent)}
      />
    </div>
  );
}

export default Pages;
