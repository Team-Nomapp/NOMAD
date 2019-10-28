import React from 'react';

const Tooltip = ({ hoveredObject, pointerX, pointerY }) => {

  return (
    <div style={{
      position: 'absolute', 
      zIndex: 999, 
      pointerEvents: 'none', 
      left: pointerX, 
      top: pointerY
    }}>
      { hoveredObject.id }
    </div>
  );
};

export default Tooltip;