const  express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT,function () {
    console.log("sever is running..");
});
app.use(express.static("public"));
//su dung view engine
app.set("view engine","ejs");


var counter = 0;
app.get("/",function (req,res) {
    counter ++
    let city = req.query.cityname;
    if (city===undefined){
        city = "Hanoi,vietnam";
    }
   res.render("DEMO",{
       counter: counter,
       city:city
   });
});
app.get("/about-us",function (req,res) {
    res.send(" di uong bia di..");
});
// var cities = [
//     {
//         id: 1,
//         name:"hanoi",
//         label:"Hà Nội",
//         description:"Hà Nội là thủ đô của nước Cộng hòa Xã hội chủ nghĩa Việt Nam, cũng là kinh đô của hầu hết các vương triều phong kiến tại Việt Nam trước đây. Do đó, lịch sử Hà Nội gắn liền với sự thăng trầm của lịch sử Việt Nam qua các thời kỳ.[4] Hà Nội là thành phố trực thuộc trung ương có diện tích lớn nhất cả nước từ khi tỉnh Hà Tây sáp nhập vào, đồng thời cũng là địa phương đứng thứ nhì về dân số với hơn 8 triệu người (năm 2019), tuy nhiên, nếu tính những người cư trú không đăng ký thì dân số thực tế của thành phố này năm 2019 là gần 10 triệu người. Mật độ dân số của Hà Nội là 2.398 người/km², mật độ giao thông là 105,2 xe/km² mặt đường. Hiện nay, Hà Nội là một đô thị loại đặc biệt của Việt Nam.",
//         area: "3.359 km"
//     },
//     {
//         id: 2,
//         name:"haiphong",
//         label:"Hải Phòng",
//         description:"Hải Phòng , thủ đô Việt Nam, nổi tiếng",
//         area: "3.359 km"
//     },
//     {
//         id: 3,
//         name:"cairo",
//         label:"cairo, Ai Cập",
//         description:"Cairo, thủ đô Việt Nam, nổi tiếng",
//         area: "3.359 km"
//     },
//     {
//         id: 4,
//         name:"london",
//         label:"London, Anh",
//         description:"London, thủ đô Việt Nam, nổi tiếng",
//         area: "3.359 km"
//     },
//     {
//         id: 5,
//         name:"new york",
//         label:"New York, Mỹ",
//         description:"New York, thủ đô Việt Nam, nổi tiếng",
//         area: "3.359 km"
//     },
// ];

const fs = require("fs");
app.get("/danh-sach-thanh-pho",function (req,res) {
    let data = fs.readFileSync("data/thanhpho.json","utf-8");

    // res.send(data);
    let cities = JSON.parse(data);
    res.render("cities",{
        cities:cities
    });
});

app.get("/thanh-pho/:id",function (req,res) {
    let cityId = req.params.id;
    let city ={};
    let data = fs.readFileSync("data/thanhpho.json","utf-8");
    let cities = JSON.parse(data);
    cities.map(function (e) {
        if(e.id == cityId){
            city = e;
        }
    });
    res.render("city",{
        city:city
    });
});
app.get("/api/messages",function (req,res) {
    let data = [
        {
            msg: "xin chao",
            name: "thanh tu"
        },
        {
            msg: "xin chao 2",
            name: "tuan"
        },
        {
            msg: "xin cha 3",
            name: "thang"
        }
    ];
    let rs = {
        status: true,
        message: "Success",
        data: data
    }
    res.send(rs);
});