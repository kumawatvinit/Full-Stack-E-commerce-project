import React from "react";

const CategoryCreateForm = ({ value, setValue, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group p-3">
          <label className="text-muted mb-2">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            autoFocus
            value={value}
            onChange={(eventt) => {
              setValue(eventt.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-outline-success me-4 fw-bold"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryCreateForm;
