import React, { useState } from "react";
import TaskEditForm from "./TaskEditForm";

const TaskItem = ({ tache, updateTask, deleteTask, toggleTaskStatus }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`task-item ${tache.done ? "task-done" : "task-in-progress"} ${
        tache.urgent ? "task-urgent" : ""
      }`}
      style={{ backgroundColor: tache.color }}
    >
      {isEditing ? (
        <TaskEditForm
          tache={tache}
          updateTask={updateTask}
          cancelEdit={cancelEdit}
        />
      ) : (
        <>
          <div className="task-title">
            <input
              type="checkbox"
              checked={tache.done}
              onChange={() => toggleTaskStatus(tache.id)}
            />
            {tache.title}
          </div>
          <div className="task-info">📅 Échéance : {tache.date_echeance}</div>
          <div className="task-info">🔥 Urgent : {tache.urgent ? "Oui" : "Non"}</div>
          <div className="task-info">
            ✅ Statut : {tache.done ? "Terminée" : "En cours"}
          </div>
          <button className="edit-btn" onClick={handleEditClick}>
            ✏️ Modifier
          </button>
          <button className="delete-btn" onClick={() => deleteTask(tache.id)}>
            ❌ Supprimer
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;