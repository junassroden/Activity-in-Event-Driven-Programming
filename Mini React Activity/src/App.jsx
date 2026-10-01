import { useState } from "react";
import StudentCards from "./components/StudentCards";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Cabanero, Jhonas Roden S.",
      studentId: "2026-001",
      course: "BSIT",
      year: "3rd Year",
    },
    {
      id: 2,
      name: "Pascua, Jayoffe Harvey A.",
      studentId: "2026-002",
      course: "BSIT",
      year: "3rd Year",
    },
    {
      id: 3,
      name: "Legaspi, Deither M.",
      studentId: "2026-003",
      course: "BSIT",
      year: "3rd Year",
    },
    {
      id: 4,
      name: "Bejer, Rose Bien",
      studentId: "2026-004",
      course: "BSIT",
      year: "3rd Year",
    },
  ]);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // CREATE
  function addStudent(event) {
    event.preventDefault();

    if (!name || !studentId || !course || !year) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      studentId: studentId,
      course: course,
      year: year,
    };

    setStudents([...students, newStudent]);

    clearForm();
  }

  // DELETE
  function deleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    setStudents(
      students.filter((student) => student.id !== id)
    );
  }

  // EDIT
  function editStudent(student) {
    setEditingId(student.id);

    setName(student.name);
    setStudentId(student.studentId);
    setCourse(student.course);
    setYear(student.year);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // UPDATE
  function updateStudent(event) {
    event.preventDefault();

    if (!name || !studentId || !course || !year) {
      alert("Please fill in all fields.");
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === editingId
          ? {
              ...student,
              name: name,
              studentId: studentId,
              course: course,
              year: year,
            }
          : student
      )
    );

    setEditingId(null);

    clearForm();
  }

  // CLEAR FORM
  function clearForm() {
    setName("");
    setStudentId("");
    setCourse("");
    setYear("");
  }

  // CANCEL EDIT
  function cancelEdit() {
    setEditingId(null);
    clearForm();
  }

  // SEARCH
  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.studentId.toLowerCase().includes(searchValue) ||
      student.course.toLowerCase().includes(searchValue) ||
      student.year.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="app-container">

      {/* HEADER */}

      <header className="header">

        <div className="header-left">
          <p className="eyebrow">
            ACADEMIC PORTAL
          </p>

          <h1>
            Student Directory
          </h1>

          <p className="subtitle">
            Manage and view student records
          </p>
        </div>

        <div className="student-count">
          <span>{students.length}</span>
          <small>
            {students.length === 1
              ? "Student"
              : "Students"}
          </small>
        </div>

      </header>


      {/* ADD / EDIT FORM */}

      <section className="form-section">

        <div className="section-heading">

          <div>
            <h2>
              {editingId
                ? "Edit Student"
                : "Add Student"}
            </h2>

            <p>
              {editingId
                ? "Update the student's information."
                : "Enter student information below."}
            </p>
          </div>

        </div>


        <form
          className="student-form"
          onSubmit={
            editingId
              ? updateStudent
              : addStudent
          }
        >

          <div className="input-group">

            <label>
              Student Name
            </label>

            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>


          <div className="input-group">

            <label>
              Student ID
            </label>

            <input
              type="text"
              placeholder="2026-001"
              value={studentId}
              onChange={(event) =>
                setStudentId(event.target.value)
              }
            />

          </div>


          <div className="input-group">

            <label>
              Course
            </label>

            <input
              type="text"
              placeholder="BSIT"
              value={course}
              onChange={(event) =>
                setCourse(event.target.value)
              }
            />

          </div>


          <div className="input-group">

            <label>
              Year Level
            </label>

            <input
              type="text"
              placeholder="3rd Year"
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
            />

          </div>


          <div className="form-actions">

            <button
              className="primary-button"
              type="submit"
            >
              {editingId
                ? "Update Student"
                : "Add Student"}
            </button>


            {editingId && (
              <button
                className="secondary-button"
                type="button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>


      {/* STUDENT RECORDS */}

      <section className="directory-section">

        <div className="records-header">

          <div className="section-heading">

            <h2>
              Student Records
            </h2>

            <p>
              {filteredStudents.length} of{" "}
              {students.length} students
            </p>

          </div>


          {/* SEARCH */}

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>


        {/* STUDENT LIST */}

        <div className="student-list">

          {filteredStudents.length > 0 ? (

            filteredStudents.map((student) => (

              <StudentCards
                key={student.id}

                name={student.name}

                id={student.studentId}

                course={student.course}

                year={student.year}

                onEdit={() =>
                  editStudent(student)
                }

                onDelete={() =>
                  deleteStudent(student.id)
                }
              />

            ))

          ) : (

            <div className="no-results">

              <h3>
                No students found
              </h3>

              <p>
                Try searching using a different
                name, ID, course, or year.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default App;