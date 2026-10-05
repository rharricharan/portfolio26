
import { Link } from 'react-router-dom';
import './Styles/ProjectCard.css';

function ProjectCard({ title, description = [], imageUrl, imageAlt, projectUrl }) {
	const descriptionLines = Array.isArray(description)
		? description
		: description
			? [description]
			: [];

	return (
		<Link className="project-card" to={projectUrl} aria-label={`View ${title}`}>
			{imageUrl && (
				<img
					className="project-card__image"
					src={imageUrl}
					alt={imageAlt || `${title} preview`}
					loading="lazy"
				/>
			)}
			<div className="project-card__content">
				<h2 className="project-card__title">{title}</h2>
				<div className="project-card__description">
					{descriptionLines.map((line, index) => (
						<p key={`${index}-${line}`}>{line}</p>
					))}
				</div>
			</div>
		</Link>
	);
}

export default ProjectCard;