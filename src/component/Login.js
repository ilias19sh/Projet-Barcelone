import React, { useState } from "react";
import "./Login.css"; 
import { postToDirectus, loginUser } from "./api"; // Ajout de loginUser

const Login = () => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState(""); // Ajout d'un état pour first_name

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    alert(`Un lien de réinitialisation a été envoyé à ${email}`);
    setEmail(""); 
  };

  const userData = {
    name: 'zevev',
    first_name: 'egv',
    mail: 'evqev@evev',
    password: '123'
};

const handleSignUp = async () => {
    try {
        const response = await postToDirectus(userData, 'clients'); // La collection doit être une chaîne
        console.log('Utilisateur créé avec succès:', response);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
};

handleSignUp();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password); // Appel à la fonction de connexion
      console.log("Utilisateur connecté:", response);
      alert("Connexion réussie !");
      // Ici, tu peux ajouter une logique pour rediriger l'utilisateur vers une autre page ou stocker des informations d'utilisateur
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur de connexion. Veuillez vérifier vos identifiants.");
    }
  };

  const renderLoginForm = () => (
    <div className="form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}> {/* Ajout de handleLogin ici */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>
          <a href="#" onClick={() => setView("signup")}>Créer un compte</a>
        </p>
        <p>
          <a href="#" onClick={() => setView("forgot")}>Mot de passe oublié ?</a>
        </p>
      </div>
    </div>
  );

  const renderSignUpForm = () => (
    <div className="form-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmer le mot de passe</label>
          <input type="password" required />
        </div>
        <button type="submit">Créer un compte</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>
          <a href="#" onClick={() => setView("login")}>Vous avez déjà un compte ? Se connecter</a>
        </p>
      </div>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="form-container">
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>
          <a href="#" onClick={() => setView("login")}>Retour à la connexion</a>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {view === "login" && renderLoginForm()}
      {view === "signup" && renderSignUpForm()}
      {view === "forgot" && renderForgotPasswordForm()}
    </div>
  );
};

export default Login;