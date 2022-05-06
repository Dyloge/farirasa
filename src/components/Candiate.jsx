import React from 'react';
import technologies from '../data/technologies.json';

const Candidate = ({ candidate }) => {
  return (
    <div draggable className='card'>
      <img
        className='image'
        src={candidate.profilePicture}
        alt={candidate.fullName}
      />
      <div>
        <div className='name'>{candidate.fullName}</div>
        <div className='email'>{`Email:${candidate.email}`}</div>
        <hr />
        <div>
          {candidate.experience.map((exp) => (
            <div className='stacks'>
              {technologies.map(
                (tech) =>
                  tech.guid === exp.technologyId && (
                    <p className='stack-name' key={tech.guid}>
                      {tech.name}:&nbsp;
                    </p>
                  )
              )}
              <p className='experience'>{`${exp.yearsOfExperience} years`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Candidate;
