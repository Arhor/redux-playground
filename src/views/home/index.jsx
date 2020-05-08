import React from 'react';
import { locales, localize, fetchTranslations } from '@/store/localization';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const locs = useSelector(locales);
  const translate = useSelector(localize);
  const dispatch = useDispatch();

  return (
    <>
      <p>Hello there!</p>

      <p>{translate('welcome')}</p>

      <select name="language" id="language">
        {locs.map(l => {
          return <option onClick={() => dispatch(fetchTranslations(l))} key={l} value={l}>{l}</option>;
        })}
      </select>
    </>
)};

export default Home;