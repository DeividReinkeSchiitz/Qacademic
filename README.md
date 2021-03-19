# Qacademic
App to view Qacademic users data from http://academico.ifmt.edu.br/ by web scraping.

# Task lists
- [ ] Finish Api
   - [x] Get High School Grades 
   - [x] Get class material
   - [ ] Get class schedule
   - [ ] Get College Grades
- [ ] Finish Mobile App


## API usage
### Local Machine:
 ```  
  git clone git@github.com:DeividReinkeSchiitz/Qacademic.git;
  cd server;
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
 See on play store: https://play.google.com/store/apps/details?id=com.deividreinke.AcademicView
 <p align="center">
      <img src="https://github.com/DeividReinkeSchiitz/Qacademic/blob/master/image1.jpg" width="350"/>
      <img src="https://github.com/DeividReinkeSchiitz/Qacademic/blob/master/image2.jpg" width="350"/>
 </p>
 
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
