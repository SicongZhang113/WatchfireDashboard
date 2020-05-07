from flask import Flask, jsonify, request

import mysql.connector
from mysql.connector import errorcode
import datetime

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
            sql = ""
            if mod == "":
                sql = "SELECT * FROM watchfire_data ORDER BY time DESC"
            else:
                sql = "SELECT * FROM watchfire_data WHERE model = '{}' ORDER BY time DESC".format(mod)
            cur.execute(sql)
            tasks = []
            for id, model, time, quantity, prediction, IBC_Pred, Stdev in cur.fetchall():
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


start_date = '2016-01-01'
end_date = '2020-06-01'


@app.route('/api/select_advanced', methods=['GET', 'POST'])
def select_advanced():
    global model
    global start_date
    global end_date
    if request.method == 'POST':
        if request.form.get('model') is not None:
            model = request.form.get('model')
            print(model)
        if request.form.get('start_date') is not None:
            start_date = request.form.get('start_date')
            print(start_date)
        if request.form.get('end_date') is not None:
            end_date = request.form.get('end_date')
            print(end_date)
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
            sql = "SELECT time, quantity, prediction, IBC_Pred, Stdev FROM watchfire_data WHERE (model = '{}') ORDER BY time ASC".format(model)
            cur.execute(sql)
            start_datetime = datetime.datetime.strptime(start_date, '%Y-%m-%d') - datetime.timedelta(days=1)
            start_input = datetime.datetime.date(start_datetime)
            end_datetime = datetime.datetime.strptime(end_date, '%Y-%m-%d')
            end_input = datetime.datetime.date(end_datetime)
            tasks = []
            for time, quantity, prediction, IBC_Pred, Stdev in cur.fetchall():
                task = dict()
                if time >= start_input and time <= end_input:
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


time = '2020-02-01'


@app.route('/api/select_barchart', methods=['GET', 'POST'])
def select_barchart():
    global time
    if request.method == 'POST':
        time = request.form.get('time')
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
            print(time)
            new_time = time[0:8] + "01"
            print(new_time)
            sql = "SELECT model, quantity, prediction, IBC_Pred FROM watchfire_data WHERE (time = '{}') ORDER BY time ASC".format(new_time)
            cur.execute(sql)
            tasks = []
            for model, quantity, prediction, IBC_Pred in cur.fetchall():
                task = dict()
                task['model'] = model
                task['time'] = time
                task['quantity'] = quantity
                task['firm_prediction'] = prediction
                task['IBC_prediction'] = IBC_Pred
                tasks.append(task)
            # Cleanup
            db.commit()
            cur.close()
            # db.close()
            print("Done.")
            return jsonify(tasks)


@app.route('/api/delete/<id>', methods=['POST'])
def delete(id):
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
        sql = "DELETE FROM watchfire_data WHERE id = '{}'".format(id)
        print(sql)
        cur.execute(sql)
        # Cleanup
        db.commit()
        cur.close()
        return jsonify({'result': True})


@app.route('/api/add', methods=['POST'])
def add():
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
        model = request.form.get('model')
        id = request.form.get('id')
        time = request.form.get('time')
        real = request.form.get('historical')
        firm = request.form.get('firm_prediction')
        IBC = request.form.get('IBC_prediction')
        cur = db.cursor()
        sql = "INSERT INTO watchfire_data VALUES({},'{}',DATE('{}'),{},{},{}, NULL)".format(id, model, time, real, firm, IBC)
        print(sql)
        cur.execute(sql)
        db.commit()
        cur.close()
        return jsonify({'result': True})


if __name__ == '__main__':
    app.run(debug=True)
