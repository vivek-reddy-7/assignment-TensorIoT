import React from "react";
import { Grid } from "@mui/material";
import styles from './ModalInfoRow.module.css'

function ModalInfoRow (props) {
    const {name, value} = props

    return (
      <Grid container className={styles.infoRowCon} paddingLeft={0} paddingRight={0}>
        <Grid item xs={5}>
          <span>
            {name}
          </span>
        </Grid>
        <Grid item xs={7}>
          <span>
            {value}
          </span>
        </Grid>
      </Grid>
    )
}

export {ModalInfoRow}