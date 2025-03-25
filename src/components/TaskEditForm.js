import React, { useState } from "react";
import todos from "../data/todoList.json"; // Importer les catégories depuis le fichier JSON

const TaskEditForm = ({ tache, updateTask, cancelEdit }) => {
  const [title, setTitle] = useState(tache.title);
  const [date_echeance, setDateEcheance] = useState(tache.date_echeance);
  const [urgent, setUrgent] = useState(tache.urgent);
  const [color, setColor] = useState(tache.color);
  const [categorie, setCategorie] = useState(tache.categorie || ""); // Ajouter l'état pour la catégorie

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...tache, title, date_echeance, urgent, color, categorie });
    cancelEdit(); // Fermer le formulaire d'édition après la mise à jour
  };

  return (
    <form onSubmit={handleSubmit} className="task-edit-form">
      <label>Titre</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Échéance</label>
      <input
        type="date"
        value={date_echeance}
        onChange={(e) => setDateEcheance(e.target.value)}
      />

      <label>Urgent</label>
      <input
        type="checkbox"
        checked={urgent}
        onChange={() => setUrgent(!urgent)}
      />

      <label>Couleur</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <label>Catégorie</label>
      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        required
      >
        <option value="">-- Choisir une catégorie --</option>
        {todos.categories.map((cat) => (
          <option key={cat.id} value={cat.title}>
            {cat.title}
          </option>
        ))}
      </select>

      <button type="submit">Enregistrer</button>
      <button type="button" onClick={cancelEdit}>
        Annuler
      </button>
    </form>
  );
};

export default TaskEditForm;