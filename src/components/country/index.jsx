import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, getCountries} from '../../store/country';

const Country = () => {
  const countries = useSelector(getCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(country => (
          <tr key={country.numericCode}>
            <td>{country.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Country;
