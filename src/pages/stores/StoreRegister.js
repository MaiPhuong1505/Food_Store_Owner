import { Alert, Box, Button, Container, Divider, Grid, ListItemText, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Location from '../../components/location';
import PendingStatus from '../../components/stores/PendingStatus'
import theme from '../../theme';
import UploadImage from '../../components/stores/UploadImage';
import { storeServices } from '../../services/stores.services';
import { useNavigate } from 'react-router-dom';


const StoreRegister = () => {
  const ownerId = localStorage.getItem("UserId")
  const token = localStorage.getItem("AccessToken")

  const [open, setOpen] = useState(false)
  const [helperText, setHelperText] = useState('')
  const [categoriesId, setCategoriesId] = useState([])
  const [info, setInfo] = useState({
    name: '',
    phone: '',
    TaxID: '',
    nameOwner: '',
    cmnd: '',
    nameSTKOwner: '',
    STK: '',
    NameBank: '',
    BankBranch: ''
  })
  const navigate = useNavigate()

  const [address, setAddress] = useState({})
  const [street, setStreet] = useState('')
  const [urlStoreImage, setUrlStoreImage] = useState('')
  const [urlKitchenImage, setUrlKitchenImage] = useState('')
  const [urlMenuImage, setUrlMenuImage] = useState('')
  const [urlFontCmndImage, setUrlFontCmndImage] = useState('')
  const [urlBackCmndImage, setUrlBackCmndImage] = useState('')
  const [urlLicenseImage, setUrlLicenseImage] = useState('')
  const [category, setCategory] = useState([])
  const [categoryList, setCategoryList] = useState([])

  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    async function getStoreCategories(token) {
      const categories = []
      await storeServices.getStoreCategories(token)
        .then((res) => {
          res.data.map((category) => {
            categories[category.categoryId] = category.name
          })
          setCategoryList(categories)
        })
        .catch((error) => {
          console.log("Error", error)
        })
    }
    getStoreCategories(token)
  }, [])

  //pass data from child components
  const getLocationData = (location) => {
    setAddress(location)
  }
  const getStoreImage = (file) => {
    setUrlStoreImage(file)
  }
  const getKitchenImage = (file) => {
    setUrlKitchenImage(file)
  }
  const getMenuImage = (file) => {
    setUrlMenuImage(file)
  }
  const getFrontCmndImage = (file) => {
    setUrlFontCmndImage(file)
  }
  const getBackCmndImage = (file) => {
    setUrlBackCmndImage(file)
  }
  const getLicenseImage = (file) => {
    setUrlLicenseImage(file)
  }
  const handleSelectChange = (event, key) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setCategoriesId([{ CategoryID: key.key.slice(2) }])
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (value) {
      setInfo({ ...info, [name]: value })
    }
  }

  async function handleSubmit(event) {
    const submitInfo = {
      ...info,
      urlStoreImage: urlStoreImage,
      urlKitchenImage: urlKitchenImage,
      urlMenuImage: urlMenuImage,
      urlFontCmndImage: urlFontCmndImage,
      urlBackCmndImage: urlBackCmndImage,
      urlLicenseImage: urlLicenseImage,
      Categories: ['a'],
      address: {
        Province: address['city'],
        District: address['district'],
        Town: address['ward'],
        Lat: 16.073877,
        lng: 108.149892,
        Stress: street
      }
    }
    console.log(submitInfo)

    Object.values(submitInfo).forEach(value => {
      if (!value) {
        setOpen(true)
        return
      }
    })
    Object.values(submitInfo.address).forEach(value => {
      if (!value) {
        setOpen(true)
        return
      }
    })
    try {
      const store = await storeServices.createStore(submitInfo, ownerId, token)
      if (store) {
        navigate('/store')
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return (
    <div>
      {!isPending ? (
        <Box
          display="flex"
          justifyContent={"center"}
          flexDirection={'column'}
          paddingY={4}
          paddingX={7}
          marginTop={10}
          marginBottom={4}
          marginX={13}
          sx={{ backgroundColor: 'white' }}
        >
          <Typography align='center' variant='h6'
            sx={{ fontWeight: "bold" }}
            color={theme.palette.primary.main}>
            ĐĂNG KÝ CỬA HÀNG TRÊN FOORDER
          </Typography>
          <Typography mt={2}>
            Tên cửa hàng <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            name="name"
            size='small' margin="dense" type={'text'}
            onChange={handleInputChange}
            error={Boolean(helperText)}
            helperText={helperText}
          >
          </TextField>
          <Typography mt={2}>
            Số điện thoại cửa hàng <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size='small' margin="dense" type='number'
            name='phone'
            onChange={handleInputChange}
            error={Boolean(helperText)}
            helperText={helperText}
          >
          </TextField>
          <Typography mt={2}>
            Loại cửa hàng <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <Select
            size='small'
            multiple
            value={category}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {Object.entries(categoryList).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                <ListItemText primary={value} />
              </MenuItem>
            ))}
          </Select>

          <Typography mt={2}>
            Mã số thuế <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            size='small' margin="dense" type='number'
            name='TaxID'
            onChange={handleInputChange}
          >
          </TextField>
          <Typography mt={2}>
            Địa chỉ <span style={{ color: "#E25B45" }}>*</span>
          </Typography>

          <Location getLocationData={getLocationData} />

          <TextField
            fullWidth
            size='small' margin="dense" type={'text'}
            placeholder="Số nhà, đường"
            onChange={(e) => setStreet(e.target.value)}
            error={Boolean(helperText)}
            helperText={helperText}
          // onBlur={() => notifyText(street)}
          >
          </TextField>
          <Divider sx={{ marginY: 2 }} />
          {/* hinh mat tien cua hang */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                Hình ảnh mặt tiền của cửa hàng <span style={{ color: "#E25B45" }}>*</span>
                (hình chụp thực tế, rõ nét, không qua chỉnh sửa, thể hiện đủ 3 yếu tố: bảng hiệu, địa chỉ, không gian)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'25vw'} OwnerID={ownerId} fileName={'Store'} getData={getStoreImage} />
            </Grid>
            {/* Hình ảnh bếp, khu vực chế biến * */}
            <Grid item xs={6}>
              <Typography>
                Hình ảnh bếp, khu vực chế biến <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'25vw'} OwnerID={ownerId} fileName={'Kitchen'} getData={getKitchenImage} />
            </Grid>
            {/* Hình ảnh thực đơn */}
            <Grid item xs={6}>
              <Typography>
                Hình ảnh thực đơn <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'25vw'} OwnerID={ownerId} fileName={'Menu'} getData={getMenuImage} />
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />
          <Typography>
            Thông tin chủ sở hữu <span style={{ color: "#E25B45" }}>*</span>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                placeholder='Tên chủ sở hữu'
                name='nameOwner'
                onChange={handleInputChange}
                error={Boolean(helperText)}
                helperText={helperText}
              // onBlur={() => notifyText(nameOwner)}
              >
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small' fullWidth margin="dense" type='number'
                placeholder='Số CMND/CCCD'
                name='cmnd'
                onChange={handleInputChange}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                (Mặt trước CMND/CCCD) <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <UploadImage height={'20vw'} OwnerID={ownerId} fileName={'FrontCMND'} getData={getFrontCmndImage} />
            </Grid>
            <Grid item xs={6}>
              <Typography>
                (Mặt sau CMND/CCCD) <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <UploadImage height={'20vw'} OwnerID={ownerId} fileName={'BackCMND'} getData={getBackCmndImage} />
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Giấy phép kinh doanh <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage height={'35vw'} OwnerID={ownerId} fileName={'License'} getData={getLicenseImage} />
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                Tên chủ tài khoản ngân hàng <span style={{ color: "#E25B45" }}>*</span> (viết hoa không dấu)
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type='text'
                name='nameSTKOwner'
                onChange={handleInputChange}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Số tài khoản <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type='number'
                name='STK'
                onChange={handleInputChange}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Tên ngân hàng <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                name='NameBank'
                onChange={handleInputChange}>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Chi nhánh <span style={{ color: "#E25B45" }}>*</span>
              </Typography>
              <TextField
                size='small' fullWidth margin="dense" type={'text'}
                onChange={handleInputChange}
                name='BankBranch'
                error={Boolean(helperText)}
                helperText={helperText}
              // onBlur={() => notifyText(bankBranch)}
              >
              </TextField>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
              <Alert severity="error" variant="filled" onClose={() => setOpen(false)}>
                Hãy nhập đủ thông tin
              </Alert>
            </Snackbar>
            <Button variant="contained" size="large"
              onClick={handleSubmit}
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 'fit-content'
              }}
            >GỬI THÔNG TIN</Button>
          </Container>

        </Box >) : <PendingStatus />}
    </div >
  )
}

export default StoreRegister
