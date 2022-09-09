import React from "react";

import "./NotFound.styles.scss";

const NotFound = () => {
  return (
    <div className="error-page">
      <h1>Erro 404</h1>
      <p>Woops. Parece que essa pagina não existe.</p>
    </div>
  );
};

export default NotFound;
