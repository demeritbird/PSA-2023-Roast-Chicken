import styles from './ChangeCard.module.scss';
import teamLogo from './../../assets/final.png';
import useData from '../../hooks/useData';

function ChangeCard(props) {
  const { member } = props;
  const { teamArr } = useData();

  const matchingObject1 = teamArr.find((item) => item.id === member.team);
  const matchingObject2 = teamArr.find((item) => item.id === member.proposedTeam);

  return (
    <div className={styles.card}>
      <div className={styles['flex-split-row']}>
        <div>
          <div className={styles['flex-split-row']}>
            <img src={teamLogo} alt='team logo' className={styles.card__image}></img>
            <div className={styles['flex-column-start']}>
              <h4 className={styles.card__title}>{member.name}</h4>
              <p className={styles.card__subtitle}>Old Team: {member.team}</p>
            </div>
          </div>
        </div>
        <div>
          {/* <p>skills got: {member.skills[0]}</p> */}
          <p className={styles['flex-row']}>
            {matchingObject1.skills_needed.map((skillNeed, idx) => {
              return (
                <p key={idx}>
                  {skillNeed}{' '}
                  {member.skills[0] === skillNeed ? <p>&#x2713;</p> : <p>&#x2717;</p>}
                </p>
              );
            })}
          </p>
        </div>
      </div>
      <div class={styles.arrow}>&#x2192;</div>
      <div className={styles['flex-split-row']}>
        <div>
          <div className={styles['flex-split-row']}>
            <img src={teamLogo} alt='team logo' className={styles.card__image}></img>
            <div className={styles['flex-column-start']}>
              <h4 className={styles.card__title}>{member.name}</h4>
              <p className={styles.card__subtitle}>
                New Team:{' '}
                <span className={styles['card__subtitle--new']}>{member.proposedTeam}</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* <p>skills got: {member.skills[0]}</p> */}
          <p>
            {/* {matchingObject2.skills_needed.map((skillNeed, idx) => {
              return (
                <p key={idx}>
                  {skillNeed} {member.skills[0] === skillNeed ? 'yes' : 'no'}
                </p>
              );
            })} */}
            <p className={styles['flex-row']}>
              {matchingObject2?.skills_needed[0]}{' '}
              {member.skills[0] === matchingObject2?.skills_needed[0] ? (
                <p>&#x2713;</p>
              ) : (
                <p>&#x2717;</p>
              )}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChangeCard;
