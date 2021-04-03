import React from 'react';

const Logo = ({ className = '', ...props }) => {
  let properStyle = {
    width: props.width,
    height: 'auto'
  }
  if (props.height) properStyle.height = props.height;

  return (
    <img src="/kitbit_logo_normal.png" style={properStyle} />
  );
}
export default Logo;