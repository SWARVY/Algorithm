import os
from urllib.parse import quote

HEADER = """#
"""

def main():
    content = ""
    content += HEADER

    # Platinum, Diamond, Ruby 카테고리 추가
    categories = {
        'Bronze': {'nums': [], 'links': []},
        'Silver': {'nums': [], 'links': []},
        'Gold': {'nums': [], 'links': []},
        'Platinum': {'nums': [], 'links': []},
        'Diamond': {'nums': [], 'links': []},
        'Ruby': {'nums': [], 'links': []},
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

        if category in ['images', 'icons']:  # icons 폴더도 무시
            continue

        directory = os.path.basename(os.path.dirname(root))

        if directory == '.':
            continue

        if directory not in categories:
            continue

        for file in files:
            file_ext = os.path.splitext(file)[1]
            if file_ext in [".cc", ".c", ".java", ".js"]:  # '.js' 추가
                problem_num = category.split('_')[-1]
                link = quote(os.path.join(root, file))
                categories[directory]['nums'].append(problem_num)
                categories[directory]['links'].append(link)

    # Platinum, Diamond, Ruby 카운트 추가
    bronze_count = len(categories['Bronze']['nums'])
    silver_count = len(categories['Silver']['nums'])
    gold_count = len(categories['Gold']['nums'])
    platinum_count = len(categories['Platinum']['nums'])
    diamond_count = len(categories['Diamond']['nums'])
    ruby_count = len(categories['Ruby']['nums'])

    # 총합과 최대 카운트 갱신
    sum_count = bronze_count + silver_count + gold_count + platinum_count + diamond_count + ruby_count
    max_count = max(bronze_count, silver_count, gold_count, platinum_count, diamond_count, ruby_count)

    content += "## 📝 Solved Algorithm Problems by Backjoon Online Judge\n"
    content += "\t- This repo is automatically managed using python & Github Action.\n"
    content += "\t- This repo contains solved algorithm files written from {} sources.\n\n".format(sum_count)
    
    # 테이블 헤더에 Platinum, Diamond, Ruby 추가
    content += "| Num | 🟤&nbsp;Bronze&nbsp;(Solved : {}) | ⚪&nbsp;Silver&nbsp;(Solved : {}) | 🟡&nbsp;Gold&nbsp;(Solved : {}) | 🟢&nbsp;Platinum&nbsp;(Solved : {}) | 🔵&nbsp;Diamond&nbsp;(Solved : {}) | 🔴&nbsp;Ruby&nbsp;(Solved : {}) |\n".format(
        bronze_count, silver_count, gold_count, platinum_count, diamond_count, ruby_count
    )
    content += "| :-: | :-------------: | :------------: | :----------: | :----------: | :----------: | :----------: |\n"

    # 각 테이블 행을 생성
    for i in range(max_count):
        row_cells = [str(i + 1).zfill(2)]  # 테이블 행 시작에 번호 추가
        for category in categories:
            num = categories[category]['nums'][i] if i < len(categories[category]['nums']) else ''
            link = categories[category]['links'][i] if i < len(categories[category]['links']) else ''
            cell = "[{}]({})".format(num, link) if num and link else '-'
            row_cells.append(cell)
        content += "| " + " | ".join(row_cells) + " |\n"

    with open("README.md", "w") as fd:
        fd.write(content)


if __name__ == "__main__":
    main()
