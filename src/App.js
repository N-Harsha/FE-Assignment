import { useState } from "react";
import FileInputForm from "./compoents/FileInputForm/FileInputForm";
import fileProcessor from "./compoents/FileProcessor/fileProcessor";
import PaginatedItems from "./compoents/Pagination/PaginatedItems";

function App() {
  const [productsData, setProductsData] = useState(null);

  const onSubmitHandler = (file) => {
    fileProcessor(file).then((data) => setProductsData(data));
  };

  return (
    <div>
      <FileInputForm onSubmitHandler={onSubmitHandler} />
      {productsData !== null && (
        <PaginatedItems productsData={productsData} itemsPerPage={20} />
      )}
      {/* {productsData !== null && <ProductsTable products={productsData} />} */}
    </div>
  );
}

export default App;
