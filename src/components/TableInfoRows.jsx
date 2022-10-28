import React, {memo} from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styles from './TableInfoRows.module.css'

const TableInfoRows = memo((props) => {

  const {pageRows, handleRowClick} = props
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                      ];
  
  return pageRows.length ? 
    pageRows.map((row) => {
      const launchTime = new Date(Date.parse(row.launch_date_utc))
      const launchTimeString = `${launchTime.getUTCDate()} ${monthNames[launchTime.getUTCMonth()]} ${launchTime.getUTCFullYear()} ${launchTime.getUTCHours()}:${launchTime.getUTCMinutes()}`
      const launchStatus = row.upcoming ? "Upcoming" : row.launch_success ? "Success" : "Fail"

      return (
      <TableRow
        hover
        key={`${row.launch_date_utc}-${row.mission_name}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => {
          handleRowClick(row)
        }}
      >
        <TableCell component="th" scope="row">
          {row.flight_number}
        </TableCell>
        <TableCell align="center">{launchTimeString}</TableCell>
        <TableCell align="center">{row.launch_site.site_name}</TableCell>
        <TableCell align="center">{row.mission_name}</TableCell>
        <TableCell align="center">{row.rocket.second_stage.payloads[0].orbit}</TableCell>
        <TableCell align="center"><span className={`${styles.statusSpan} ${styles[launchStatus]}`}>{launchStatus}</span></TableCell>
        <TableCell align="center">{row.rocket.rocket_name}</TableCell>
      </TableRow>
    )})
   : <TableRow className={styles.textRow}><TableCell> <span className={styles.textSpan}>No results found.</span> </TableCell></TableRow>
})

export {TableInfoRows}