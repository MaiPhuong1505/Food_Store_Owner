import { InputLabel, ListItemText, MenuItem, Select, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { storeServices } from '../../services/stores.services'


const CategorySelect = ({ getData, categoryId }) => {

  // const categoryList = [
  //   "Trà sữa",
  //   "Ăn vặt",
  //   "Cơm",
  // ]
  const [selectedCategory, setSelectedCategory] = useState(categoryId)
  const [categoryList, setCategoryList] = useState([])

  const getCategories = async () => {
    const response = await storeServices.getCategories()
    if (response.data) {
      setCategoryList(response.data)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  const handleChange = (event) => {
    console.log("target:", event.target)
    setSelectedCategory(event.target.value)
    getData(event.target.value)
  };
  return (
    <>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel id="demo-select-small">Danh mục</InputLabel>
        {
          categoryList.length > 0 && (
            <Select
              sx={{ width: '100%' }}
              labelId="demo-select-small"
              id="demo-select-small"
              size='small'
              value={selectedCategory || ''}
              onChange={handleChange}
              label={'Danh mục'}
            >
              {categoryList.map((value) => (
                <MenuItem key={value.categoryId} value={value.categoryId}>

                  {value.name}

                </MenuItem>
              ))}
            </Select>
          )
        }
      </FormControl>
    </>
  )
}

export default CategorySelect
