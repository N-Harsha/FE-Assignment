import { useEffect, useState } from "react";
import FileInputForm from "./compoents/FileInputForm/FileInputForm";
import fileProcessor from "./compoents/FileProcessor/fileProcessor";
import PaginatedItems from "./compoents/Pagination/PaginatedItems";
import SearchFeild from "./compoents/SearchFeild/SearchFeild";

function App() {
  const [productsData, setProductsData] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const onSearchTextChangeHandler = (event) => {
    setSearchText(
      event.target.value === "" ? null : event.target.value.toLowerCase()
    );
  };

  const onSubmitHandler = (file) => {
    fileProcessor(file).then((data) => setProductsData(data));
  };

  useEffect(() => {
    if (searchText === null) setFilteredProducts(productsData);
    else
      productsData !== null &&
        setFilteredProducts(
          Object.fromEntries(
            Object.entries(productsData).filter((key) =>
              key[0].toLowerCase().includes(searchText)
            )
          )
        );
  }, [productsData, searchText]);

  return (
    <div>
      <FileInputForm onSubmitHandler={onSubmitHandler} />

      {productsData !== null && (
        <>
          <SearchFeild onChange={onSearchTextChangeHandler} />
          {filteredProducts !== null && (
            <PaginatedItems productsData={filteredProducts} itemsPerPage={15} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
