import styles from './Home.module.css';

export const Home = () => {
    return (
        <section className={styles.notFoundContainer}>
            <h3 className={styles.notFoundMessage}>Home</h3>
            <img src="https://drive.google.com/uc?id=1t6tA8OkRDP5qwOAz5pU_6IgN8AZYZksl" alt="MetniMe 404 Not Found" />
        </section>
    );
};