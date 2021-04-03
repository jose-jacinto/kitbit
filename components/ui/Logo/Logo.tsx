import React from 'react';

const Logo = ({ className = '', ...props }) => {
  return (
    <img src="/kitbit_logo_normal.png" style={{ width: `${props.width}px`, height: 'auto' }} />
  );
}
export default Logo;