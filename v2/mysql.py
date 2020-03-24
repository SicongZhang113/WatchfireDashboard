from flask import Flask, jsonify, request
import pymysql


app = Flask(__name__)

def getConnection():
    return pymysql.connect(host="127.0.0.1",
                           port=3306,
                           user="root",
                           passwd="WMrf2020*",
                           database="forecasting_data")


@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    db = getConnection()
    cur = db.cursor()
    sql = "SELECT * FROM basic_data"
    cur.execute(sql)
    u = cur.fetchall()
    db.close()
    return jsonify(u)


if __name__ == '__main__':
    app.run(debug=True)
