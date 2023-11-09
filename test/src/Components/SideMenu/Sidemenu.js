import React from 'react'
import { Menu } from 'antd'
import { AppstoreAddOutlined, LeftCircleOutlined, RightCircleOutlined, FileDoneOutlined, FolderOpenFilled, SettingFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'


export default function Sidemenu() {
  const navigate = useNavigate()
  return (
    <div className='SideMenu'>
      <Menu 
      onClick={(item) => {
        //window.location.pathname = item.key
        navigate(item.key)
      }}
      items={[
        {
        label: "Home",
        icon:<AppstoreAddOutlined/>,
        key:'/',
      },
      {
        label: "Sender",
        icon:<LeftCircleOutlined/>,
        key:'/sender',
      },
      {
        label: "Receiver",
        icon:<RightCircleOutlined/>,
        key:'/receiver',
      },
      {
        label: "Track",
        icon:<FileDoneOutlined />,
        key:'/track',
      },
      {
        label: "History",
        icon:<FolderOpenFilled />,
        key:'/history',
      },
      {
        label: "Settings",
        icon:<SettingFilled />,
        key:'/setting',
      },
    ]}
      >
      </Menu>
    </div>
  )
}


      