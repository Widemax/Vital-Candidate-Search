import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = localStorage.getItem('savedCandidates');
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates));
    }
  }, []);

  const handleRejectCandidate = (candidateId: number) => {
    // Remove the candidate from the list
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== candidateId
    );
    setSavedCandidates(updatedCandidates);

    // Update localStorage
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ color: '#fff', marginBottom: '2rem' }}>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p style={{ color: '#fff' }}>No saved candidates yet.</p>
      ) : (
        <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#fff' }}>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>Image</th>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>Name</th>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>Location</th>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>Email</th>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>Company</th>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>GitHub</th>
              <th style={{ padding: '1rem', border: '1px solid #555' }}>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id} style={{ backgroundColor: '#222', color: '#fff' }}>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </td>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  {candidate.name || candidate.login}
                </td>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  {candidate.location || 'N/A'}
                </td>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  {candidate.email || 'N/A'}
                </td>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  {candidate.company || 'N/A'}
                </td>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#646cff' }}
                  >
                    Profile
                  </a>
                </td>
                <td style={{ padding: '1rem', border: '1px solid #555' }}>
                  <button
                    onClick={() => handleRejectCandidate(candidate.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
