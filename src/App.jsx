import React, { useState } from 'react'
import CharacterList from './components/CharacterList'
import Header from './components/Header'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const handleSearch = (term) => {
    setSearchTerm(term)
    setSelectedCharacter(null)
  }

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToList = () => {
    setSelectedCharacter(null)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      
      {selectedCharacter ? (
        <div className="detail-view">
          <button className="back-button" onClick={handleBackToList}>
            ← 返回列表
          </button>
          <div className="character-detail">
            <div 
              className="character-detail-header"
              style={{ backgroundColor: selectedCharacter.color }}
            >
              {selectedCharacter.image ? (
                <img 
                  src={selectedCharacter.image} 
                  alt={selectedCharacter.name} 
                  className="character-image-large"
                />
              ) : (
                <div className="character-emoji-large">{selectedCharacter.emoji}</div>
              )}
              <h1>{selectedCharacter.name}</h1>
              <p className="name-en">{selectedCharacter.nameEn}</p>
            </div>
            
            <div className="character-detail-content">
              <section className="detail-section">
                <h3>📝 简介</h3>
                <p>{selectedCharacter.description}</p>
              </section>

              <section className="detail-section">
                <h3>✨ 性格特点</h3>
                <div className="tags">
                  {selectedCharacter.personality.map((trait, index) => (
                    <span key={index} className="tag">{trait}</span>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <h3>🎨 外貌特征</h3>
                <p>{selectedCharacter.appearance}</p>
              </section>

              <section className="detail-section">
                <h3>🎂 生日</h3>
                <p>{selectedCharacter.birthday}</p>
              </section>

              <section className="detail-section">
                <h3>⚔️ 武器</h3>
                <p>{selectedCharacter.weapon}</p>
              </section>

              <section className="detail-section">
                <h3>🐾 物种</h3>
                <p>{selectedCharacter.species}</p>
              </section>

              <section className="detail-section">
                <h3>🍴 喜欢的食物</h3>
                <div className="tags">
                  {selectedCharacter.favoriteFoods.map((food, index) => (
                    <span key={index} className="tag food-tag">{food}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <CharacterList 
          searchTerm={searchTerm}
          onCharacterSelect={handleCharacterSelect}
        />
      )}
    </div>
  )
}

export default App
