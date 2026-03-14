export default function ProjectDetail({ project, onClose }) {
  if (!project) return null

  return (
    <div
      className={`project-detail ${project ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="project-detail__card">
        <button className="project-detail__close" onClick={onClose}>
          ✕ close
        </button>

        <div className="project-detail__tag">{project.tag}</div>
        <h2 className="project-detail__title">{project.title}</h2>
        <p className="project-detail__desc">{project.desc}</p>

        <div className="project-detail__techs">
          {project.techs.map((t, i) => (
            <span key={i} className="project-detail__tech">
              {t}
            </span>
          ))}
        </div>

        <div className="project-detail__actions">
          {project.gh && project.gh !== '#' && (
            <a
              href={project.gh}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail__btn project-detail__btn--primary"
            >
              ↗ View on GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail__btn project-detail__btn--live"
            >
              ● Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
