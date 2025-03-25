import React, { useState } from 'react';
import todos from '../data/todoList.json'; // Importer les données JSON

function Footer({ addTask }) {
  const [activeTab, setActiveTab] = useState('task'); // Onglet actif : 'task' ou 'category'
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour afficher ou masquer le menu
  const [title, setTitle] = useState('');
  const [date_echeance, setDateEcheance] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [color, setColor] = useState('#ffffff'); // Valeur par défaut, couleur blanche
  const [categorie, setCategorie] = useState(''); // Catégorie sélectionnée
  const [newCategorie, setNewCategorie] = useState(''); // Nouvelle catégorie
  const [newCategorieColor, setNewCategorieColor] = useState('#cccccc'); // Couleur de la nouvelle catégorie

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title,
      date_echeance,
      urgent,
      color,
      categorie,
      done: false,
      contacts: [],
    };

    addTask(newTask);
    setTitle('');
    setDateEcheance('');
    setUrgent(false);
    setColor('#ffffff');
    setCategorie('');
    setIsMenuOpen(false); // Fermer le menu après la création
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategorie.trim() === '') return;

    todos.categories.push({
      id: Date.now(),
      title: newCategorie,
      description: '',
      color: newCategorieColor,
      icon: '',
    });

    setNewCategorie('');
    setNewCategorieColor('#cccccc');
    setIsMenuOpen(false); // Fermer le menu après la création
  };

  return (
    <div className="footer-bar">
      {/* Bouton principal */}
      <button
        className="add-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        +
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className="menu">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'task' ? 'active' : ''}`}
              onClick={() => setActiveTab('task')}
            >
              Créer une tâche
            </button>
            <button
              className={`tab ${activeTab === 'category' ? 'active' : ''}`}
              onClick={() => setActiveTab('category')}
            >
              Créer une catégorie
            </button>
          </div>

          {/* Contenu des onglets */}
          {activeTab === 'task' && (
            <form onSubmit={handleTaskSubmit}>
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
              >
                <option value="">-- Choisir une catégorie --</option>
                {todos.categories.map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <button type="submit">Ajouter la tâche</button>
            </form>
          )}

          {activeTab === 'category' && (
            <form onSubmit={handleCategorySubmit}>
              <label>Nom de la catégorie</label>
              <input
                type="text"
                placeholder="Nouvelle catégorie"
                value={newCategorie}
                onChange={(e) => setNewCategorie(e.target.value)}
                required
              />

              <label>Couleur de la catégorie</label>
              <input
                type="color"
                value={newCategorieColor}
                onChange={(e) => setNewCategorieColor(e.target.value)}
              />

              <button type="submit">Ajouter la catégorie</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Footer;