import {Component} from 'react'

import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepoList()
  }

  getRepoList = async () => {
    const {activeTabId} = this.state
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeTabId}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()

      const formattedData = fetchedData.popular_repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        avatarUrl: repo.avatar_url,
        starsCount: repo.stars_count,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
      }))
      this.setState({
        repoList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  activeLanguageTab = id => {
    this.setState({activeTabId: id}, this.getRepoList)
  }

  renderLoaderView = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repoList} = this.state
    return (
      <ul className="repo-list">
        {repoList.map(repoItem => (
          <RepositoryItem key={repoItem.id} repoDetails={repoItem} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoaderView()
      default:
        return ''
    }
  }

  render() {
    const {activeTabId} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>

        <ul className="language-list">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              key={language.id}
              languageDetails={language}
              activeLanguageTab={this.activeLanguageTab}
              isActive={language.id === activeTabId}
            />
          ))}
        </ul>
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
