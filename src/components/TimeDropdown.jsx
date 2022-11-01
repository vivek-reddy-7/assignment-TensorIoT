import React from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSearchParams } from "react-router-dom";

function TimeDropDown (props) {
  const {isLoading} = props
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange (event) {

    searchParams.set('time', event.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select
          value={searchParams.get('time') || 'all-time'}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          disabled={isLoading}
        >
          <MenuItem value='all-time'>All Time</MenuItem>
          <MenuItem value='6-months'>Past 6 months</MenuItem>
          <MenuItem value='5-years'>Past 5 years</MenuItem>
          <MenuItem value='10-years'>Past 10 years</MenuItem>
        </Select>

  )
}

export {TimeDropDown}