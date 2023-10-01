import styles from "./StatsLayout.module.scss";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useContext, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { interpolateRainbow } from "d3-scale-chromatic";
import DataContext from "../../contexts/DataProvider";

function StatsLayout() {
  const { teamArr } = useContext(DataContext);
  const [highlight, setHighlight] = useState(null);

  const chartData = useMemo(() => {
    // Flatten the skills_needed arrays into one array
    const allSkills = teamArr.flatMap((team) => team.skills_needed);

    // Aggregate counts for each unique skill
    const skillCounts = allSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

    const skillKeys = Object.keys(skillCounts);
    const backgroundColors = skillKeys.map((_, i) =>
      interpolateRainbow(i / skillKeys.length)
    );
    const borderColors = backgroundColors.map((color) =>
      color.replace("rgb", "rgba").replace(")", ", 1)")
    );

    return {
      labels: Object.keys(skillCounts).map(
        (key) => `${key} (${skillCounts[key]})`
      ),
      datasets: [
        {
          label: "% of Skills Needed",
          data: Object.values(skillCounts),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  }, [teamArr]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: "Skills distribution among all projects (%)",
        font: {
          size: 20,
          color: "black", // Set the font color to black
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        position: "right",
        labels: {
          padding: 30, // adjust this value to your liking
        },
        onClick: function (event, legendItem, legend) {
          const ci = legend.chart;
          const index = legendItem.index;

          // Reset all borderWidths and borderColors to their original values
          const defaultBorderWidths = ci.data.datasets[0].data.map(() => 1); // assuming 1 was the original width
          const defaultBorderColors = ci.data.datasets[0].backgroundColor.map(
            (color) => color.replace("rgb", "rgba").replace(")", ", 1)")
          );

          ci.data.datasets[0].borderWidth = [...defaultBorderWidths];
          ci.data.datasets[0].borderColor = [...defaultBorderColors];

          if (highlight === index && index !== null) {
            setHighlight(null);
            ci.update();
            return;
          }
          // Increase the borderWidth for the clicked segment and set its borderColor
          const highlightWidth = 5; // For example, set it to 5; adjust as desired
          const highlightColor = "rgba(0, 0, 0, 1)"; // For example, pure black; adjust as desired

          ci.data.datasets[0].borderWidth[index] = highlightWidth;
          ci.data.datasets[0].borderColor[index] = highlightColor;

          setHighlight(index);

          // Update the chart to reflect the changes
          ci.update();
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const totalSkills = context.dataset.data.reduce(
              (acc, val) => acc + val,
              0
            );
            const skillValue = context.dataset.data[context.dataIndex];
            const percentage = ((skillValue / totalSkills) * 100).toFixed(2);
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className={styles.chart__container}>
      <div className={styles.chart__size}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default StatsLayout;
