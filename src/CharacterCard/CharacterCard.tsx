import React from "react";
import styles from "./CharacterCard.module.scss";

interface CharacterCardProps {
    name: string;
    description: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, description }) => {
    return (
        <li className={styles.card}>
            <h3>{name}</h3>
            <p>{description}</p>
        </li>
    );
};

export default CharacterCard;