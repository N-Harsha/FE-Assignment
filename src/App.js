import { useEffect, useState } from "react";
import FileInputForm from "./compoents/FileInputForm";
import fileProcessor from "./compoents/FileProcessor/fileProcessor";

function App() {
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    console.log(productsData);
  }, [productsData]);

  const onSubmitHandler = (file) => {
    fileProcessor(file).then((data) => setProductsData(data));
  };

  return (
    <div>
      <FileInputForm onSubmitHandler={onSubmitHandler} />
    </div>
  );
}

export default App;
