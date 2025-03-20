import React, { useState } from 'react';

function Footer({ addTask }) {
  const [title, setTitle] = useState('');
  const [date_echeance, setDateEcheance] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [color, setColor] = useState('#ffffff'); // Valeur par défaut, couleur blanche

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      date_echeance,
      done: false,
      urgent,
      color, // Ajout de la couleur choisie
      contacts: [], // Vide par défaut
    };

    addTask(newTask);

    // Réinitialiser les champs après soumission
    setTitle('');
    setDateEcheance('');
    setUrgent(false);
    setColor('#ffffff'); // Réinitialiser la couleur à blanc
  };

  return (
    <div className="footer">
      <h3>Ajouter une nouvelle tâche</h3>
      <form onSubmit={handleSubmit}>
        <label>Titre de la tâche</label>
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
          required
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

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Footer;
