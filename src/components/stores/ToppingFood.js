import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { storeServices } from '../../services/stores.services'

const ToppingFood = ({ getData, toppingIds }) => {
    const [toppingList, setToppingList] = useState([])
    const [selectedChange, setSelectedChange] = useState(toppingIds)

    useEffect(() => {
        async function getTopping(storeId, token) {
            try {
                const toppingData = await storeServices.getTopping(storeId, token)
                if (toppingData) {
                    setToppingList(toppingData.data)
                }
            } catch (error) {
                console.log(error.response.data)
            }
        }
        const token = localStorage.getItem("AccessToken")
        const storeId = localStorage.getItem("StoreId")
        getTopping(storeId, token)
        getData(toppingIds)
    }, [])

    const handleSelectTopping = (e, id) => {
        const newValue = e.target.checked ? [...selectedChange, id] : selectedChange.filter(item => item !== id)
        setSelectedChange(newValue)
        getData(newValue)
    }

    return (
        <Box sx={{ display: 'flex', border: '1px solid #89D5C9' }}>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {toppingList.length > 0 &&
                        toppingList.map((topping) => (
                            <FormControlLabel key={topping.ID}
                                sx={{ m: 0 }}
                                control={
                                    <Checkbox
                                        checked={selectedChange.includes(topping.ID)}
                                        onChange={(e) => handleSelectTopping(e, topping.ID)} name={topping.ID} />
                                }
                                label={topping.Name}
                            />
                        ))
                    }
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default ToppingFood
