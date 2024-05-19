import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useScript } from '../../contexts';

export default function ProjectCard({ id, name, creator, index }) {
  const navigate = useNavigate();
  const { currentProject, setCurrentProject } = useScript();

  function handleOnClick() {
    setCurrentProject(id);
    navigate(`./${id}`);
  }

  return (
    <div
      className={`project-card-container ${
        currentProject === id ? 'current-project' : null
      }`}
      onClick={handleOnClick}
      id={`project-${index}`}
    >
      <h1>{id}</h1>
      <p>{name}</p>
      <p>{creator}</p>
      <h2>Last Updated Not implemented yet</h2>
    </div>
  );
}
