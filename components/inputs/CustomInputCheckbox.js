export default function CustomInputCheckbox({
  labelText,
  id,
  name,
  value,
  onChange,
  checked,
  disabled,
}) {
  return (
    <div className="custom_input_checkbox_wrapper">
      <style jsx>{`
        .custom_input_checkbox_wrapper {
          min-height: 21px;
          vertical-align: middle;
          padding-left: 20px;
          position: relative;
          display: block;
          margin-top: 11px;
          margin-bottom: 11px;
          font-size: 0.89rem;
        }
        .custom_input_checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .custom_input_checkbox {
          margin: 4px 0 0;

          line-height: normal;
          margin-left: -20px;
          position: relative;
          float: left;
        }

        .custom_input_checkbox_label {
          margin-bottom: 0;
          font-weight: normal;
          cursor: pointer;
          display: inline;
          padding: 0;
        }
        .checkbox-icon {
        }
      `}</style>

      <label className="custom_input_checkbox_label">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          className="custom_input_checkbox"
        />
        {labelText}
      </label>
    </div>
  );
}
