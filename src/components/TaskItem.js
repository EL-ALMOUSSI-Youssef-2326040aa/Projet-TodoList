// TaskItem.js
import React from 'react';

const TaskItem = ({ tache }) => {
  return (
    <div
      className={`task-item ${tache.done ? 'task-done' : 'task-in-progress'} ${tache.urgent ? 'task-urgent' : ''}`}
      style={{ backgroundColor: tache.color }} // Application de la couleur de fond
    >
      <div className="task-title">
        <input
          type="checkbox"
          checked={tache.done}
          onChange={() => {} /* Gérer la mise à jour du statut de la tâche ici */}
        />
        {tache.title}
      </div>
      <div className="task-info">📅 Échéance : {tache.date_echeance}</div>
      <div className="task-info">🔥 Urgent : {tache.urgent ? 'Oui' : 'Non'}</div>
      <div className="task-info">✅ Statut : {tache.done ? 'Terminée' : 'En cours'}</div>
      {tache.contacts.length > 0 && (
        <div className="task-contacts">👤 Contacts : {tache.contacts.map((c) => c.name).join(', ')}</div>
      )}
    </div>
  );
};

export default TaskItem;
