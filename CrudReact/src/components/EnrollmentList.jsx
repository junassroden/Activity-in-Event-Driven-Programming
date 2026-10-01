function EnrollmentList({
  enrollments,
  onDeleteEnrollment,
  onEditEnrollment
}) {
  return (
    <section className="enrollment-list">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Student Records</p>
          <h2>Enrollment Directory</h2>
          <p>
            Review and manage the current student enrollment records.
          </p>
        </div>

        <div className="record-count">
          {enrollments.length}{" "}
          {enrollments.length === 1 ? "record" : "records"}
        </div>
      </div>

      {enrollments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-mark">—</div>

          <h3>No enrollment records found</h3>

          <p>
            There are no students matching the current search or
            filter.
          </p>
        </div>
      ) : (
        <>
          <div className="desktop-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Year Level</th>
                  <th>Email Address</th>
                  <th className="actions-heading">Actions</th>
                </tr>
              </thead>

              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>
                      <div className="student-cell">
                        <div className="student-initial">
                          {enrollment.studentName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{enrollment.studentName}</strong>
                          <span>
                            Enrollment #{enrollment.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="course-name">
                        {enrollment.course}
                      </span>
                    </td>

                    <td>
                      <span className="year-badge">
                        {enrollment.yearLevel}
                      </span>
                    </td>

                    <td>
                      <span className="email-address">
                        {enrollment.email}
                      </span>
                    </td>

                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() =>
                            onEditEnrollment(enrollment)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            onDeleteEnrollment(enrollment)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-records">
            {enrollments.map((enrollment) => (
              <article
                className="mobile-record"
                key={enrollment.id}
              >
                <div className="mobile-record-header">
                  <div className="student-cell">
                    <div className="student-initial">
                      {enrollment.studentName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>{enrollment.studentName}</strong>
                      <span>
                        Enrollment #{enrollment.id}
                      </span>
                    </div>
                  </div>

                  <span className="year-badge">
                    {enrollment.yearLevel}
                  </span>
                </div>

                <div className="mobile-record-details">
                  <div>
                    <span>Course</span>
                    <strong>{enrollment.course}</strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>{enrollment.email}</strong>
                  </div>
                </div>

                <div className="mobile-record-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() =>
                      onEditEnrollment(enrollment)
                    }
                  >
                    Edit Record
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      onDeleteEnrollment(enrollment)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default EnrollmentList;