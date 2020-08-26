import axios from 'axios';

(
  async () => {
    const response = await axios.post('http://localhost:2122/students/grades');

    console.log(response.data);
  }
)();
