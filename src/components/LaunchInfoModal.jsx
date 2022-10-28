import React from "react";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import {ModalHeader} from './ModalHeader'
import {ModalInfoRow} from './ModalInfoRow'
import styles from './LaunchInfoModal.module.css'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 8,
  p: 4,
  outline: 'none'
};

function LaunchInfoModal (props) {
   const {isModalOpen, data, handleClose} = props 
   const {flight_number, mission_name, rocket, launch_site, launch_date_utc, links } = data
   const launchLinks = {
    missionPatch: links?.mission_patch_small,
    articleLink: links?.article_link,
    videoLink: links?.video_link,
    wikipedia: links?.wikipedia
   }
   const launchStatus = data.upcoming ? "Upcoming" : data.launch_success ? "Success" : "Fail"
   const infoRows = 
       [
        ["Flight Number", flight_number],
        ["Mission Name", mission_name],
        ["Rocket Type", rocket?.rocket_type],
        ["Rocket Name", rocket?.rocket_name],
        ["Manufacturer", rocket?.second_stage?.payloads[0]?.manufacturer],
        ["Nationality", rocket?.second_stage?.payloads[0]?.nationality],
        ["Launch Date", new Date(Date.parse(launch_date_utc)).getUTCDate()],
        ["Payload Type", rocket?.second_stage?.payloads[0]?.payload_type],
        ["Orbit", rocket?.second_stage?.payloads[0]?.orbit],
        ["Launch Site", launch_site?.site_name]
      ]
  return (
    <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>


        <ModalHeader missionName={mission_name} links={launchLinks} rocketName={rocket?.rocket_name} status={launchStatus} />
        <div className={styles.details}>
          <span>
            {data.details ? data.details +'.' : "No Details."}{data.details && links?.wikipedia ? <a href={links?.wikipedia} target='_blank' rel="noreferrer">Wikipedia</a> : ''}
          </span>
        </div>
        <div>
        {infoRows.map((row, index) => (<ModalInfoRow key={row[0]} name={row[0]} value={row[1]} />))}
        </div>
        </Box>

      </Modal>
  )
}

export {LaunchInfoModal}