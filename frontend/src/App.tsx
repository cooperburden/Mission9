import { useEffect, useState } from 'react';
import './App.css';


// this is what we want to display for each team 
interface Team {
  school: string;
  name: string;
  city: string;
  state: string;
}


// welcomes each user to the page and shows them the NCAA Basketball Teams
function Welcome() {
  return <h1>NCAA Basketball Teams</h1>
}


// What each card will contain, matching the names with the structure of the json
function TeamCard({ school, name, city, state }: Team) {
  return (
    <div className="team-card" >
      <h2>{school}</h2>
      <h3>Mascot: {name}</h3>
      <h3>Location: {city}, {state}</h3>
    </div>
  );
}


// Fetching the data from the json file, and giving error messages in case they dont import correctly
// Listing the cards into alphabetical order
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


// run the app
function App() {
  return (
    <>
      <Welcome />
      <TeamList />
    </>
  );
}

export default App;
