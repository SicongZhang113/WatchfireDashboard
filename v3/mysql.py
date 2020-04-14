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


@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    db = getConnection()
    cur = db.cursor()
    sql = "SELECT * FROM forecasrting_data"
    cur.execute(sql)
    db.close()
    tasks = []
    for  model, time, quantity, prediction in cur.fetchall():
        task = dict()
        task['model'] = model
        task['time'] = time
        task['quantity'] = quantity
        task['prediction'] = prediction
        tasks.append(task)
    return jsonify(tasks)

@app.route('/api/linechart', methods=['GET'])
def get_line_chart_data():
    db = getConnection()
    cur=db.cursor()
    sql = "SELECT time, quantity FROM forecasrting_data"
    cur.execute(sql)
    db.close()
    dataset = []
    for time, quantity in cur.fetchall():
        data = dict()
        data['time'] = time
        data['quantity'] = quantity
        dataset.append(data)
    return jsonify(dataset)


if __name__ == '__main__':
    app.run(debug=True)
