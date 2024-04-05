require('dotenv').config();
const express = require('express')
const cors = require('cors')

const path = require("path");
const fs = require('fs');
// get the client
const mysql = require('mysql2');
// const RequestApi = require('./Request-api');

const app = express();

//ser port
const PORT = process.env.PORT || 8080;
// const distPath = path.join(__dirname, '../client/dist');


app.use(cors())
// app.use(express.static(distPath));
app.use(express.json());
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));


// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PORT_DB,
//     ssl: {ca: process.env.SSL}
//     // ssl: {ca: fs.readFileSync(path.join(__dirname, process.env.SSL))}
//     // ssl: {ca: fs.readFileSync(process.env.SSL)}
//     // ssl: process.env.SSL
//   });
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB,
  ssl: { rejectUnauthorized: false }
});

//   console.log('SSL',fs.readFileSync(path.join(__dirname, process.env.SSL)));

connection.connect((err) => {
if((err)) {
    console.log('Error connecting to MySQL database =', err)
    return;
  }
  else{
    console.log('MySQL successfully connected!');
  }
})
const addStudentID_api = require('./add-student-id-api')(connection);
const role_api = require('./role-api')(connection);
const Student_api = require('./Student-api')(connection);
const Parent_api = require('./Parent-api')(connection);
const Assessment_api = require('./Assessment-api')(connection);
const Personnel_api = require('./Pesonnel-api')(connection);
const PostNews_api = require('./Post-news-api')(connection);
const checkApplicant_api = require('./check-applicant-api')(connection);
const RecruitmentPeriod_api = require('./Recruitment-period-api')(connection);
const Request_api = require('./Request-api')(connection);
const Health_api = require('./Health-api')(connection);
const googleLogin_api = require('./google-login-api')();
const googleUpload_api = require('./google-upload-api')(connection);
const manageClass_api = require('./manage-student-class-api')(connection)

const congenitalDisease_api = require('./congenital-disease-api')(connection)
const historyDisease_api = require('./history-disease-api')(connection)
const accident_api = require('./accident-api')(connection)
const allergic_api = require('./allergic-api')(connection)

const basicVaccine_api = require('./basic-vaccine-api')(connection)
const alternativeVaccine_api = require('./alternative-vaccine-api')(connection)

//use routes    
app.use(addStudentID_api);
app.use(role_api);
app.use(Student_api);
app.use(Parent_api);
app.use(Assessment_api);
app.use(Personnel_api);
app.use(PostNews_api);
app.use(checkApplicant_api);
app.use(RecruitmentPeriod_api);
app.use(Request_api);
app.use(Health_api);
app.use(googleLogin_api);
app.use(googleUpload_api);
app.use(manageClass_api)

app.use(congenitalDisease_api);
app.use(historyDisease_api);
app.use(accident_api);
app.use(allergic_api);

app.use(basicVaccine_api);
app.use(alternativeVaccine_api);
// app.use(Personnel_api);
// app.use(Student_api);

// app.get('/NewStudent_info', (req, res) => {
//     // res.sendFile(`${__dirname}/index.html`);
//     res.sendFile("C:/Users/promp/Downloads/School-project/client/src/pages/NewStudent_info.jsx");
//   });
// Health check route

app.get('/', (req, res) => {
  // return res.send(`hello world TEST=${process.env.TEST} ${process.env.HOST} ${process.env.USER} ${process.env.DATABASE} ${process.env.PASSWORD} ${process.env.PORT_DB} ${process.env.SSL} `)
  return res.send(`hello world TEST=${process.env.TEST} `)

});

// app.get('/health', (req, res) => {
//     // ส่งคำตอบกลับว่าแอปพลิเคชันทำงานอย่างถูกต้องด้วยสถานะ HTTP 200
//     res.status(200).send('OK');
//   });

//initialize the app.
async function initialize(){    
  app.listen(PORT);
};

initialize()
  .finally(
      () => console.log(`app started on port:${PORT}`)
  );

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })