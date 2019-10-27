import React from 'react';
import useContext from 'hooks/useContext';
import { ALL_COUNTRIES } from 'state/data';

import { Select } from './styles';

const { Option } = Select;

const Home = () => {
  const { dispatch } = useContext();

  const setCountry = payload => 
    dispatch({type: 'UPDATE_COUNTRY', payload});

  return (
    <>
      <Select 
        style={{ width: 200 }}
        defaultValue="Select country"
        onChange={ setCountry }
        dropdownStyle={{ backgroundColor: "transparent" }}
      >
        {Object.keys(ALL_COUNTRIES).map(key => {
          const { label } = ALL_COUNTRIES[key];
          return (
            <Option style={{ backgroundColor: "transparent" }} key={key} value={key}>
              {label}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default Home;