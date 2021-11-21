import React, {FC} from 'react';

const Inscript:FC = () => {
    return (
        <form className="inscription">
            <h1>Inscription</h1>
            <label>
                Nom d'utilisateur
                <input type="text" />
            </label>
            <label>
                Autres noms 
                <input type="text" />
            </label>
            <label>
                Mot de passe
                <input type="password" />
            </label>
            <label>
                Confirmez votre mot de passe
                <input type="password" />
            </label>
            <input type="submit" value="S'inscrire" />
        </form>
    );
};

export default Inscript;