 import axios from 'axios';

 export const getTokenApi=async()=>{
  return new Promise(async(resolve, reject)=>{
 await axios.get(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_API_TOKENURL}`).then(function ({data}){
       resolve(data);
    }).catch(function (error){
       reject(error);
    });
  });
 }

