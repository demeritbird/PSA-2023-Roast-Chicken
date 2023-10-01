import { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import styles from "./ChangesLayout.module.scss";
import ChangeCard from "../../components/ChangeCard";

function ChangesLayout() {
  const { teamArr, memberArr, selectTeamNo, result } = useData();
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

    const filteredArr = tempMemberArr.filter(
      (item) => item.proposedTeam !== undefined
    );

    setNewMemberArr(filteredArr);
  }, []);

  useEffect(() => {
    console.log(teamArr);
    console.log(newMemberArr, "newMemberArr");
  }, [newMemberArr]);

  const NewGroupedMembers = newMemberArr.reduce((acc, member) => {
    if (!acc[member.team]) {
      acc[member.team] = [];
    }
    acc[member.team].push(member);
    return acc;
  }, {});

  return (
    // <div className={styles.background}>
    //   <div className={styles.container}>
    //     {memberArr[selectTeamNo].members.map((member, idx) => {
    //       return (
    //         <MemberCard
    //           key={idx}
    //           member={member}
    //           team={memberArr[selectTeamNo]}
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
    <div className={styles.background}>
      <div className={styles.container}>
        {/* {Object.entries(NewGroupedMembers).map(([team, teamMembers]) => {
          teamMembers.map((member) => (
            <ChangeCard key={member.id} member={member} team={team} />
          ));
        })} */}
        {newMemberArr.map((member, idx) => {
          return <ChangeCard key={idx} member={member} />;
          // console.log(member);
          // console.log(teamArr[selectTeamNo]);
        })}
      </div>
    </div>
  );
}

// console.log(member.id)

export default ChangesLayout;
