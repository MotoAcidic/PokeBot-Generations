// Copyright 2020 Precision Electric Motor Sales

module.exports = async (client, message) => {

 /****************************************************************************
 * Performs a database query.
 * 
 * @param {string} query The MySQL query to perform.
 * @param {any[]} variables The list of variables for the query string.
 * 
 * @returns {any[]} The query results.
 ****************************************************************************/
    async function doQuery(query, variables) {
        return new Promise(async function (resolve, reject) {
            await con.query(query, variables, function (err, rows) {
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
    };
};