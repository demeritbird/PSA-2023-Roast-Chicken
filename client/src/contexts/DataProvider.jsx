import { createContext, useState } from 'react';

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
    members: [{ id: 1, name: 'john', skills: 'javascript', team: 101 }],
  },
  {
    id: 102,
    skills_needed: ['python'],
    members: [{ id: 2, name: 'jane', skills: ['python'], team: 102 }],
  },
  {
    id: 103,
    skills_needed: ['javascript', 'spring'],
    members: [{ id: 3, name: 'alice', skills: ['java', 'spring'], team: 103 }],
  },
  {
    id: 104,
    skills_needed: ['c++'],
    members: [{ id: 4, name: 'bob', skills: ['c++', 'qt'], team: 104 }],
  },
  {
    id: 105,
    skills_needed: ['ruby'],
    members: [{ id: 5, name: 'charlie', skills: ['ruby', 'rails'], team: 105 }],
  },
  {
    id: 106,
    skills_needed: ['php'],
    members: [{ id: 6, name: 'dave', skills: ['php', 'laravel'], team: 106 }],
  },
  {
    id: 107,
    skills_needed: ['go'],
    members: [{ id: 7, name: 'eve', skills: ['go'], team: 107 }],
  },
  {
    id: 108,
    skills_needed: ['rust'],
    members: [{ id: 8, name: 'frank', skills: ['rust'], team: 108 }],
  },
  {
    id: 109,
    skills_needed: ['typescript'],
    members: [{ id: 9, name: 'grace', skills: ['typescript', 'angular'], team: 109 }],
  },
  {
    id: 110,
    skills_needed: ['swift', 'typescript', 'angular'],
    members: [{ id: 10, name: 'hank', skills: ['swift'], team: 110 }],
  },
];

const DataContext = createContext({
  memberArr: [],
  setMemberArr: () => {},
  teamArr: 'false',
  setTeamArr: () => {},
});

export function DataProvider(props) {
  const [memberArr, setMemberArr] = useState(initialMemberArr);
  const [teamArr, setTeamArr] = useState(initialTeamArr);

  const dataContextValue = {
    memberArr: memberArr,
    setMemberArr: setMemberArr,
    teamArr: teamArr,
    setTeamArr: setTeamArr,
  };

  return (
    <DataContext.Provider value={dataContextValue}>{props.children}</DataContext.Provider>
  );
}

export default DataContext;
