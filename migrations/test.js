
import bcrypt from "bcryptjs";


const hashedPassword = bcrypt.hashSync("@oxD333RxnHjJ#DN!t", 10);



console.log(hashedPassword);