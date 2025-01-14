import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateCard = ({
  candidate,
  onNextCandidate,
  onSaveCandidate,
}: {
  candidate: Candidate;
  onNextCandidate: () => void;
  onSaveCandidate: (candidate: Candidate) => void;
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '1.5rem', 
      backgroundColor: '#000', 
      color: '#fff', 
      borderRadius: '12px', 
      maxWidth: '320px', 
      boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', 
      textAlign: 'center' 
    }}>
      <img 
        src={candidate.avatar_url} 
        alt={`${candidate.login}'s avatar`} 
        style={{ width: '200px', height: '200px', borderRadius: '50%', marginBottom: '1rem' }} 
      />
      <h2 style={{ marginBottom: '0.5rem' }}>
        {candidate.name || 'Not provided'} <span style={{ fontStyle: 'italic' }}>({candidate.login})</span>
      </h2>
      <p style={{ margin: '0.2rem 0' }}>Location: {candidate.location || 'Not provided'}</p>
      <p style={{ margin: '0.2rem 0' }}>Email: {candidate.email || 'Not provided'}</p>
      <p style={{ margin: '0.2rem 0' }}>Company: {candidate.company || 'Not provided'}</p>
      <p style={{ margin: '0.2rem 0' }}>
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#646cff' }}>
          GitHub Profile
        </a>
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          onClick={onNextCandidate} 
          style={{ 
            backgroundColor: 'red', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            border: 'none', 
            borderRadius: '5px', 
            fontSize: '1rem', 
            cursor: 'pointer' 
          }}
        >
          -
        </button>
        <button 
          onClick={() => onSaveCandidate(candidate)} 
          style={{ 
            backgroundColor: 'green', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            border: 'none', 
            borderRadius: '5px', 
            fontSize: '1rem', 
            cursor: 'pointer' 
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const initialCandidates = await searchGithub();
      if (initialCandidates.length > 0) {
        const fullCandidateDetails = await searchGithubUser(initialCandidates[0].login);
        setCandidates(initialCandidates);
        setCurrentCandidate(fullCandidateDetails);
      }
    };
    fetchData();
  }, []);

  const handleNextCandidate = async () => {
    const nextIndex = (currentIndex + 1) % candidates.length;
    const nextCandidate = await searchGithubUser(candidates[nextIndex].login);
    setCurrentIndex(nextIndex);
    setCurrentCandidate(nextCandidate);
  };

  const handleSaveCandidate = (candidate: Candidate) => {
    // Retrieve the current saved candidates from localStorage
    const storedCandidates = localStorage.getItem('savedCandidates');
    const parsedCandidates: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
  
    // Check if the candidate is already saved
    if (!parsedCandidates.some((saved) => saved.id === candidate.id)) {
      const updatedSavedCandidates = [...parsedCandidates, candidate];
  
      // Save the updated array back to localStorage
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    }
  
    // Move to the next candidate
    handleNextCandidate();
  };
  
  

  if (!currentCandidate) {
    return <h1 style={{ color: '#fff', textAlign: 'center' }}>Loading...</h1>;
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(180deg, rgb(32, 44, 136) 0%, rgba(9, 9, 121, 1) 15%, rgba(0, 2, 18, 1) 100%)', 
      color: '#fff' 
    }}>
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Candidate Search</h1>
        <CandidateCard 
          candidate={currentCandidate} 
          onNextCandidate={handleNextCandidate} 
          onSaveCandidate={handleSaveCandidate} 
        />
      </div>
    </div>
  );
};

export default CandidateSearch;

