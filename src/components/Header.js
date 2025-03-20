import React from "react";

const Header = ({ taches }) => {
  const nbTache = taches.length;
  const nbTachesEncours = taches.filter((tache) => !tache.done).length;

  return (
    <div style={{ backgroundColor: "yellowgreen", width: "100%" }}>
      <div>LOGO</div>
      <div>
        {nbTache} Taches, dont {nbTachesEncours} en cours.
      </div>
    </div>
  );
};

export default Header;
