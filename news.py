# -*- coding:utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for, abort
from data.data import titles

app = Flask(__name__)


@app.route('/')
def get_list():
    return render_template('game_list.html', data=titles)


@app.route('/name', methods=['GET'])
def set_name():
    index = request.args.get('index')
    name = request.args.get('name')
    # 检查是否设定index，没有则拒绝访问
    if index is None:
        abort(404)
    # 第一次访问该页面
    if name is None:
        return render_template('name.html', index=index)
    # 非第一次访问，提交了空白的人物名字
    if name == "":
        return render_template('name.html', index=index, msg=u"请输入生成的新闻人物名字")
    # 正确提交
    return redirect(u"/game?name=%s&index=%s" % (name, index))


@app.route('/game')
def play_game():
    index = request.args.get('index')
    name = request.args.get('name')
    # 非正常流程
    if index is None or name is None:
        abort(404)
    # 正常访问
    return render_template('game.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':
    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')
    app.run(host='0.0.0.0', port='5001')
