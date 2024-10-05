import React from 'react'
import SideBarCanvas from './SideBarCanvas/SideBarCanvas'
import SiedBar from './SideBar/SiedBar'
import { useAuth } from '../../Context/AuthContext'
import LocalStore from '../../Store/LocalStore'

export default function MainSideNav() {
  const { logout } = useAuth()
  const role = LocalStore.getRole()
  return (
      <>
          <SiedBar role={role} logout={logout}/>
          <SideBarCanvas role={role} logout={logout}/>
    </>
  )
}
