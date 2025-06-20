import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faLeaf, faUser, faHeart, faShoppingCart,
    faSeedling, faWineBottle, faSpa, faHome,
    faTshirt, faRecycle, faPaw, faStar, faStarHalfAlt,
    faTrash,faEye,faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import {
    faWeixin, faQq, faGithub, faCloudflare
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faLeaf, faUser, faHeart, faShoppingCart,
    faSeedling, faWineBottle, faSpa, faHome,
    faTshirt, faRecycle, faPaw, faStar, faStarHalfAlt, farStar,
    faWeixin, faQq, faGithub, faCloudflare,
    faTrash,faEye,faEyeSlash,
)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
