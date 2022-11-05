import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

const ToppingFood = () => {
    const [state, setState] = React.useState({
        tranChauDen: true,
        tranChauTrang: false,
        kemPhoMai: false,
      });

      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
      const { tranChauDen, tranChauTrang, kemPhoMai } = state;

    return (
        <Box sx={{ display: 'flex', border: '1px solid #89D5C9' }}>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                    sx={{ m: 0 }}
                        control={
                            <Checkbox checked={tranChauDen} onChange={handleChange} name="tranChauDen" />
                        }
                        label="Trân châu đen"
                    />
                    <FormControlLabel
                    sx={{ m: 0 }}
                        control={
                            <Checkbox checked={tranChauTrang} onChange={handleChange} name="tranChauTrang" />
                        }
                        label="Trân châu trắng"
                    />
                    <FormControlLabel
                    sx={{ m: 0 }}
                        control={
                            <Checkbox checked={kemPhoMai} onChange={handleChange} name="kemPhoMai" />
                        }
                        label="Kem phô mai"
                    />
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default ToppingFood
