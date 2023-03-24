import os
from urllib import parse

HEADER = """#
# 백준, 프로그래머스 문제 풀이 목록
"""

def main():
    content = ""
    content += HEADER

    categories = {
        'Bronze': {'nums': [], 'links': []},
        'Silver': {'nums': [], 'links': []},
        'Gold': {'nums': [], 'links': []},
    }

    for root, dirs, files in os.walk("."):
        dirs.sort()
        if root == '.':
            for dir in ('.git', '.github'):
                try:
                    dirs.remove(dir)
                except ValueError:
                    pass
            continue

        category = os.path.basename(root)

        if category == 'images':
            continue

        directory = os.path.basename(os.path.dirname(root))

        if directory == '.':
            continue

        if directory not in categories:
            continue

        for file in files:
            file_ext = os.path.splitext(file)[1]
            if file_ext == ".js":
                problem_num = category.split('_')[-1]
                link = parse.quote(os.path.join(root, file))
                categories[directory]['nums'].append(problem_num)
                categories[directory]['links'].append(link)

    bronze_count = len(categories['Bronze']['nums'])
    silver_count = len(categories['Silver']['nums'])
    gold_count = len(categories['Gold']['nums'])

    max_count = max(bronze_count, silver_count, gold_count)

    content += "## 📚 Baekjoon AutoPush Repository\n"
    content += "| Num |  🟤&nbsp;Bronze ({}) | ⚪&nbsp;Silver ({}) | 🟡&nbsp;Gold ({}) |\n".format(bronze_count, silver_count, gold_count)
    content += "| :-: | --------------- | -------------- | ------------ |\n"

    for i in range(max_count):
        bronze_num = categories['Bronze']['nums'][i] if i < bronze_count else ''
        silver_num = categories['Silver']['nums'][i] if i < silver_count else ''
        gold_num = categories['Gold']['nums'][i] if i < gold_count else ''

        bronze_link = categories['Bronze']['links'][i] if i < bronze_count else ''
        silver_link = categories['Silver']['links'][i] if i < silver_count else ''
        gold_link = categories['Gold']['links'][i] if i < gold_count else ''

        content += "| {} | [{}]({}) | [{}]({}) | [{}]({}) |\n".format(
            str(i + 1).zfill(2),
            bronze_num,
            bronze_link,
            silver_num,
            silver_link,
            gold_num,
            gold_link
        )

    with open("README.md", "w") as fd:
        fd.write(content)


if __name__ == "__main__":
    main()
Footer
