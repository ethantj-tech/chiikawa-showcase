import React from 'react'
import './CharacterCard.css'

function CharacterCard({ character, onClick }) {
  return (
    <div 
      className="character-card"
      onClick={() => onClick(character)}
    >
      <div 
        className="card-header"
        style={{ backgroundColor: character.color }}
      >
        {character.image ? (
          <img 
            src={character.image} 
            alt={character.name} 
            className="card-image"
          />
        ) : (
          <div className="card-emoji">{character.emoji}</div>
        )}
        <div className="card-overlay">
          <span className="view-detail">查看详情 →</span>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-name-en">{character.nameEn}</p>
        <p className="character-description">{character.description}</p>
        
        <div className="personality-tags">
          {character.personality.slice(0, 2).map((trait, index) => (
            <span key={index} className="mini-tag">{trait}</span>
          ))}
          {character.personality.length > 2 && (
            <span className="mini-tag more">+{character.personality.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
