import development from "./env/development";
import production from "./env/production";
import extend from "lodash/extend";

const dynamicConfig = process.env.NODE_ENV === "development" ? development : production; 

const config = extend({
    name: "Codle",
    max_attempts: 6,
    max_symbols: 8,
}, dynamicConfig );

export default config; 