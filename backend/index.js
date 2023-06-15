const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user')
const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://adil:aadil%400321@cluster0.1ijveb9.mongodb.net/test")
    .then(() => console.log("DBConnection Successfull"))
    .catch((err) => console.log(err))

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use(express.json());
app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
});