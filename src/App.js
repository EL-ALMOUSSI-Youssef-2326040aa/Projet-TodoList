import { useState } from 'react';
import './App.css';
import todos from './data/todoList.json';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskEditForm from './components/TaskEditForm';

function App() {
  const [taches, setTaches] = useState(todos.taches || []);
  const [editingTaskId, setEditingTaskId] = useState(null); // ID de la tâche en cours d'édition
  const [sortCriteria, setSortCriteria] = useState('date_echeance'); // Critère de tri par défaut
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche

  // Fonction pour ajouter une tâche
  const addTask = (newTask) => {
    setTaches((prevTaches) => [...prevTaches, newTask]); // Ajouter la tâche à l'état
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (taskId) => {
    setTaches((prevTaches) => prevTaches.filter((tache) => tache.id !== taskId));
  };

  // Fonction pour mettre à jour une tâche
  const updateTask = (updatedTask) => {
    setTaches((prevTaches) =>
      prevTaches.map((tache) =>
        tache.id === updatedTask.id ? { ...tache, ...updatedTask } : tache
      )
    );
    setEditingTaskId(null); // Quitter le mode édition après la mise à jour
  };

  // Fonction pour mettre à jour le statut de la tâche
  const toggleTaskStatus = (taskId) => {
    setTaches((prevTaches) =>
      prevTaches.map((tache) =>
        tache.id === taskId ? { ...tache, done: !tache.done } : tache
      )
    );
  };

  // Fonction pour trier les tâches
  const sortTasks = (tasks, criteria) => {
    switch (criteria) {
      case 'date_echeance':
        return [...tasks].sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
      case 'urgent':
        return [...tasks].sort((a, b) => b.urgent - a.urgent);
      case 'done':
        return [...tasks].sort((a, b) => a.done - b.done);
      default:
        return tasks;
    }
  };

  // Fonction pour filtrer les tâches par recherche
  const filterTasks = (tasks, query) => {
    if (!query) return tasks;
    return tasks.filter((tache) =>
      tache.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="App">
      <Header taches={taches} />
      <div className="task-container">
        <h3>Liste des tâches :</h3>

        {/* Champ de recherche */}
        <div className="search-container">
          <label htmlFor="search">Rechercher :</label>
          <input
            type="text"
            id="search"
            placeholder="Rechercher une tâche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Menu de tri */}
        <div className="sort-container">
          <label htmlFor="sort">Trier par :</label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="date_echeance">Date d'échéance</option>
            <option value="urgent">Urgence</option>
            <option value="done">Statut (Non terminée en premier)</option>
          </select>
        </div>

        {/* Liste des tâches */}
        <ul className="task-list">
          {filterTasks(sortTasks(taches, sortCriteria), searchQuery).map((tache) => (
            <li
              key={tache.id}
              className={`task-item ${tache.done ? 'task-done' : 'task-in-progress'} ${
                tache.urgent ? 'task-urgent' : ''
              }`}
              style={{ backgroundColor: tache.color }}
            >
              {editingTaskId === tache.id ? (
                <TaskEditForm
                  tache={tache}
                  updateTask={updateTask}
                  cancelEdit={() => setEditingTaskId(null)}
                />
              ) : (
                <>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(tache.id)}
                  >
                    ❌ Supprimer
                  </button>
                  <div className="task-title">
                    <input
                      type="checkbox"
                      checked={tache.done}
                      onChange={() => toggleTaskStatus(tache.id)}
                    />
                    {tache.title}
                  </div>
                  <div className="task-info">📅 Échéance : {tache.date_echeance}</div>
                  <div className="task-info">🔥 Urgent : {tache.urgent ? 'Oui' : 'Non'}</div>
                  <div className="task-info">📂 Catégorie : {tache.categorie || 'Non spécifiée'}</div>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingTaskId(tache.id)}
                  >
                    ✏️ Modifier
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer pour ajouter une tâche */}
      <Footer addTask={addTask} />
    </div>
  );
}

export default App;