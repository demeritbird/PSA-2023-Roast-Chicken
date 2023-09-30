import TeamCard from '../../../components/TeamCard';
import styles from './TeamsBlock.module.scss';

function TeamsBlock() {
  return (
    <section className={styles.container}>
      <h2 className={styles.container__title}>Teams</h2>
      <div className={styles.container__body}>
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </section>
  );
}

export default TeamsBlock;
