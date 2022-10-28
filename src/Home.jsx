import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from 'react-router-dom'
import {DataTable} from './components/DataTable'
import logo from './assets/SpaceX_logo.png'
import styles from './Home.module.css'
import getModifiedUrl from './utilities/getModifiedUrl'

function Home () {
  const [launches, setLaunches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {filterType} = useParams()
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let apiUrl = ''
    setIsLoading(true)
    switch (filterType) {
  
      case 'upcoming':
        apiUrl = 'https://api.spacexdata.com/v3/launches/upcoming'
        break
      case 'successful':
        apiUrl = 'https://api.spacexdata.com/v3/launches/past?launch_success=true'
        break
      case 'failed':
        apiUrl = 'https://api.spacexdata.com/v3/launches/past?launch_success=false'
        break
      default:
        apiUrl = 'https://api.spacexdata.com/v3/launches'
    }

    const timeFilter = searchParams.get('time')

    switch (timeFilter) {
      case '6-months':
        apiUrl = getModifiedUrl(apiUrl, 'months', 6)
        break
      case '5-years':
        apiUrl = getModifiedUrl(apiUrl, 'years', 5)
        break
      case '10-years':
        apiUrl = getModifiedUrl(apiUrl, 'years', 10)
        break
      default:
        break
    }


    async function fetchLaunches(url) {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setLaunches([...data])
        setIsLoading(false) 
      } catch(err) {
        setIsLoading(false) 
        console.log(err)
        alert('Something went wrong.')
      }
    }
   
    fetchLaunches(apiUrl)
    
  }, [filterType, searchParams])

  return (
    <div>
    <div className={styles.logoDiv}>
      <img src={logo} alt="logo" className={styles.logoImg} />
    </div>
    <div className={styles.emptyDiv}>{ }</div>
    <div className={styles.tableDiv}>
      <DataTable launches={launches} isLoading={isLoading} />
    </div>
    </div>
  )
}

export {Home}