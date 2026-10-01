import { useEffect, useState } from "react";

function EnrollmentForm({
  onAddEnrollment,
  editingEnrollment,
  onUpdateEnrollment,
  onCancelEdit
}) {
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    yearLevel: "",
    email: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingEnrollment) {
      setFormData({
        studentName: editingEnrollment.studentName,
        course: editingEnrollment.course,
        yearLevel: editingEnrollment.yearLevel,
        email: editingEnrollment.email
      });
    } else {
      setFormData({
        studentName: "",
        course: "",
        yearLevel: "",
        email: ""
      });
    }

    setError("");
  }, [editingEnrollment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.studentName.trim() ||
      !formData.course.trim() ||
      !formData.yearLevel ||
      !formData.email.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (editingEnrollment) {
      onUpdateEnrollment({
        ...editingEnrollment,
        ...formData,
        studentName: formData.studentName.trim(),
        course: formData.course.trim(),
        email: formData.email.trim()
      });
    } else {
      onAddEnrollment({
        studentName: formData.studentName.trim(),
        course: formData.course.trim(),
        yearLevel: formData.yearLevel,
        email: formData.email.trim()
      });
    }

    setFormData({
      studentName: "",
      course: "",
      yearLevel: "",
      email: ""
    });

    setError("");
  };

  return (
    <div className="modal-overlay" onMouseDown={onCancelEdit}>
      <div
        className="enrollment-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="modal-kicker">
              {editingEnrollment ? "Enrollment Record" : "Student Services"}
            </p>

            <h2>
              {editingEnrollment
                ? "Edit Enrollment"
                : "Add Student Enrollment"}
            </h2>

            <p className="modal-description">
              {editingEnrollment
                ? "Update the student's enrollment information."
                : "Enter the student's information to create a new enrollment record."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onCancelEdit}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="enrollment-form">
          <div className="form-field">
            <label htmlFor="studentName">
              Student Name <span>*</span>
            </label>

            <input
              id="studentName"
              type="text"
              name="studentName"
              placeholder="Enter student's full name"
              value={formData.studentName}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="course">
              Course <span>*</span>
            </label>

            <input
              id="course"
              type="text"
              name="course"
              placeholder="e.g. Bachelor of Science in Information Technology"
              value={formData.course}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="yearLevel">
              Year Level <span>*</span>
            </label>

            <select
              id="yearLevel"
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
            >
              <option value="">Select year level</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email Address <span>*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {editingEnrollment
                ? "Save Changes"
                : "Add Enrollment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnrollmentForm;