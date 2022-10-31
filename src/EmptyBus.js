/** @format */
import Draggable from "react-draggable";

const EmptyBus = (props) => {
  return (
    <Draggable onDrag={null} position={{ x: 0, y: 0 }}>
      <div className='emptybus'></div>
    </Draggable>
  );
};

export default EmptyBus;
