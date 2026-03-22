import { useState, useEffect } from 'react'

export default function GitHubCommit({ username }) {
  const [commit, setCommit] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!username) return

    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((events) => {
        if (!Array.isArray(events)) throw new Error('Invalid')
        const pushEvent = events.find((e) => e.type === 'PushEvent')
        if (pushEvent && pushEvent.payload.commits?.length > 0) {
          const latestCommit = pushEvent.payload.commits[pushEvent.payload.commits.length - 1]
          const now = new Date()
          const commitDate = new Date(pushEvent.created_at)
          const diffDays = Math.floor((now - commitDate) / (1000 * 60 * 60 * 24))
          let timeAgo
          if (diffDays === 0) timeAgo = 'Today'
          else if (diffDays === 1) timeAgo = 'Yesterday'
          else if (diffDays < 30) timeAgo = `${diffDays} days ago`
          else timeAgo = commitDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

          setCommit({
            message: latestCommit.message,
            repo: pushEvent.repo.name.split('/')[1],
            timeAgo,
            sha: latestCommit.sha.slice(0, 7),
          })
        } else {
          return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=1`)
            .then((r) => r.json())
            .then((repos) => {
              if (repos?.[0]) {
                const repo = repos[0]
                const updatedDate = new Date(repo.updated_at)
                const diffDays = Math.floor((new Date() - updatedDate) / (1000 * 60 * 60 * 24))
                let timeAgo = diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`
                setCommit({
                  message: `Latest activity on ${repo.name}`,
                  repo: repo.name,
                  timeAgo,
                  sha: repo.default_branch,
                })
              } else {
                setError(true)
              }
            })
        }
      })
      .catch(() => setError(true))
  }, [username])

  return (
    <div className="github-commit">
      <div className="github-commit__header">
        <span className="github-commit__dot" />
        LATEST ACTIVITY
      </div>
      {commit ? (
        <>
          <div className="github-commit__message">"{commit.message}"</div>
          <div className="github-commit__meta">
            <span>{commit.sha}</span>
            <span>{commit.repo}</span>
            <span>{commit.timeAgo}</span>
          </div>
        </>
      ) : (
        <div className="github-commit__message">
          {error ? '' : 'Loading... '}
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)' }}>
            github.com/{username} →
          </a>
        </div>
      )}
    </div>
  )
}
