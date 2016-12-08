/**
 * Created by dev8 on 25/11/2016.
 */

let util = require('util');
let ExceptionManager = module.exports;

/**
 *
 * @type {Error}
 */
ExceptionManager.ListException =  function(msg, name){
    this.msg = msg || "Error";
    this.name = name;
};





util.inherits(ExceptionManager.ListException, Error);

