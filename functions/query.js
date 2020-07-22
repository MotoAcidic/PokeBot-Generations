
module.exports = {

 /****************************************************************************
 * Performs a database query.
 * 
 * @param {string} query The MySQL query to perform.
 * @param {any[]} variables The list of variables for the query string.
 * 
 * @returns {any[]} The query results.
 ****************************************************************************/
    doQuery: async function(query, variables) {
        return new Promise(async function (resolve, reject) {
            await global.con.query(query, variables, function (err, rows) {
                if (err) {
                    con.rollback(function () {
                        console.error(err);
                    });
                    reject(null);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};