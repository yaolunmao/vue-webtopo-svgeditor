import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import HelloWorld from './components/HelloWorld.vue';
import 'virtual:svg-icons-register';
const app = createApp(App);
app.use(createPinia());
app.component('HelloWorld', HelloWorld);
app.mount('#app');
