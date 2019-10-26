import { useContext as useReactContext } from 'react';
import { _Context } from 'App';

const useContext = () => {
  return useReactContext(_Context);
};

export default useContext;
