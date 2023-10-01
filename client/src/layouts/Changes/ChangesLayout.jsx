import { useEffect, useState } from 'react';
import useData from '../../hooks/useData';
import styles from './ChangesLayout.module.scss';
import ChangeCard from '../../components/ChangeCard';

function ChangesLayout() {
  const { teamArr, memberArr, result } = useData();
  const [newMemberArr, setNewMemberArr] = useState(memberArr);

  useEffect(() => {
    const filteredObject = {};
    let tempTeamArr = teamArr;
    let tempMemberArr = memberArr;

    Object.keys(result).forEach((key) => {
      if (!result[key].same) {
        filteredObject[key] = result[key];
      }
    });

    const filteredObjectEntries = Object.entries(filteredObject);
    filteredObjectEntries.forEach((entry) => {
      const [key, value] = entry;

      tempTeamArr.forEach((team) => {
        const memberWithId = team.members.find((member) => member.id === +key);
        if (memberWithId) {
          for (const key in tempMemberArr) {
            if (tempMemberArr[key].team === team.id) {
              tempMemberArr[key].proposedTeam = value.team;
            }
          }
        }
      });
    });

    const filteredArr = tempMemberArr.filter((item) => item.proposedTeam !== undefined);
    console.log(filteredArr, '!!');
    setNewMemberArr(filteredArr);
  }, []);

  useEffect(() => {
    console.log(newMemberArr);
  }, [newMemberArr]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {newMemberArr.length !== 0 &&
          newMemberArr.map((member, idx) => {
            return <ChangeCard member={member} key={idx} />;
          })}
      </div>
    </div>
  );
}

export default ChangesLayout;
