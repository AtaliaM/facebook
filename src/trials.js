// import Cookies from 'universal-cookie';
const Cookies = require('universal-cookie');
 
const cookies = new Cookies();
 
cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacman