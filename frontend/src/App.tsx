import { useEffect, useState } from 'react';
import './App.css';

interface Team {
  school: string;
  name: string;
  city: string;
  state: string;
}

function Welcome() {
  return <h1>NCAA Basketball Teams</h1>
}

function TeamCard({ school, name, city, state }: Team) {
  return (
    <div className="team-card" >
      <h2>{school}</h2>
      <h3>Mascot: {name}</h3>
      <h3>Location: {city}, {state}</h3>
    </div>
  );
}

function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/CollegeBasketballTeams.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        return response.json();
      })
      .then(data => setTeams(data.teams))
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError('There was an error fetching the teams. Please try again later.');
      });
  }, []);

  // Sort the teams alphabetically by the 'school' name
  const sortedTeams = [...teams].sort((a, b) => a.school.localeCompare(b.school));

  return (
    <>
      {error ? <p>{error}</p> : null}
      <div className="team-list">
        {sortedTeams.map((team) => (
          <TeamCard key={team.school} {...team} />
        ))}
      </div>
    </>
  );
}



function App() {
  return (
    <>
      <Welcome />
      <TeamList />
    </>
  );
}

export default App;
