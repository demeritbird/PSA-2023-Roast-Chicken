import TeamCard from '../../../components/TeamCard';
import useData from '../../../hooks/useData';
import styles from './TeamsBlock.module.scss';

function TeamsBlock() {
  const { teamArr } = useData();

  return (
    <section className={styles.container}>
      <h2 className={styles.container__title}>Teams</h2>
      <div className={styles.container__body}>
        {teamArr.map((cur, idx) => {
          return <TeamCard team={cur} key={idx} />;
        })}
      </div>
    </section>
  );
}

export default TeamsBlock;
