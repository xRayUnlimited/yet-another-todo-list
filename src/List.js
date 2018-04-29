import React from 'react';
import Todo from './Todo';

const List = ({ items, todoClick }) => (
  <ul>
    { items.map( item => 
      <Todo 
        key={item.id} 
        todoClick={todoClick}
        {...item} 
      />
    )}
  </ul>
)

export default List;