import React from "react";
import { Grid } from "@mui/material";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import styles from './ModalHeader.module.css'
import otherStyles from './TableInfoRows.module.css'


function ModalHeader (props) {
  const {missionName, rocketName, links, status} = props
  return (
    <Grid container  className={styles.container} >
      <Grid item >
        <img src={links.missionPatch} alt="insignia" className={styles.patchImg} />
      </Grid>
      <Grid item >
        <p>
          <strong>{missionName}</strong>
        </p>
        <p>
          {rocketName}
        </p>
        <span>
          <a href={links.articleLink || ''} target='_blank' rel="noreferrer">
            <InsertLinkIcon fontSize="medium" />
          </a>
          <a href={links.wikipedia || ''} target='_blank' rel="noreferrer">
            <ArticleIcon fontSize="medium" />
          </a>
          <a href={links.videoLink || ''} target='_blank' rel="noreferrer">
          <PlayCircleIcon fontSize="medium" />
          </a>
          
        </span>
      </Grid>
      <Grid item >
        <span className={`${otherStyles[status]} ${otherStyles.statusSpan}`}>
          {status}
        </span>
      </Grid>
    </Grid>
  )
}

export {ModalHeader}