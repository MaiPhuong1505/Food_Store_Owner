import { InputLabel, ListItemText, MenuItem, Select, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'

const CategorySelect = () => {
  const categoryList = [
    "Trà sữa",
    "Ăn vặt",
    "Cơm",
  ]
  const [category, setCategory] = useState([])
  const handleChange = (event) => {
    setCategory(event.target.value)
  };
  return (
    <>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel id="demo-select-small">Danh mục</InputLabel>
        <Select
          sx={{ width: '100%' }}
          labelId="demo-select-small"
          id="demo-select-small"
          size='small'
          value={category}
          onChange={handleChange}
          label={'Danh mục'}
        >
          {categoryList.map((value) => (
            <MenuItem key={value} value={value}>
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default CategorySelect
