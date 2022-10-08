import { useRef, useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import classes from "./FileInputForm.module.css";

const FileInputForm = (props) => {
  const [file, setFile] = useState(null);
  const [isValidFile, setIsValidFile] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmitHandler(file);
    setIsSubmitted(true);
  };

  const onChangeHandler = (event) => {
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];

    const ext = file.name.split(".").pop();
    if (ext === "xls" || ext === "xlsx") {
      setIsValidFile(true);
      setFile(file);
      setIsSubmitted(false);
    } else {
      setFile(null);
      setIsValidFile(false);
      setIsSubmitted(false);
      fileInputRef.current.value = "";
      return;
    }
  };

  const onConfirm = () => {
    setIsValidFile(true);
  };

  return (
    <>
      {!isValidFile && (
        <ErrorModal
          title="Invalid Input file"
          message="input file must be of type either of xls or xlsx"
          onConfirm={onConfirm}
        />
      )}
      <form onSubmit={onSubmit} className={classes.formControl}>
        <div className={classes.fileInputWrapper}>
          <label htmlFor="file-upload" className="text-center">
            Upload a File
            <br />
            {file !== null && <p>{file.name}</p>}
            <input
              id="file-upload"
              type="file"
              onChange={onChangeHandler}
              ref={fileInputRef}
            />
          </label>
        </div>
        <div className="text-center">
          <input
            type="submit"
            className={`btn ${
              isSubmitted ? "btn-success" : "btn-primary"
            } btn-lg`}
            disabled={file === null || isSubmitted === true}
          />
        </div>
      </form>
    </>
  );
};
export default FileInputForm;
