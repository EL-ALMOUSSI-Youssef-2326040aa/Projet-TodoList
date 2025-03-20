import { useState } from 'react';
import './App.css';
import todos from './data/todoList.json';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [taches, setTaches] = useState(todos.taches || []);

  // Fonction pour ajouter une tâche
  const addTask = (newTask) => {
    setTaches((prevTaches) => [...prevTaches, newTask]); // Ajouter la tâche à l'état
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (taskId) => {
    setTaches((prevTaches) => prevTaches.filter(tache => tache.id !== taskId));
  };

  // Fonction pour mettre à jour le statut de la tâche
  const toggleTaskStatus = (taskId) => {
    setTaches((prevTaches) =>
      prevTaches.map((tache) =>
        tache.id === taskId ? { ...tache, done: !tache.done } : tache
      )
    );
  };

  return (
    <div className="App">
      <Header taches={taches} />
      <div className="task-container">
        <h3>Liste des tâches :</h3>
        <ul className="task-list">
          {taches.map((tache) => (
            <li
              key={tache.id}
              className={`task-item ${tache.done ? 'task-done' : 'task-in-progress'} ${tache.urgent ? 'task-urgent' : ''}`}
              style={{ backgroundColor: tache.color }} // Appliquer la couleur de la tâche
            >
              {/* Bouton de suppression */}
              <button
                className="delete-btn"
                onClick={() => deleteTask(tache.id)} // Appeler la fonction de suppression
              >
                ❌ Supprimer
              </button>

              <div className="task-title">
                <input
                  type="checkbox"
                  checked={tache.done}
                  onChange={() => toggleTaskStatus(tache.id)} // Changer le statut de la tâche
                />
                {tache.title}
              </div>
              <div className="task-info">📅 Échéance : {tache.date_echeance}</div>
              <div className="task-info">🔥 Urgent : {tache.urgent ? 'Oui' : 'Non'}</div>
              <div className="task-info">✅ Statut : {tache.done ? 'Terminée' : 'En cours'}</div>
              {tache.contacts.length > 0 && (
                <div className="task-contacts">👤 Contacts : {tache.contacts.map((c) => c.name).join(', ')}</div>
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
