import React, { useContext } from 'react';
import { Select } from './styles';
import { _Context } from '../../App';
import { ALL_COUNTRIES } from '../../data';

const { Option } = Select;

const Home = () => {
  const { dispatch } = useContext(_Context);

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