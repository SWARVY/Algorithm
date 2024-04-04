import os
from urllib.parse import quote

HEADER = """#
"""

def main():
    content = ""
    content += HEADER

    categories = {
        'Bronze': {'nums': [], 'links': []},
        'Silver': {'nums': [], 'links': []},
        'Gold': {'nums': [], 'links': []},
        'Platinum': {'nums': [], 'links': []},
        'Diamond': {'nums': [], 'links': []},
        'Ruby': {'nums': [], 'links': []},
    }

    # 문제 디렉토리 순회
    for root, dirs, files in os.walk("."):
        dirs.sort()
        if root == '.':
            dirs[:] = [d for d in dirs if d not in ('.git', '.github')]
            continue

        category = os.path.basename(root)
        if category in ['images', 'icons']:
            continue

        directory = os.path.basename(os.path.dirname(root))
        if directory not in categories:
            continue

        for file in files:
            file_ext = os.path.splitext(file)[1]
            if file_ext in [".cc", ".c", ".java", ".js"]:  # JavaScript 파일 포함
                problem_num = category.split('_')[-1]
                link = quote(os.path.join(root, file))
                categories[directory]['nums'].append(problem_num)
                categories[directory]['links'].append(link)

    # README 내용 구성
    content += "## 📝 Solved Algorithm Problems by Backjoon Online Judge\n"
    content += "\t- This repo is automatically managed using python & Github Action.\n\n"
    content += "### 🟤 Bronze ⚪ Silver 🟡 Gold\n"
    content += generate_table(categories, ['Bronze', 'Silver', 'Gold'])
    content += "\n### 🟢 Platinum 🔵 Diamond 🔴 Ruby\n"
    content += generate_table(categories, ['Platinum', 'Diamond', 'Ruby'])

    # README 파일 작성
    with open("README.md", "w") as fd:
        fd.write(content)

def generate_table(categories, levels):
    max_count = max(len(categories[level]['nums']) for level in levels)
    table_content = "| Num | " + " | ".join(levels) + " |\n| :-: | " + " | ".join([":-:" for _ in levels]) + " |\n"

    for i in range(max_count):
        row = f"| {str(i + 1).zfill(2)} "
        for level in levels:
            nums = categories[level]['nums']
            links = categories[level]['links']
            if i < len(nums):
                row += f"| [{nums[i]}]({links[i]}) "
            else:
                row += "| - "
        row += "|\n"
        table_content += row

    return table_content

if __name__ == "__main__":
    main()
