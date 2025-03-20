import React from "react";

const TaskForm = ({ nouvelleTache, setNouvelleTache, ajouterTache }) => {
  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Ajouter une tâche..."
        value={nouvelleTache}
        onChange={(e) => setNouvelleTache(e.target.value)}
      />
      <button onClick={ajouterTache}>Ajouter</button>
    </div>
  );
};

export default TaskForm;
