import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react';

import { StateCtxType } from '@Types/context';

const StateContextDefaultValues: StateCtxType = {
  loading: false,
  setLoading: () => {},
};

const StateContext = createContext<StateCtxType>(StateContextDefaultValues);

export const useStateContext = () => useContext(StateContext);

export const StateProvider : FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [ loading, _setLoading ] = useState<boolean>(StateContextDefaultValues.loading);

  const setLoading = (state: boolean) => _setLoading(state);

  const value: StateCtxType = {
    loading,
    setLoading
  };

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  );
};
