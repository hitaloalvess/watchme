import { useState, useCallback } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(1);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <SideBar handleClickButton={handleClickButton}
               selectedGenreId={selectedGenreId}/>

      <Content selectedGenreId={selectedGenreId}/>
    </div>
  )
}