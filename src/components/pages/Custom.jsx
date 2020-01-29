import React from 'react'



// var cols = document.querySelectorAll('#columns .column');
// [].forEach.call(cols, function (col) {
//   col.addEventListener('dragstart', handleDragStart, false);
// });

const Diagram = (props) => {

  const [op, setop] = React.useState(1)

  function onDragStart(event) {
    event.persist()
    window.e = event
    console.log('start')
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  }

  function onDragOver(event) {
    console.log('over')
    event.preventDefault();
  }

  function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    dropzone.appendChild(draggableElement);

    event
      .dataTransfer
      .clearData();
  }

  return (
    <div>

      <div className='parent'>
        <span id='draggableSpan'
          draggable='true'
          onDragStart={onDragStart}
        >
          draggable
        </span>
        <span
          onDragOver={onDragOver}
          onDrop={onDrop}
        > dropzone </span>
      </div>

    </div>
  )
}

export default Diagram