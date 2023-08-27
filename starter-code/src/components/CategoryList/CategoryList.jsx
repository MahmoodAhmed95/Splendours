import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px', // Adjust as needed
});

export default function CategoryList({ categories, activeCat, setActiveCat }) {
  const cats = categories.map((cat) => (
    <ListItemButton
      key={cat}
      selected={cat === activeCat}
      onClick={() => setActiveCat(cat)}
    >
      <ListItemText primary={cat} />
    </ListItemButton>
  ));

  return <StyledList>{cats}</StyledList>;
}
