import styles from "./ChangeCard.module.scss";
import teamLogo from "./../../assets/final.png";

function ChangeCard(props) {
  const { member } = props;

  console.log(member);

  return (
    <div className={styles.card}>
      <div className={styles["flex-split-row"]}>
        <div>
          <div className={styles["flex-split-row"]}>
            <img
              src={teamLogo}
              alt="team logo"
              className={styles.card__image}
            ></img>
            <div className={styles["flex-column-start"]}>
              <h4 className={styles.card__title}>Team {member.team}</h4>
              <p className={styles.card__subtitle}>{member.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeCard;
