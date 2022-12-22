// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repoDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <div className="head-container">
        <h1 className="name">{name}</h1>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="count-icon"
          />
          <p className="count-name">{starsCount} stars</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="count-icon"
          />
          <p className="count-name">{forksCount} forks</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="count-icon"
          />
          <p className="count-name">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
