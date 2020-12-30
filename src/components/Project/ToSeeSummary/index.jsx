import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Tooltip from '@material-ui/core/Tooltip';
import FormDialog from '../../Common/FormDialog/';
import { getUserData, getUserLoaded } from '../../../store/user';

import {
  getListLength,
  getListName,
  createList,
  getRequestHasError,
  getListsLoading,
  getListHasChanges,
  getMyListSearched,
  searchMyList,
} from '../../../store/toSee';

import styles from './styles';

const ToSeeSummary = () => {
  const { t } = useTranslation();

  const classes = styles();

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);
  const userLoaded = useSelector(getUserLoaded);

  const myListSearched = useSelector(getMyListSearched);

  useEffect(() => {
    if (userLoaded && userData.token && !myListSearched) {
      dispatch(searchMyList());
    }
  }, [dispatch, userLoaded, userData, myListSearched]);

  const listCount = useSelector(getListLength);
  const listName = useSelector(getListName);
  const hasChanges = useSelector(getListHasChanges);

  const loading = useSelector(getListsLoading);
  // const error = useSelector(getRequestHasError); TODO

  const getListCount = function () {
    const countElement = document.getElementById('toSeeCounter');

    if (countElement) {
      const current = parseInt(countElement.innerHTML);
      if (listCount > current) {
        const fontSize = parseFloat(
          getComputedStyle(countElement, null).getPropertyValue('font-size')
        );

        countElement.animate(
          [
            { fontSize: `${fontSize + 2.5}px`, color: 'green' },
            { fontSize: `${fontSize}px`, color: 'black' },
          ],
          250
        );
      }
    }
    return listCount;
  };

  const handleSubmitList = name => {
    dispatch(createList(name));
  };

  return (
    <div id='toSeeSummary' className={classes.summary}>
      {(listName && (
        <Link to='/listToSee' className='nav-link' href='/#'>
          {`${t('navbar.lists.label')}: `}
          <span id='toSeeCounter' className={classes.counter}>
            {getListCount()}
          </span>
        </Link>
      )) ||
        (userData.token && !loading && (
          <div>
            <FormDialog
              onSubmit={handleSubmitList}
              buttonOpen={t('navbar.lists.new_list_form.label')}
              title={t('navbar.lists.new_list_form.form_title')}
              intro={t('navbar.lists.new_list_form.form_intro')}
              placeholder={t('navbar.lists.new_list_form.form_input_placeholder')}
              buttonCancel={t('buttons.cancel')}
              buttonOk={t('buttons.create')}
            />
          </div>
        ))}

      {listName && hasChanges && (
        <Tooltip placement='top' title='Unsaved changes'>
          <NewReleasesIcon style={{ marginLeft: '10px', color: '#56de56' }} />
        </Tooltip>
      )}
      {loading && <CircularProgress className={classes.circularProgress} size={20} />}
    </div>
  );
};

export default ToSeeSummary;
