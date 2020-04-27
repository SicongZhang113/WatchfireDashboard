from flask import Flask, jsonify, request
import pymysql

app = Flask(__name__)


def getConnection():
    return pymysql.connect(host="127.0.0.1",
                           port=3306,
                           user="root",
                           passwd="Louise113.",
                           database="data",
                           charset='utf8')

mod = ""
@app.route('/api/tasks', methods=['GET', 'POST'])
def get_all_tasks():
    global mod
    if request.method == 'POST':
        mod = request.form.get('model')
        return jsonify({'result': True})
    else:
        db = getConnection()
        cur = db.cursor()
        sql = ""
        if mod == "":
            sql = "SELECT * FROM data_quantity ORDER BY time DESC"
        else:
            sql = "SELECT * FROM data_quantity WHERE model = '{}' ORDER BY time DESC".format(mod)
        cur.execute(sql)
        db.close()
        tasks = []
        for model, time, quantity, prediction in cur.fetchall():
            task = dict()
            task['model'] = model
            task['time'] = time
            task['quantity'] = quantity
            task['prediction'] = prediction
            tasks.append(task)
        return jsonify(tasks)


model = "2219 (Includes T/T)"


@app.route('/api/select', methods=['POST', 'GET'])
def select():
    global model
    if request.method == 'POST':
        model = request.form.get('model')
        return jsonify({'result': True})
    else:
        db = getConnection()
        cur = db.cursor()
        sql = "SELECT time, quantity FROM data_quantity WHERE model = '{}' ORDER BY time ASC".format(model)
        cur.execute(sql)
        db.close()
        tasks = []
        for time, quantity in cur.fetchall():
            task = dict()
            task['time'] = time
            task['quantity'] = quantity
            tasks.append(task)
        return jsonify(tasks)


if __name__ == '__main__':
    app.run(debug=True)
