import { useState } from "react";

function StudentCards({
  name,
  id,
  course,
  year,
  onEdit,
  onDelete,
}) {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    <article className="student-card">

      <div className="student-content">

        <div className="student-header">

          <h3>
            {name}
          </h3>

          <span className="year-badge">
            {year}
          </span>

        </div>


        <div className="student-details">

          <span>
            ID:{" "}
            <strong>{id}</strong>
          </span>

          <span className="separator">
            •
          </span>

          <span>
            COURSE:{" "}
            <strong>{course}</strong>
          </span>

        </div>

      </div>


      <div className="card-actions">

        <button
          className="like-button"
          onClick={handleLike}
        >
          <span>♥</span>
          {likes}
        </button>


        <button
          className="edit-button"
          onClick={onEdit}
        >
          Edit
        </button>


        <button
          className="delete-button"
          onClick={onDelete}
        >
          Delete
        </button>

      </div>

    </article>
  );
}

export default StudentCards;