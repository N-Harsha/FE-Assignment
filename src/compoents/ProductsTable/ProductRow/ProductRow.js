import { useState } from "react";

const BatchOptions = (props) => {
  return (
    <select
      onChange={props.onBatchChange}
      style={{ width: "50%", backgroundColor: "#dff5d6" }}
    >
      {props.batches.map((batch) => (
        <option key={batch} value={batch}>
          {batch}
        </option>
      ))}
    </select>
  );
};
const ProductRow = (props) => {
  const [batchState, setBatchState] = useState(
    Object.keys(props.productData)[0]
  );
  const batches = Object.keys(props.productData);

  const DataForActiveBatch = props.productData[batchState];

  const onBatchChange = (event) => {
    setBatchState(event.target.value);
  };

  return (
    <tr style={{ backgroundColor: "white" }}>
      <th scope="col">{props.productName}</th>
      <td>
        <BatchOptions batches={batches} onBatchChange={onBatchChange} />
      </td>
      <td>{DataForActiveBatch.stock}</td>
      <td>{DataForActiveBatch.deal}</td>
      <td>{DataForActiveBatch.free}</td>
      <td>{DataForActiveBatch.mrp}</td>
      <td>{DataForActiveBatch.rate}</td>
      <td>{DataForActiveBatch.exp}</td>
    </tr>
  );
};
export default ProductRow;
