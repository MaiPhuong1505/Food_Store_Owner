import DownloadLink from "../pages/DownloadLink"
import Home from "../pages/Home"
import RegisterIntroduction from "../pages/RegisterIntroduction"
import Store from "../pages/stores"
import Login from "../pages/login"
import StoreRegister from "../pages/stores/StoreRegister"

export const publicRoutes = [
    {path: '/', component: Home},
    {path: '/downloadLink', component: DownloadLink},
    {path: '/registerIntroduction', component: RegisterIntroduction},
    {path: '/login', component: Login},

    {path: '/store', component: Store},
    {path: '/storeRegister', component: StoreRegister},
]
export const privateRoutes = [

]