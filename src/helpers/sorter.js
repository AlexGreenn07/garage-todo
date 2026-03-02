import React, {useRef, useState} from 'react';
import {DragDropProvider} from '@dnd-kit/react';
import {useSortable} from '@dnd-kit/react/sortable';
import {move} from '@dnd-kit/helpers';

function Sortable({id, index}: {id: number; index: number}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const {isDragging} = useSortable({id, index, element, handle: handleRef});

  return (
    <li ref={setElement} className="item" data-shadow={isDragging || undefined}>
      {id}
      <button ref={handleRef} className="handle" />
    </li>
  );
}

export default function App() {
  const [items, setItems] = useState(createRange(100));

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <ul className="list">
        {items.map((id, index) => (
          <Sortable key={id} id={id} index={index} />
        ))}
      </ul>
    </DragDropProvider>
  );
}

function createRange(length: number) {
  return Array.from({length}, (_, i) => i + 1);
}


import {useSortable} from '@dnd-kit/react/sortable';

function Sortable({id, index}) {
  const {ref} = useSortable({id, index});

  return (
    <li ref={ref} className="item">Item {id}</li>
  );
}

export default function App() {
  const items = [1, 2, 3, 4, 5 , 6];

  return (
    <ul className="list">
      {items.map((value, index) =>
        <Sortable key={value} id={value} index={index} />
      )}
    </ul>
  );
}