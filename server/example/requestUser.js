import axios from 'axios';
(
  async () => {
    const response = await axios.post('https://qacademic-api.herokuapp.com/students', {
      login: '<xxxx>',
      password: '<xxxx>'
    });

    console.log(response.data);
  }
)();
