import { Typography } from 'antd'
import React from 'react'

export default function index() {
  return (
    <div className='AppFooter'>
      <Typography.Link href='https://www.google.com'>Privacy Policy</Typography.Link>
      <Typography.Link href='https://www.google.com'>Terms of Service</Typography.Link>
      <Typography.Link href='https://www.google.com'>Contact Us</Typography.Link>
    </div>
  )
}
