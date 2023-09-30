import styles from './MemberCard.module.scss';
import teamLogo from './../../assets/final.png';

function MemberCard() {
  return (
    <div className={styles.card}>
      <div className={styles['flex-split-row']}>
        <div>
          <div className={styles['flex-split-row']}>
            <img src={teamLogo} alt='team logo' className={styles.card__image}></img>
            <div className={styles['flex-column-start']}>
              <h4 className={styles.card__title}>Team Member Name</h4>
              <p className={styles.card__subtitle}>Team Roast Chicken</p>
            </div>
          </div>
        </div>
        <div>Javascript</div>
      </div>
    </div>
  );
}
export default MemberCard;
