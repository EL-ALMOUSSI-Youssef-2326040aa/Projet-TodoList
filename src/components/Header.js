import React from 'react';

function Header({ taches }) {
  // Compter le nombre de tâches en cours
  const tasksInProgress = taches.filter((task) => !task.done).length;
  const totalTasks = taches.length;

  return (
    <header className="header">
      <h1 className="todo-title">TodoList</h1>
    </header>
  );
}

export default Header;
