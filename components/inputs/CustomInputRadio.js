export default function CustomInputRadio({
  labelText,
  id,
  name,
  value,
  onChange,
  defaultChecked,
  checked,
  disabled,
}) {
  return (
    <div className="custom_input_radio_wrapper">
      <style jsx>{`
        .custom_input_radio_wrapper {
          min-height: 21px;
          vertical-align: middle;
          padding-left: 20px;
          position: relative;
          display: block;
          margin-top: 11px;
          margin-bottom: 11px;
          font-size: 1rem;
        }

        .custom_input_radio {
          margin: 6px 0 0;

          line-height: normal;
          margin-left: -20px;
          position: relative;
          float: left;
        }

        .custom_input_radio_label {
          margin-bottom: 0;
          font-weight: normal;
          cursor: pointer;
          display: inline;
          padding: 0;
        }
      `}</style>

      <label className="custom_input_radio_label capitalize">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="custom_input_radio"
        />
        {labelText}
      </label>
    </div>
  );
}
