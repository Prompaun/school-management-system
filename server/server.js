require('dotenv').config();
const express = require('express')
const cors = require('cors')

const path = require("path");
const fs = require('fs');
// get the client
const mysql = require('mysql2');
const RequestApi = require('./Request-api');

const app = express();

//ser port
const PORT = process.env.PORT || 8080;
// const distPath = path.join(__dirname, '../client/dist');


app.use(cors())
// app.use(express.static(distPath));
app.use(express.json());
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB,
    ssl: {ca: process.env.SSL}
    // ssl: {ca: fs.readFileSync(path.join(__dirname, process.env.SSL))}
    // ssl: {ca: fs.readFileSync(process.env.SSL)}
    // ssl: process.env.SSL
  });

//   console.log('SSL',fs.readFileSync(path.join(__dirname, process.env.SSL)));

connection.connect((err) => {
if((err)) {
    console.log('Error connecting to MySQL database =', err)
    return;
}
console.log('MySQL successfully connected!');
})
const role_api = require('./role-api')(connection);
const Student_api = require('./Student-api')(connection);
const Parent_api = require('./Parent-api')(connection);
const Personnel_api = require('./Pesonnel-api')(connection);
const PostNews_api = require('./Post-news-api')(connection);
const checkApplicant_api = require('./check-applicant-api')(connection);
const RecruitmentPeriod_api = require('./Recruitment-period-api')(connection);
const Request_api = require('./Request-api')(connection);
const Health_api = require('./Health-api')(connection);
const google_api = require('./google-api')();

//use routes    
app.use(role_api);
app.use(Student_api);
app.use(Parent_api);
app.use(Personnel_api);
app.use(PostNews_api);
app.use(checkApplicant_api);
app.use(RecruitmentPeriod_api);
app.use(Request_api);
app.use(Health_api);
app.use(google_api);
// app.use(Personnel_api);
// app.use(Student_api);

// app.get('/NewStudent_info', (req, res) => {
//     // res.sendFile(`${__dirname}/index.html`);
//     res.sendFile("C:/Users/promp/Downloads/School-project/client/src/pages/NewStudent_info.jsx");
//   });
// Health check route

app.get('/', (req, res) => {
  return res.send(`hello world TEST=${process.env.TEST}`)
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

