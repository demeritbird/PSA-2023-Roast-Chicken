import styles from "./TeamCard.module.scss";
import teamLogo from "./../../assets/final.png";
import useData from "../../hooks/useData";

function TeamCard(props) {
  const { team } = props;

  const { setSelectTeamNo } = useData();

  function selectTeamHandler() {
    setSelectTeamNo(team.id - 101);
  }

  return (
    <div className={styles.card}>
      <img src={teamLogo} alt="team card logo" className={styles.card__image} />
      <h3 className={styles.card__title}>Team {team.id}</h3>
      <p className={styles.card__subtitle}>{team.members.length} member(s)</p>
      {team.skills_needed.map((skill, idx) => {
        return <p key={idx}>{skill}</p>;
      })}
      <button
        className={styles["card__action-btn"]}
        onClick={selectTeamHandler}
      >
        More Details
      </button>
    </div>
  );
}

export default TeamCard;
