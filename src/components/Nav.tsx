import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#000' }}>
      <NavLink to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</NavLink>
      <NavLink to="/SavedCandidates" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
  Potential Candidates
</NavLink>

    </nav>
  );
};

export default Nav;
