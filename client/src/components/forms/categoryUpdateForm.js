import React from "react";

const CategoryUpdateForm = ({ value, setValue }) => {
  return (
    <>
      <form>
        <div className="form-group p-3">
          <label className="text-muted mb-2">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Update category name"
            autoFocus
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default CategoryUpdateForm;
