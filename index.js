const axios = require('axios');
const fs = require('fs');

let start = 0;
let end = 10000;

let id = start;
let text = '';

get();

function get(){
  setTimeout(()=>{
    if(id>end){
      save();
      return;
    }
    console.log(id);
    axios
      .get(`http://www.ccchoo.com/file-${id}.html`)
      .then((res)=>{
        text += id + res.data.match(/<title>.+<\/title>/g) + '\r\n';
        id++;
        get();
      })
      .catch((err)=>{
        console.log('err');
        id--;
        get();
      })
  },10);
}

function save(){
  if (fs.existsSync('2.txt')) {
    fs.unlinkSync('2.txt');
  }
  
  fs.writeFileSync('2.txt', text, 'utf8');  
}