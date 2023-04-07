import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <section className={styles.notFoundContainer}>
            <h3 className={styles.notFoundMessage}>404 Not Found</h3>
            <img src="https://drive.google.com/uc?id=1DbnSESiVfzyDDaMf1ABmlTTtLYowtt0r" alt="MetniMe 404 Not Found" />
        </section>
    );
};