import React, { useState } from 'react';
import todos from '../data/todoList.json'; // Importer les données JSON

function Footer({ addTask }) {
  const [title, setTitle] = useState('');
  const [date_echeance, setDateEcheance] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [color, setColor] = useState('#ffffff'); // Valeur par défaut, couleur blanche
  const [categorie, setCategorie] = useState(''); // Nouvelle catégorie

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title,
      date_echeance,
      urgent,
      color,
      categorie, // Ajouter la catégorie
      done: false,
      contacts: [],
    };

    addTask(newTask);
    setTitle('');
    setDateEcheance('');
    setUrgent(false);
    setColor('#ffffff');
    setCategorie(''); // Réinitialiser la catégorie
  };

  return (
    <div className="footer">
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Footer;