import development from "./env/development";
import production from "./env/production";
import _ from "lodash";

const dynamicConfig = process.env.NODE_ENV === "development" ? development : production; 

const config = _.extend({
    name: "Codle",
    max_attempts: 6,
    max_symbols: 8,
}, dynamicConfig );

export default config; 