import useData from '../../hooks/useData';
import styles from './DashboardLayout.module.scss';
import MembersBlock from './MembersBlock';
import SummaryBlock from './SummaryBlock';
import TeamsBlock from './TeamsBlock/TeamsBlock';

function DashboardLayout() {
  return (
    <div className={styles.bound}>
      <div className={styles.bound__left}>
        <div className={styles['scroll-layout__mask']}>
          <div className={styles['scroll-layout__body']}>
            <SummaryBlock />
            <TeamsBlock />
          </div>
        </div>
      </div>
      <div className={styles.bound__right}>
        <MembersBlock />
      </div>
    </div>
  );
}

export default DashboardLayout;
