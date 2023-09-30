import styles from './SummaryBlock.module.scss';
import image from './../../../assets/undraw_photocopy.png';

function SummaryBlock() {
  return (
    <div className={styles.summary}>
      <div className={styles.summary__bound}>
        <div className={styles['summary__bound--ref']}>
          <img src={image} alt='fake' className={styles.summary__image} />
          <div className={styles.summary__content}>
            <h2 className={styles.summary__title}>Summary</h2>
            <div className={styles.content__body}>
              <div className={styles.content__tab}>
                <h4 className={styles.content__title}>4</h4>
                <p className={styles.content__subtitle}>teams</p>
              </div>
              <div className={styles.content__tab}>
                <h4 className={styles.content__title}>4</h4>
                <p className={styles.content__subtitle}>skills</p>
              </div>
              <div className={styles.content__tab}>
                <h4 className={styles.content__title}>4</h4>
                <p className={styles.content__subtitle}>users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryBlock;
