import { BellFilled } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import React from 'react';

export default function Index() {
  return (
    <div className='AppHeader bg-gray-800 text-white p-4 flex justify-between items-center'>
      {/* Logo or App Name */}
      <div className='font-bold text-xl'>App header/logo</div>

      {/* Notification Bell with Badge */}
      <Space>
        <Badge count={3}>
          <BellFilled className='bg-white' style={{ fontSize: 24}} />
        </Badge>
      </Space>
    </div>
  );
}
