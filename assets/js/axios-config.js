 let basUrl = 'http://192.168.100.20:8000/'
 import axios from 'axios';
async function axiosApiCall (method,url,payload=null){
  return await axios.get(basUrl+'api/all/posts',payload).then(response=>response).catch(e=>e)
 }

 async function  callFunc()
{
  console.log(await axiosApiCall('api/all/posts','get'))
}
callFunc()