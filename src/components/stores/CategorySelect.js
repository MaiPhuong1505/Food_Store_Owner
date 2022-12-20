import { InputLabel, ListItemText, MenuItem, Select, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { storeServices } from '../../services/stores.services'


const CategorySelect = ({ getData, categoryId }) => {

  // const categoryList = [
  //   "Trà sữa",
  //   "Ăn vặt",
  //   "Cơm",
  // ]

  const token = localStorage.getItem('AccessToken')
  const [selectedCategory, setSelectedCategory] = useState(categoryId)
  const [categoryList, setCategoryList] = useState([])

  const getFoodCategories = async (token) => {
    const response = await storeServices.getFoodCategories(token)
    if (response.data) {
      setCategoryList(response.data)
    }
  }
  useEffect(() => {
    getFoodCategories(token)
  }, [])

  const handleChange = (event) => {
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
