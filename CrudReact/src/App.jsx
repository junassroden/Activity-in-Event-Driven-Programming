import { useEffect, useMemo, useState } from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import EnrollmentList from "./components/EnrollmentList";
import initialEnrollments from "./data/enrollments.json";

function App() {
  const [enrollments, setEnrollments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [yearFilter, setYearFilter] = useState("All Year Levels");
  const [activeView, setActiveView] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setEnrollments(initialEnrollments);
  }, []);

  const courses = useMemo(() => {
    return [...new Set(enrollments.map((item) => item.course))];
  }, [enrollments]);

  const yearLevels = useMemo(() => {
    return [...new Set(enrollments.map((item) => item.yearLevel))];
  }, [enrollments]);

  const filteredEnrollments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return enrollments.filter((enrollment) => {
      const matchesSearch =
        enrollment.studentName.toLowerCase().includes(search) ||
        enrollment.course.toLowerCase().includes(search) ||
        enrollment.email.toLowerCase().includes(search);

      const matchesCourse =
        courseFilter === "All Courses" ||
        enrollment.course === courseFilter;

      const matchesYear =
        yearFilter === "All Year Levels" ||
        enrollment.yearLevel === yearFilter;

      return matchesSearch && matchesCourse && matchesYear;
    });
  }, [enrollments, searchTerm, courseFilter, yearFilter]);

  const addEnrollment = (newEnrollment) => {
    const enrollment = {
      ...newEnrollment,
      id: Date.now()
    };

    setEnrollments((current) => [...current, enrollment]);
    setShowForm(false);
  };

  const updateEnrollment = (updatedEnrollment) => {
    setEnrollments((current) =>
      current.map((enrollment) =>
        enrollment.id === updatedEnrollment.id
          ? updatedEnrollment
          : enrollment
      )
    );

    setEditingEnrollment(null);
    setShowForm(false);
  };

  const deleteEnrollment = () => {
    if (!deleteTarget) return;

    setEnrollments((current) =>
      current.filter(
        (enrollment) => enrollment.id !== deleteTarget.id
      )
    );

    setDeleteTarget(null);
  };

  const openAddForm = () => {
    setEditingEnrollment(null);
    setActiveView("students");
    setMobileMenuOpen(false);
    setShowForm(true);
  };

  const openEditForm = (enrollment) => {
    setEditingEnrollment(enrollment);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEnrollment(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCourseFilter("All Courses");
    setYearFilter("All Year Levels");
  };

  const hasFilters =
    searchTerm ||
    courseFilter !== "All Courses" ||
    yearFilter !== "All Year Levels";

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <a className="brand" href="#">
            <span className="brand-mark">C</span>

            <span className="brand-name">
              CourseFlow
            </span>
          </a>

          <nav
            className={`desktop-nav ${mobileMenuOpen ? "mobile-open" : ""}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            <button
              type="button"
              className={`nav-link ${activeView === "dashboard" ? "active" : ""}`}
              aria-current={activeView === "dashboard" ? "page" : undefined}
              onClick={() => {
                setActiveView("dashboard");
                setMobileMenuOpen(false);
              }}
            >
              Dashboard
            </button>

            <button
              type="button"
              className={`nav-link ${activeView === "students" ? "active" : ""}`}
              aria-current={activeView === "students" ? "page" : undefined}
              onClick={() => {
                setActiveView("students");
                setMobileMenuOpen(false);
              }}
            >
              Students
            </button>

            <button
              type="button"
              className={`nav-link nav-action ${showForm && !editingEnrollment ? "active" : ""}`}
              onClick={openAddForm}
            >
              Add Student
            </button>
          </nav>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>

          <div className="account-area">
            <div className="account-avatar">
              J
            </div>

            <div className="account-info">
              <strong>Jhonas</strong>
              <span>Administrator</span>
            </div>

            <button
              type="button"
              className="account-arrow"
              aria-label="Account menu"
            >
              ▾
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">
              {activeView === "dashboard" ? "STUDENT MANAGEMENT" : "STUDENT RECORDS"}
            </p>

            <h1>{activeView === "dashboard" ? "Good morning, Jhonas" : "Students"}</h1>

            <p className="welcome-text">
              {activeView === "dashboard"
                ? "Manage course enrollments and student records from one place."
                : "Search, review, and manage student enrollment records."}
            </p>
          </div>

          <button
            type="button"
            className="new-enrollment-button"
            onClick={openAddForm}
          >
            <span>+</span>
            {activeView === "dashboard" ? "New Enrollment" : "Add Student"}
          </button>
        </section>

        {activeView === "dashboard" && <section className="stats-grid">
          <div className="stat-card">
            <div>
              <span className="stat-label">
                Total Enrollments
              </span>

              <strong>{enrollments.length}</strong>

              <small>
                Student enrollment records
              </small>
            </div>

            <div className="stat-icon">
              EN
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span className="stat-label">
                Students
              </span>

              <strong>{enrollments.length}</strong>

              <small>
                Active student records
              </small>
            </div>

            <div className="stat-icon">
              ST
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span className="stat-label">
                Courses
              </span>

              <strong>{courses.length}</strong>

              <small>
                Programs represented
              </small>
            </div>

            <div className="stat-icon">
              CR
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span className="stat-label">
                Year Levels
              </span>

              <strong>
                {yearLevels.length}
              </strong>

              <small>
                Levels represented
              </small>
            </div>

            <div className="stat-icon">
              VI
            </div>
          </div>
        </section>}

        {activeView === "students" && <section
          className="enrollment-section"
          id="enrollments"
        >
          <div className="section-header">
            <div>
              <p className="eyebrow">
                ENROLLMENT MANAGEMENT
              </p>

              <h2>Student Directory</h2>

              <p>
                View, search, and manage student course
                enrollment records.
              </p>
            </div>

            <span className="record-indicator">
              {filteredEnrollments.length}{" "}
              {filteredEnrollments.length === 1
                ? "record"
                : "records"}
            </span>
          </div>

          <div className="filters">
            <div className="search-box">
              <span className="search-icon">
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search students, courses, or email"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            <select
              value={courseFilter}
              onChange={(e) =>
                setCourseFilter(e.target.value)
              }
            >
              <option>All Courses</option>

              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <select
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(e.target.value)
              }
            >
              <option>All Year Levels</option>

              {yearLevels.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {hasFilters && (
              <button
                type="button"
                className="clear-button"
                onClick={clearFilters}
              >
                Clear
              </button>
            )}
          </div>

          <EnrollmentList
            enrollments={filteredEnrollments}
            onDeleteEnrollment={setDeleteTarget}
            onEditEnrollment={openEditForm}
          />
        </section>}
      </main>

      <footer className="footer">
        <div>
          <strong>CourseFlow</strong>
          <span>
            Student Enrollment Management System
          </span>
        </div>

        <span>
          Academic Services
        </span>
      </footer>

      {showForm && (
        <EnrollmentForm
          onAddEnrollment={addEnrollment}
          editingEnrollment={editingEnrollment}
          onUpdateEnrollment={updateEnrollment}
          onCancelEdit={closeForm}
        />
      )}

      {deleteTarget && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setDeleteTarget(null)}
        >
          <div
            className="delete-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="delete-icon">
              !
            </div>

            <h2>Delete enrollment?</h2>

            <p>
              You are about to remove{" "}
              <strong>
                {deleteTarget.studentName}
              </strong>{" "}
              from the enrollment records.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-button"
                onClick={deleteEnrollment}
              >
                Delete Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;