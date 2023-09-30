import styles from './MembersBlock.module.scss';
import teamLogo from './../../../assets/final.png';
import MemberCard from '../../../components/MemberCard';
import useData from '../../../hooks/useData';

function MembersBlock() {
  const { teamArr, selectTeamNo } = useData();

  return (
    <section className={styles.bound}>
      <div className={styles.container}>
        <div className={styles.container__heading}>
          <div className={styles.heading__text}>
            <h2 className={styles['heading__text--header']}>
              Team {teamArr[selectTeamNo].id}
            </h2>
            <h6 className={styles['heading__text--subheader']}>
              {teamArr[selectTeamNo].members.length} members
            </h6>
          </div>
          <img src={teamLogo} alt='team logo' className={styles.heading__image}></img>
        </div>
        <div className={styles['flex-row']}>
          {teamArr[selectTeamNo].skills_needed.map((skill, idx) => {
            return <p key={idx}>{skill}</p>;
          })}
        </div>

        <div className={styles.container__body}>
          {teamArr[selectTeamNo].members.map((member, idx) => {
            return <MemberCard key={idx} member={member} team={teamArr[selectTeamNo]} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default MembersBlock;
