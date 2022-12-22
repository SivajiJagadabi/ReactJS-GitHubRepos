// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeLanguageTab, isActive} = props
  const {id, language} = languageDetails

  const activeBtnClass = isActive
    ? `language-button active-btn `
    : `language-button`

  const onClickTabItem = () => {
    activeLanguageTab(id)
  }

  return (
    <li className="list-language">
      <button type="button" className={activeBtnClass} onClick={onClickTabItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
