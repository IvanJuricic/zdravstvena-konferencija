import React from 'react'
import SidebarUser from "./SidebarUser"
import "./AdminPage.css"

function AdminPage() {
    return (
        <div className="admin_page">
            <div className="admin_pageConfInfo">
                <h1>I am info page for conference</h1>
                <div className="admin_pageSpeaker">
                </div>
            </div>
            <div className="admin_pageActiveUsers">
                <SidebarUser />
                <SidebarUser />
                <SidebarUser />
                <SidebarUser />
                <SidebarUser />
                <p>Trenutno aktivno: 5 korisnika</p>
            </div>

            
        </div>
    )
}

export default AdminPage
