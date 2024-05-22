import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRickAndMortyCharacters, resetState } from "../store/rickandmortySlice";
import { AppDispatch, RootState } from "../store";
import CharacterCard from "../CharacterCard/CharacterCard";
import styles from "./CharacterList.module.scss";

const CharacterList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const { characters, status, error } = useSelector((state: RootState) => state.rickAndMorty);

    useEffect(() => {
        if (searchTerm.trim()) {
          dispatch(getRickAndMortyCharacters({ name: searchTerm, page }));
        } else {
            dispatch(resetState());
        }
      }, [dispatch, searchTerm, page]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    return(
        <div className={styles.list}>
            <h2>Rick and Morty Characters</h2>
            <input
                type="text"
                placeholder="Type for search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            {status === "loading" && <p>...loading</p>}
            {status === "failed" && <p className={styles.error}>{error}</p>}
            <ul className={styles.characters}>
                {(status !== "failed") && characters.map(({ id, name, status }) => 
                <CharacterCard key={id} name={name} description={status}/>
                )}
            </ul>
            <div className={styles.pagination}>
                <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                >Previous page</button>
                <button
                onClick={() => setPage(prev => prev + 1)}
                >Next page</button>
            </div>
        </div>
    );
};

export default CharacterList;