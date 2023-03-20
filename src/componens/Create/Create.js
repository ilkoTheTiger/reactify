import styles from './Create.module.css';

export const Create = () => {
    return (
        <>
        <form class={styles.create}>
            <div>
                <label htmlFor='From'>From</label>
                <input type='text' name='from' id='from' />
            </div>

            <div>
                <input type='submit' value='Host' />
            </div>
        </form>
        </>
    );
};