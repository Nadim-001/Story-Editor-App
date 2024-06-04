import React from 'react';
import './styles.css';
export default function ToggleSelected({
  data,
  nameField,
  idField,
  selectedArray,
  setSelected,
}) {
  function toggleArray() {
    const index = selectedArray.indexOf(data[`${idField}`]);
    let x = [...selectedArray];
    if (index > -1) {
      x.splice(index, 1);
      setSelected(x);
    } else {
      x.push(data[`${idField}`]);
      setSelected(x);
    }
    console.log('welp', index);
    console.log(selectedArray);
  }
  return (
    <div className="character-select">
      <p>{data[`${nameField}`]}</p>
      <span className="" onClick={toggleArray}>
        &times;
      </span>
    </div>
  );
}
