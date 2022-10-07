import { useState } from "react";
import { read, utils } from "xlsx";

const FileInputForm = () => {
  const [file, setFile] = useState(null);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(file);
  };
  const onChangeHandler = async (event) => {
    //get data as an ArrayBuffer
    const [file] = event.target.files;
    const bufferData = await file.arrayBuffer();

    //parse and load first workSheet
    const workBook = read(bufferData);
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];

    //transformation
    const jsonData = utils.sheet_to_json(workSheet, {
      raw: false,
      dateNF: "dd/mm/yyyy",
    });
    const finalDataModel = {};
    for (const item of jsonData) {
      if (!finalDataModel[item["name"]]) {
        const batchObj = {};
        batchObj[item["batch"]] = {
          stock: +item.stock,
          deal: +item.deal,
          mrp: +item.mrp,
          rate: +item.rate,
          exp: item.exp,
          free: +item.free,
        };
        batchObj["All"] = {
          stock: +item.stock,
          deal: +item.deal,
          mrp: +item.mrp,
          rate: +item.rate,
          exp: item.exp,
          free: +item.free,
        };
        finalDataModel[item.name] = { ...batchObj };
      } else {
        const batchObj = {};
        batchObj[item.batch] = {
          stock: +item.stock,
          deal: +item.deal,
          mrp: +item.mrp,
          rate: +item.rate,
          exp: item.exp,
          free: +item.free,
        };

        //summation of the stock
        finalDataModel[item.name]["All"].stock += +item.stock;

        //aggrigate free and deal
        if (
          finalDataModel[item.name]["All"].free /
            finalDataModel[item.name]["All"].deal >
          batchObj[item.batch].free / batchObj[item.batch].deal
        ) {
          finalDataModel[item.name]["All"].free = batchObj[item.batch].free;
          finalDataModel[item.name]["All"].deal = batchObj[item.batch].deal;
        }

        //aggrigate  exp
        if (
          Date.parse(finalDataModel[item.name]["All"].exp) >
          Date.parse(batchObj[item.batch].exp)
        )
          finalDataModel[item.name]["All"].exp = batchObj[item.batch].exp;

        finalDataModel[item.name] = {
          ...finalDataModel[item.name],
          ...batchObj,
        };
      }
    }
    console.log(finalDataModel);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="file-upload">File Upload </label>
      <input id="file-upload" type="file" onChange={onChangeHandler} />
      <input type="submit" />
    </form>
  );
};
export default FileInputForm;
