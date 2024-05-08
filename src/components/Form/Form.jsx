import Btn from "../Btn/Btn";
import "./Form.scss";

function Form({ cta }) {
  return (
    <form className="form" id={`${cta}-new-comment-form`}>
      <div className="form__label-field-container">
        <label htmlFor={`${cta}-input`}>Title your video</label>
        <input
          id={`${cta}-input`}
          required
          placeholder="Add a title to your video"
        ></input>
      </div>
      <div className="form__label-field-container">
        <label htmlFor={`${cta}-textarea`}>Add a video description</label>
        <textarea
          id={`${cta}-textarea`}
          required
          placeholder="Add a description to your video"
        ></textarea>
      </div>
    </form>
  );
}

export default Form;
