import {Link} from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h3>Manage Content</h3>
      <ul>
        <li><Link to="projects">Projects</Link></li>
        <li><Link to="experience">Experience</Link></li>
      </ul>
    </div>
  );
}
