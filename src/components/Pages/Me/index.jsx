import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUser, getUserData, getUserLoaded, getUserLoading } from '../../../store/user';
import { useEffect } from 'react';

const Home = () => {
  const { t } = useTranslation();

  const userLoaded = useSelector(getUserLoaded);
  const userLoading = useSelector(getUserLoading);

  const userData = useSelector(getUserData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoaded && !userLoading) {
      dispatch(getUser());
    }
  });

  return (
    <div style={{ margin: '20px', color: 'white' }}>
      <ul>
        <li>
          {t('user_info.name')}: {userData.username}
        </li>
        <li>
          {t('user_info.email')}: {userData.email}
        </li>
      </ul>
    </div>
  );
};

export default Home;
