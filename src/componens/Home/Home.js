import styles from './Home.module.css';

export const Home = () => {
    return (
        <section className={styles.notFoundContainer}>
            <h3 className={styles.notFoundMessage}>Home</h3>
            <img className={styles.backgroundImage} src="https://drive.google.com/uc?id=1JonN6UroNZidwcARZb2b39WB6agyZMZ0" alt="MetniMe 404 Not Found" />
            <div className={styles.homeContainer}>
                <h1>Latest Commutes</h1>
                <article className={styles.cardsContainer}>
                    {/* <!-- Display div: with information about every game (if any) --> */}
                    <div className={styles.commuteCard}>
                        <div className="image-wrap">
                            <img src="./images/CoverFire.png" />
                        </div>
                        <h3>Cover Fire</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <a href="#" className="btn details-btn">Details</a>
                        </div>
                    </div>
                    <div className={styles.commuteCard}>
                        <div className="image-wrap">
                            <img src="./images/CoverFire.png" />
                        </div>
                        <h3>Cover Fire</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <a href="#" className="btn details-btn">Details</a>
                        </div>
                    </div>
                    <div className={styles.commuteCard}>
                        <div className="image-wrap">
                            <img src="./images/CoverFire.png" />
                        </div>
                        <h3>Cover Fire</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <a href="#" className="btn details-btn">Details</a>
                        </div>
                    </div>
                    
                </article>
                {/* <!-- Display paragraph: If there is no games  --> */}
                <p className="no-articles">No commutes available right now!</p>
            </div>
        </section>
    );
};