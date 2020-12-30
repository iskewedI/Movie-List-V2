import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './styles';

export const LanguageSelector = ({
  label,
  selectedLanguage,
  languages,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-controlled-open-select-label'>{label}</InputLabel>
      <Select
        labelId='demo-controlled-open-select-label'
        id='demo-controlled-open-select'
        value={selectedLanguage}
        onChange={e => handleChange(e.target.value)}
      >
        {languages &&
          Object.keys(languages).map(key => (
            <MenuItem key={`lang-${languages[key].label}`} value={languages[key].label}>
              {languages[key].value}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
