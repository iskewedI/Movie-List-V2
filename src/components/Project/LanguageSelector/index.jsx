import React from 'react';
import { useTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './styles';

export const LanguageSelector = ({ selectedLanguage, languages, handleChange }) => {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-controlled-open-select-label'>
          {t('home.language_selector.label')}
        </InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          value={selectedLanguage}
          onChange={e => handleChange(e.target.value)}
        >
          {languages &&
            languages.map(l => (
              <MenuItem key={`lang-${l}`} value={l}>
                {t(`languages.${l}`)}
              </MenuItem>
            ))}
          {/* TODO - JP & CH */}
        </Select>
      </FormControl>
    </div>
  );
};
