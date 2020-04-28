from flask import Flask, jsonify, request

import mysql.connector
from mysql.connector import errorcode

app = Flask(__name__)


def getConnection():
    config = {
        'host': 'ibcserver2020.mysql.database.azure.com',
        'user': 'ibc@ibcserver2020',
        'password': 'WATCHfire!',
        'database': 'watchfire'
    }
    return mysql.connector.connect(**config)


mod = ""


@app.route('/api/tasks', methods=['GET', 'POST'])
def get_all_tasks():
    global mod
    if request.method == 'POST':
        mod = request.form.get('model')
        return jsonify({'result': True})
    else:
        try:
            db = getConnection()
            print("Connection established")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with the user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            cur = db.cursor()
            # db = getConnection()
            # print("Connection established")
            # cur = db.cursor()
            # print(cur)
            sql = ""
            if mod == "":
                sql = "SELECT * FROM watchfire_data ORDER BY time DESC"
            else:
                sql = "SELECT * FROM watchfire_data WHERE model = '{}' ORDER BY time DESC".format(mod)
            cur.execute(sql)
            tasks = []
            for model, time, quantity, prediction, IBC_Pred, Stdev in cur.fetchall():
                task = dict()
                task['model'] = model
                task['time'] = time
                task['quantity'] = quantity
                task['prediction'] = prediction
                task['IBC_prediction'] = IBC_Pred
                tasks.append(task)
            # Cleanup
            db.commit()
            cur.close()
            # db.close()
            print("Done.")
            return jsonify(tasks)


model = "2219"


@app.route('/api/select', methods=['GET', 'POST'])
def select():
    global model
    if request.method == 'POST':
        model = request.form.get('model')
        return jsonify({'result': True})
    else:
        try:
            db = getConnection()
            print("Connection established")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with the user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            cur = db.cursor()
            sql = "SELECT time, quantity, prediction, IBC_Pred, Stdev FROM watchfire_data WHERE model = '{}' ORDER BY time ASC".format(
                model)
            cur.execute(sql)
            tasks = []
            for time, quantity, prediction, IBC_Pred, Stdev in cur.fetchall():
                task = dict()
                task['time'] = time
                task['quantity'] = quantity
                task['firm_prediction'] = prediction
                task['IBC_prediction'] = IBC_Pred
                if IBC_Pred is not None and Stdev is not None:
                    task['sd_interval'] = [IBC_Pred - Stdev, IBC_Pred + Stdev]
                    print([IBC_Pred - Stdev, IBC_Pred + Stdev])
                tasks.append(task)
            # Cleanup
            db.commit()
            cur.close()
            # db.close()
            print("Done.")
            return jsonify(tasks)

m = "2219"
@app.route('/api/deposit', methods=['GET','POST'])
def get_prediction():
    global m
    if request.method == 'POST':
        m = request.form.get('model')
        return jsonify({'result': True})
    else:
        try:
            db = getConnection()
            print("Connection established")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with the user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            cur = db.cursor()
            sql = "SELECT time, IBC_Pred FROM watchfire_data WHERE model = '{}' ORDER BY time DESC".format(m)
            cur.execute(sql)
            tasks = []
            for time, IBC_Pred in cur.fetchall():
                task = dict()
                task['time'] = time
                task['model'] = m
                task['IBC_prediction'] = IBC_Pred
                tasks.append(task)
            # Cleanup
            db.commit()
            cur.close()
            return jsonify(tasks)



if __name__ == '__main__':
    app.run(debug=True)
