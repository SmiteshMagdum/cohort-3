//jwt explanationss (assignments)
const jwt = require("jsonwebtoken");
const { MongoTailableCursorError } = require("mongodb");
const jwtPassword = "secret";
const zod = require("zod");

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
  const usernameResponse = emailSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);
  if (!usernameResponse.success || !passwordResponse.success) {
    return null;
  }
  const signtaure = jwt.sign({
    username,
    
  },jwtPassword);
  return signtaure;
}

 

function verifyJwt(token) {
  let ans = true
  try{
   jwt.verify(token, jwtPassword)
  }catch(e){
    ans = false
  }
 return ans;
  }


function decodeJwt(token) {
  // Your code here
  const decoded = jwt.decode(token)
  if(decoded){
    return true
  }else{
    return false
  }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
