import styles from './TeamCard.module.scss';
import teamLogo from './../../assets/final.png';

const skillsArray = ['JavaScript', 'CSS', 'Management'];

function TeamCard() {
  return (
    <div className={styles.card}>
      <img src={teamLogo} alt='team card logo' className={styles.card__image} />
      <h3 className={styles.card__title}>Roast Chicken</h3>
      <p className={styles.card__subtitle}>5 members</p>
      {skillsArray.map((skill, idx) => {
        return <p key={idx}>{skill}</p>;
      })}
      <button className={styles['card__action-btn']}>More Details</button>
    </div>
  );
}

export default TeamCard;
