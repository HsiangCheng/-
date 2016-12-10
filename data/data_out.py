# -*- coding:utf-8 -*-
# news_data中的数据是原始数据，此脚本作用是将原始数据中的标题提取出来，
# 生成titles列表

from news_data import g_data

if __name__ == '__main__':
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')
    # 通过读取g_data生成简单的新闻标题列表
    data_file = open('data.py', 'w')
    # 文件头
    content = [
        u'# -*- coding:utf-8 -*-', u'\n', u'\n',
        u'titles = [', '\n'
    ]
    # 遍历，格式化
    for data in g_data:
        content.append(u'    ')
        content.append(u"u'")
        content.append(data.get('title'))
        content.append(u"'")
        content.append(u',\n')
    # 文件尾
    content.append(u']')
    data_file.write(''.join(content))
    data_file.close()
