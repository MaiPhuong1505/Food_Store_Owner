import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { storeServices } from '../../services/stores.services'

const ToppingFood = (getData) => {
    const [toppingList, setToppingList] = useState([])
    useEffect(() => {
        async function getTopping(storeId, token) {
            try {
                const toppingData = await storeServices.getTopping(storeId, token)
                if (toppingData) {
                    console.log(toppingData.data)
                    setToppingList(toppingData.data)
                }
            } catch (error) {
                console.log(error.response.data)
            }
        }
        const token = localStorage.getItem("AccessToken")
        const storeId = localStorage.getItem("StoreId")
        getTopping(storeId, token)
    }, [])

    const [selectedChange, setSelectedChange] = useState([])
    // const [selected, setSelected] = useState([])
    const handleChange = (event) => {
        // if (event.target.checked){
            setSelectedChange({
                ...selectedChange,
                [event.target.name]: event.target.checked,
            });
            getData(selectedChange)
        // }
    };
    
    console.log("selected: ", selectedChange)


    return (
        <Box sx={{ display: 'flex', border: '1px solid #89D5C9' }}>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {
                        toppingList.map((topping) => (
                            <FormControlLabel key={topping.ID}
                                sx={{ m: 0 }}
                                control={
                                    <Checkbox onChange={handleChange} name={topping.ID} />
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
