import React from 'react'
import CharacterCard from './CharacterCard'
import './CharacterList.css'
import { chiikawaData } from '../data/chiikawaData'

function CharacterList({ searchTerm, onCharacterSelect }) {
  const filteredCharacters = chiikawaData.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="character-list">
      {filteredCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={onCharacterSelect}
        />
      ))}
    </div>
  )
}

export default CharacterList
