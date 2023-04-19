import { useCommuteContext } from '../../contexts/CommuteContext';

import styles from './Catalog.module.css';
import { CatalogItem } from './CatalogItem/CatalogItem';

export const Catalog = () => {
    const {commutes} = useCommuteContext();
    document.title = 'MetniMe - Commutes'
    return (
        <section className={styles.catalogContainer}>
            <h2>Find a Commute</h2>
            <div className={styles.commutesContainer}>
                {commutes.map(commute => <CatalogItem key={commute._id} {...commute} />)}
            </div>
            {commutes.length === 0 && (
                <h3 className={styles.noCommutes}>No commutes right now.</h3>
            )}
        </section>
    );
};