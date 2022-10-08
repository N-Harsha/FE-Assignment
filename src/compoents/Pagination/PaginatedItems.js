import ProductsTable from "../ProductsTable/ProductsTable";
import ReactPaginate from "react-paginate";
import classes from "./pagination.module.css";
import { useEffect, useState } from "react";

function PaginatedItems(props) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = props.itemsPerPage;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(
      Object.entries(props.productsData).slice(itemOffset, endOffset)
    );

    setPageCount(
      Math.ceil(Object.keys(props.productsData).length / itemsPerPage)
    );
  }, [itemOffset, props.productsData, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % Object.keys(props.productsData).length;
    setItemOffset(newOffset);
  };
  return (
    <>
      {currentItems !== null && (
        <ProductsTable products={Object.fromEntries(currentItems)} />
      )}
      <div className="text-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName={`${classes.pagination}`}
          subContainerClassName={"pages pagination"}
          activeClassName={classes.active}
        />
      </div>
    </>
  );
}
export default PaginatedItems;
