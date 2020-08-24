import axios from 'axios';

(
  async () => {
    const response = await axios.post('https://qacademicapi.herokuapp.com/students', {
      login: '201811221180345',
      password: 'jmrxejgv'
    });
    console.log(response.data);
  }
)();
