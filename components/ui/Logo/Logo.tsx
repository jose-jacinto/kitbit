import React from 'react';

const Logo = ({ className = '', ...props }) => {
  return (
    <img src="/kitbit_logo_normal.png" width={props.width} />
  );
}
export default Logo;