import styles from './Catalog.module.css';
import { CatalogItem } from './CatalogItem/CatalogItem';

export const Catalog = ({
    commutes
}) => {
    return (
        <section className={styles.catalogContainer}>
            <h2>Find a Commute</h2>

            {commutes.map(commute => <CatalogItem key={commute._id} {...commute} />)}

            {commutes.length === 0 && (
                <h3 className={styles.noCommutes}>No commutes right now.</h3>
            )}
        </section>
    );
};