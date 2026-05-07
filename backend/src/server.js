import { poolOption } from "./config/env.js";
import app from "./app.js";

// Run server
app.listen(poolOption.port,()=>{
    console.log(`Server listen on port:${poolOption.port}`)
})