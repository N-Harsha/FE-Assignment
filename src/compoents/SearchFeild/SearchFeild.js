import classes from "./SearchFeild.module.css";
import SearchIcon from "../../assets/icon30.svg";
const SearchFeild = (props) => {
  return (
    <div className={`${classes.search} text-center`}>
      <div className={classes.wrapper}>
        <input
          id="search"
          type={"text"}
          placeholder="Search here..."
          onChange={props.onChange}
        />
        <label htmlFor="search">
          <img src={SearchIcon} alt="search icon" />
        </label>
      </div>
    </div>
  );
};
export default SearchFeild;
