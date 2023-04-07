import { useCommuteContext } from '../../contexts/CommuteContext';

import styles from './Home.module.css';
import { LatestCommute } from './LatestCommute/LatestCommute';

export const Home = () => {
    const { latest } = useCommuteContext();
    return (
        <>
            <section className={styles.homeSection}>
                <img className={styles.backgroundImage} src="https://drive.google.com/uc?id=1JonN6UroNZidwcARZb2b39WB6agyZMZ0" alt="MetniMe 404 Not Found" />
                <h3 className={styles.homeMessage}>Welcome to MetniMe!</h3>
                <div className={styles.homeContainer}>
                    <h2>Latest Commutes</h2>
                    <article className={styles.cardsContainer}>
                        <div className={styles.commutesContainer}>
                            {latest.map(commute => <LatestCommute key={commute._id} {...commute} />)}
                        </div>
                        {latest.length === 0 && (
                            <p className="no-articles">No commutes available right now!</p>
                        )}
                    </article>
                </div>
            </section>
        </>
    );
};