const mysql = require("mysql");
const getConnection = require("../config/connection");
let con;

class database {
  /*
    you can write sql statment and  return result as well as error
  */

  executeQuery = async (sql, values = []) => {
    try {
      if (typeof con != "object") {
        con = await getConnection();
      }
      return await new Promise((resolve, reject) => {
        con.query(sql, values, (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  };

  /*
    insertData this function for insert data first argument is object of data and second argument is table name of db
  */
  insertData = async (data, table) => {
    let keys = Object.keys(data);
    let query = `insert into ${table}(`;
    keys.forEach((key) => {
      query += `${key},`;
    });
    query = query.slice(0, query.length - 1) + ")values(";
    keys.forEach((key) => {
      query += "?,";
    });
    query = query.slice(0, query.length - 1) + ")";
    let values = [];
    keys.forEach((key) => {
      values.push(`${data[key]}`);
    });
    try {
      return await this.executeQuery(query, values);
    } catch (error) {
      throw error;
    }
  };
  //for better understanding how to use (use out side of the class)
  // const fun=async()=>{
  //   let db=new database();
  //   let res=await db.insertData({std_id:500,name:"yash"},"exam_master")
  //   console.log(res);
  // }
  // fun();
  updateAnd = async (data, table, conditions) => {
    let query = `update ${table} set `;
    Object.keys(data).forEach((key) => {
      query += `${key}=?,`;
    });
    query = query.slice(0, query.length - 1);

    query = query.slice(0, query.length) + " where ";
    Object.keys(conditions).forEach((key) => {
      query += `${key}=?`;
      query += " and ";
    });
    let values = [];
    query = query.slice(0, query.length - 5) + `;`;

    Object.keys(data).forEach((key) => {
      values.push(`${data[key]}`);
    });
    Object.keys(conditions).forEach((key) => {
      values.push(`${conditions[key]}`);
    });
    try {
      return await this.executeQuery(query, values);
    } catch (error) {
      throw error;
    }
  };
  //for better understanding how to use (use out side of the class)
  // const fun=async()=>{
  //   let db=new database();
  //   let res=await db.updateAnd({std_id:500,name:"yash"},"exam_master",{std_id:500,name:"yash"})
  //   console.log(res);
  // }
  // fun();

  updateOr = async (data, table, conditions) => {
    let query = `update ${table} set `;
    Object.keys(data).forEach((key) => {
      query += `${key}=?,`;
    });
    query = query.slice(0, query.length - 1);

    query = query.slice(0, query.length) + " where ";
    Object.keys(conditions).forEach((key) => {
      query += `${key}=?`;
      query += " or ";
    });
    let values = [];
    query = query.slice(0, query.length - 4) + `;`;

    Object.keys(data).forEach((key) => {
      values.push(`${data[key]}`);
    });
    Object.keys(conditions).forEach((key) => {
      values.push(`${conditions[key]}`);
    });
    try {
      return await this.executeQuery(query, values);
    } catch (error) {
      throw error;
    }
  };

  //for better understanding how to use (use out side of the class)
  // const fun=async()=>{
  //   let db=new database();
  //   let res=await db.updateOr({std_id:500,name:"yash"},"exam_master",{std_id:500,name:"yash"})
  //   console.log(res);
  // }
  // fun();

  delete = async (table, conditions) => {
    let values = [];
    let query = `delete from ${table} where `;
    Object.keys(conditions).forEach((key) => {
      query += `${key}=? `;
      query += "and ";
    });
    query = query.slice(0, query.length - 5) + ";";
    Object.keys(conditions).forEach((key) => {
      values.push(`${conditions[key]}`);
    });
    console.log(query);
    // console.log(arr.length)
    return await this.executeQuery(query, values);
  };
}

//for better understanding how to use (use out side of the class)
// const fun=async()=>{
//   let db=new database();
//   let res=await db.delete("exam_master",{std_id:500})
//   console.log(res);
// }
// fun();

module.exports = database;
