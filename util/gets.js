import request from "./request"
export default async()=>{
const result = await request("/getIndexData");
return result;
}