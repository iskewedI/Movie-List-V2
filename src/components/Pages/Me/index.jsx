import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUserData } from '../../../store/user';

const Home = () => {
  const { t } = useTranslation();

  const userData = useSelector(getUserData);

  return (
    <div style={{ margin: '20px', color: 'white' }}>
      <ul>
        <li>
          {t('user_info.name')}: {userData.userName}
        </li>
        <li>
          {t('user_info.email')}: {userData.email}
        </li>
      </ul>
    </div>
  );
};

export default Home;
