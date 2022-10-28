import React from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useParams, useNavigate } from "react-router-dom";

function FilterDropDown (props) {
  const {isLoading} = props
  const {filterType} = useParams()
  const navigate = useNavigate()
  function handleChange (event) {
    navigate(`/launches/${event.target.value}`)
  }

  return (

    <Select
          value={filterType}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          disabled={isLoading}
        >
          
          <MenuItem value='all'>All Launches</MenuItem>
          <MenuItem value='upcoming'>Upcoming Launches</MenuItem>
          <MenuItem value='successful'>Successful Launches</MenuItem>
          <MenuItem value='failed'>Failed Launches</MenuItem>
        </Select>


  )
}

export {FilterDropDown}