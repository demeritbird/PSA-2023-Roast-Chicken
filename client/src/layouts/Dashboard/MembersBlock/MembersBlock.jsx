import styles from './MembersBlock.module.scss';
import teamLogo from './../../../assets/final.png';
import MemberCard from '../../../components/MemberCard';

const skillsArray = ['JavaScript', 'CSS', 'Management'];

function MembersBlock() {
  return (
    <section className={styles.bound}>
      <div className={styles.container}>
        <div className={styles.container__heading}>
          <div className={styles.heading__text}>
            <h2 className={styles['heading__text--header']}>Roast Chicken</h2>
            <h6 className={styles['heading__text--subheader']}>5 members</h6>
          </div>
          <img src={teamLogo} alt='team logo' className={styles.heading__image}></img>
        </div>
        <div className={styles['flex-row']}>
          {skillsArray.map((skill) => {
            return <p>{skill}</p>;
          })}
        </div>

        <div className={styles.container__body}>
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      </div>
    </section>
  );
}

export default MembersBlock;
