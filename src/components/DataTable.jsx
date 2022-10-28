import React, {useState, useEffect, useCallback} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import {LaunchInfoModal} from './LaunchInfoModal'
import {FilterDropDown} from './FilterDropdown'
import {TimeDropDown} from './TimeDropdown'
import {TableInfoRows} from './TableInfoRows'
import styles from './DataTable.module.css'

function DataTable (props) {
  const {launches, isLoading} = props
  const [page, setPage] = useState(1)
  const [pageRows, setPageRows] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLaunch, setSelectedLaunch] = useState({})
  const pageCount = Math.ceil(launches.length/10)

  
  function handlePageChange (event, pageNum) {
    setPage(pageNum)
  }

   const handleRowClick = useCallback((launch) => {
    setIsModalOpen(true)
    setSelectedLaunch(launch)
   }, []) 

  function handleModalClose () {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const firstIndex = (page-1)*10
    const newpageRows = launches.slice(firstIndex, firstIndex+10)
    setPageRows([...newpageRows])
  }, [page, launches])

  useEffect(() => {
    setPage(1)
  }, [launches])

  return (
    <div className=''>
      <div className={styles.filterWrapper}>
      <TimeDropDown isLoading={isLoading} />
      <FilterDropDown isLoading={isLoading} />
      </div>
      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="center">Launched(UTC)</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Mission</TableCell>
            <TableCell align="center">Orbit</TableCell>
            <TableCell align="center">Launch Status</TableCell>
            <TableCell align="center">Rocket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <TableRow className={styles.progressRow}><TableCell><CircularProgress className={styles.circle} /></TableCell></TableRow> : 
            <TableInfoRows pageRows={pageRows} handleRowClick={handleRowClick} />
          }
        </TableBody>
      </Table>
    </TableContainer>
    <div className={styles.paginationWrapper}>
    <Pagination count={pageCount} variant="outlined" shape="rounded" page={page} disabled={isLoading} onChange={handlePageChange}/>
    </div>

    <LaunchInfoModal isModalOpen={isModalOpen} handleClose={handleModalClose} data={selectedLaunch} />
    </div>
  )
}

export {DataTable}