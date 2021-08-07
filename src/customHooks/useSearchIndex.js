import React, { useEffect, useState } from "react";
import db from "../db";

/**
 * @typedef {Object} statusDataError
 * @property {string} status - "loading" || "idle" || "success" || "error"
 * @property {array} data - array
 * @property {any} error - return error
 */

/**
 *A custom hook to query indexeddb.
 *
 * @param {object} query - responsible to make query;
 * @param {string} query.category - key path of the table
 * @param {*} query.searchValue - value to searhc under table/key
 * @param {string} query.table - table name
 * @returns {statusDataError} results - the {@link statusDataError} object
 */

function useSearchIndex(query) {
  let initialValues = {
    status: query ? "loading" : "idle",
    data: undefined,
    error: undefined,
  };

  let { category, searchValue, table } = query;
  let [results, setResults] = useState(initialValues);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      db[table]
        .where(category)
        .equals(searchValue)
        .toArray()
        .then((res) => {
          console.log(res);
          setResults((prevState) => ({
            ...prevState,
            data: res,
            status: "success",
          }));
        })
        .catch((err) => {
          setResults((prevState) => ({
            ...prevState,
            status: "error",
            error: err,
          }));
        });
    })();
    return () => {
      isMounted = false;
    };
  }, [category, searchValue, table]); //run only once

  console.log(results);
  return results;
}

export default useSearchIndex;
