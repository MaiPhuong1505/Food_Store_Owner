import { FormControl, Grid } from '@mui/material'
import Select from 'react-select'
import React from 'react'
import useLocation from './useLocation'

const Location = ({ props, getLocationData }) => {
    const {
        state,
        onCitySelect,
        onDistrictSelect,
        onWardSelect,
    } = useLocation(false);
    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard
    } = state;

    return (
        <>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                    <FormControl margin='dense' size="small">
                        <Select
                            onChange={(option) => {
                                onCitySelect(option)
                                getLocationData({
                                    city: option.label
                                })
                            }}
                            label="Tỉnh/Thành phố"
                            placeholder='Tỉnh/Thành phố'
                            options={cityOptions}
                            defaultValue={selectedCity}
                        >
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl margin='dense' size="small">
                        <Select
                            onChange={(option) => {
                                onDistrictSelect(option)
                                getLocationData({
                                    city: state.selectedCity.label,
                                    district: option.label,
                                })
                            }}
                            placeholder="Quận/Huyện/Thị xã"
                            options={districtOptions}
                            defaultValue={selectedDistrict}
                        >
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl margin='dense' size="small">
                        <Select
                            onChange={(option) => {
                                onWardSelect(option)
                                getLocationData({
                                    city: state.selectedCity.label,
                                    district: state.selectedDistrict.label,
                                    ward: option.label
                                })
                            }}
                            placeholder="Xã/Phường/Thị trấn"
                            options={wardOptions}
                            defaultValue={selectedWard}
                        >
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}

export default Location
