import type { StateContextType, TabType } from '@Types/context';
import type { FC, ReactNode } from 'react'; 
import { createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode,
};

const StateContextDefaultValues: StateContextType = {
  activeTab: 'best',
  setActiveTab: () => {},
};

const StateContext = createContext<StateContextType>(StateContextDefaultValues);

export const useStateContext = () => useContext(StateContext);

export const StateProvider: FC<Props> = ({ children }) => {
  const [ _activeTab, _setActiveTab ] = useState<TabType>(StateContextDefaultValues.activeTab);

  const setActiveTab = (t: TabType) => _setActiveTab(t);

  const value: StateContextType = {
    activeTab: _activeTab,
    setActiveTab
  };

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  );
};
