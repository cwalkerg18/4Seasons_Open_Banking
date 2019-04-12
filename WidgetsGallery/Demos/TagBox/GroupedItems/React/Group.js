import React from 'react';

export default function Group({ dxkey }) {
  return (
    <div className={'custom-icon'}>
      <span className={'dx-icon-box icon'}></span>{' '}
      {dxkey}
    </div>
  );
}
