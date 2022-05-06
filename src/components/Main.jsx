import { useEffect, useState } from 'react';

import Candidate from './Candiate';
import candidates from '../data/candidates.json';
import technologies from '../data/technologies.json';
import Accepted from './Accepted';

export default function Main() {
  // List of all candidates satisfying all the filters
  const [filteredList, setFilteredList] = useState(candidates);
  // Selected stack filter
  const [selectedStack, setSelectedStack] = useState('');
  // Selected years of experience filter
  const [selectedExperience, setSelectedExperience] = useState();

  const filterByStack = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedStack) {
      return filteredData;
    }

    const filteredCandidates = filteredData.filter(
      (can) =>
        can.experience[0].technologyId.split(' ').indexOf(selectedStack) !== -1
    );
    return filteredCandidates;
  };
  const filterByExperience = (filteredData) => {
    // Avoid filter for null value
    if (!selectedExperience) {
      return filteredData;
    }

    const filteredCandidates = filteredData.filter(
      (can) => can.experience[0].yearsOfExperience >= selectedExperience
    );
    return filteredCandidates;
  };

  // Update seletedStack state
  const handleStackChange = (event) => {
    setSelectedStack(event.target.value);
  };

  // Update seletedExperience state
  const handleExperienceChange = (event) => {
    const inputExperience = Number(event.target.id);

    if (inputExperience === selectedExperience) {
      setSelectedExperience('');
    } else {
      setSelectedExperience(inputExperience);
    }
  };

  useEffect(() => {
    var filteredData = filterByStack(candidates);
    filteredData = filterByExperience(filteredData);
    setFilteredList(filteredData);
  }, [selectedStack, selectedExperience]);

  return (
    <div className='main'>
      <div className='stack-filter'>
        <div>Filter by Stack :&nbsp;</div>
        <select
          className='select'
          value={selectedStack}
          onChange={handleStackChange}>
          <option value=''>All</option>
          {technologies.map((tech) => (
            <option key={tech.guid} value={tech.guid}>
              {tech.name}
            </option>
          ))}
        </select>
      </div>
      <div className='year-options' onClick={handleExperienceChange}>
        <div
          className={
            selectedExperience === 3 ? 'active-option' : 'filter-option'
          }
          id='3'>
          More than 3 years
        </div>
        <div
          className={
            selectedExperience === 5 ? 'active-option' : 'filter-option'
          }
          id='5'>
          More than 5 years
        </div>
        <div
          className={
            selectedExperience === 8 ? 'active-option' : 'filter-option'
          }
          id='8'>
          More than 8 years
        </div>
      </div>
      <div className='list-container'>
        <div className='list'>
          {filteredList.map((candidate) => (
            <Candidate key={candidate.candidateId} candidate={candidate} />
          ))}
        </div>
        <Accepted />
      </div>
    </div>
  );
}
