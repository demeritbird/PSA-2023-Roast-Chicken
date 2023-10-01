import { createContext, useState } from 'react';

function assignMembersToTeam(arr, teamId) {
  return arr.filter((member) => member.team === teamId);
}

const initialMemberArr = [
  { id: 1, name: 'john', skills: ['javascript'], team: 101 },
  { id: 2, name: 'jane', skills: ['python'], team: 102 },
  { id: 3, name: 'alice', skills: ['java', 'spring'], team: 103 },
  { id: 4, name: 'bob', skills: ['c++', 'qt'], team: 104 },
  { id: 5, name: 'charlie', skills: ['ruby', 'rails'], team: 105 },
  { id: 6, name: 'dave', skills: ['php', 'laravel'], team: 106 },
  { id: 7, name: 'eve', skills: ['go'], team: 107 },
  { id: 8, name: 'frank', skills: ['rust'], team: 108 },
  { id: 9, name: 'grace', skills: ['typescript', 'angular'], team: 109 },
  { id: 10, name: 'hank', skills: ['swift'], team: 110 },
];

const initialTeamArr = [
  {
    id: 101,
    skills_needed: ['java'],
    members: assignMembersToTeam(initialMemberArr, 101),
  },
  {
    id: 102,
    skills_needed: ['python'],
    members: assignMembersToTeam(initialMemberArr, 102),
  },
  {
    id: 103,
    skills_needed: ['javascript', 'spring'],
    members: assignMembersToTeam(initialMemberArr, 103),
  },
  {
    id: 104,
    skills_needed: ['c++'],
    members: assignMembersToTeam(initialMemberArr, 104),
  },
  {
    id: 105,
    skills_needed: ['ruby'],
    members: assignMembersToTeam(initialMemberArr, 105),
  },
  {
    id: 106,
    skills_needed: ['php'],
    members: assignMembersToTeam(initialMemberArr, 106),
  },
  {
    id: 107,
    skills_needed: ['go'],
    members: assignMembersToTeam(initialMemberArr, 107),
  },
  {
    id: 108,
    skills_needed: ['rust'],
    members: assignMembersToTeam(initialMemberArr, 108),
  },
  {
    id: 109,
    skills_needed: ['typescript'],
    members: assignMembersToTeam(initialMemberArr, 109),
  },
  {
    id: 110,
    skills_needed: ['swift', 'typescript', 'angular'],
    members: assignMembersToTeam(initialMemberArr, 110),
  },
];

const DataContext = createContext({
  memberArr: [],
  setMemberArr: () => {},
  teamArr: [],
  setTeamArr: () => {},
  selectTeamNo: 0,
  setSelectTeamNo: () => {},
  result: [],
  setResult: () => {},
});

export function DataProvider(props) {
  const [memberArr, setMemberArr] = useState(initialMemberArr);
  const [teamArr, setTeamArr] = useState(initialTeamArr);
  const [selectTeamNo, setSelectTeamNo] = useState(0);
  const [result, setResult] = useState([]);

  const dataContextValue = {
    memberArr: memberArr,
    setMemberArr: setMemberArr,
    teamArr: teamArr,
    setTeamArr: setTeamArr,
    selectTeamNo: selectTeamNo,
    setSelectTeamNo: setSelectTeamNo,
    result: result,
    setResult: setResult,
  };

  return (
    <DataContext.Provider value={dataContextValue}>{props.children}</DataContext.Provider>
  );
}

export default DataContext;
