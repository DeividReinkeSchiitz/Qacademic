# Qacademic
App to view Qacademic users data from http://academico.ifmt.edu.br/ by web scraping.

# Task lists
- [ ] Finish Api
   - [x] Get Hish School Grades 
   - [x] Get class material
   - [ ] Get class schedule
   - [ ] Get College Grades
- [ ] Finish Mobile App
- [ ] Finish Web App


## API usage
### Local Machine:
 ```  
  git clone git@github.com:DeividReinkeSchiitz/Qacademic.git;
  cd database;
  yarn;
  yarn dev;
 ```
### Web Api:  
  Adress: `https://qacademic-api.herokuapp.com`.<br/>
   ```javascript
    const response = await axios.post('https://qacademic-api.herokuapp.com/students', {
      login: '<xxxx>',
      password: '<xxxx>'
    });
    
    console.log(response.data);
   ```
## Mobile App

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
