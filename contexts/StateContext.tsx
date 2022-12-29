import type { StateContextType } from '@Types/context';
import type { ScoreType } from '@Types/score';
import type { FC, ReactNode } from 'react'; 
import { createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode,
};

const StateContextDefaultValues: StateContextType = {
  activeScoreType: 'best',
  setActiveScoreType: () => {},
};

const StateContext = createContext<StateContextType>(StateContextDefaultValues);

export const useStateContext = () => useContext(StateContext);

export const StateProvider: FC<Props> = ({ children }) => {
  const [ _activeScoreType, _setActiveScoreType ] = useState<ScoreType>(StateContextDefaultValues.activeScoreType);

  const setActiveScoreType = (t: ScoreType) => _setActiveScoreType(t);

  const value: StateContextType = {
    activeScoreType: _activeScoreType,
    setActiveScoreType
  };

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  );
};
