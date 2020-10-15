import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Avatar, IconButton } from '@material-ui/core';
import "./SidebarUser.css"

function SidebarUser() {
    return (
        <div className="sidebarUser">
            <CheckCircleIcon color="primary"/>
            <Avatar />
            <div className="sidebarUser_info">
                <p>Ime i prezime</p>
            </div>
        </div>
    )
}

export default SidebarUser
