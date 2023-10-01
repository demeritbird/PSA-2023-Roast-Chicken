import styles from './MemberCard.module.scss';
import teamLogo from './../../assets/final.png';

function MemberCard(props) {
  const { member, team } = props;

  return (
    <div className={styles.card}>
      <div className={styles['flex-split-row']}>
        <div>
          <div className={styles['flex-split-row']}>
            <img src={teamLogo} alt='team logo' className={styles.card__image}></img>
            <div className={styles['flex-column-start']}>
              <h4 className={styles.card__title}>{member.name}</h4>
              <p className={styles.card__subtitle}>Team {team.id}</p>
            </div>
          </div>
        </div>
        <div>
          {member.skills.map((skill, idx) => {
            return <p key={idx}>{skill}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
export default MemberCard;
