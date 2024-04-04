import os
import re
from pathlib import Path

def extract_number(text):
    """문제 디렉토리 이름에서 숫자만 추출합니다."""
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def generate_language_icons_table(icons_base_url):
    """사용한 프로그래밍 언어 아이콘을 테이블로 생성합니다."""
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
    }
    rows = []
    for lang, icon_filename in languages.items():
        icon_url = f"{icons_base_url}/{icon_filename}"
        # 언어 이름 없이 아이콘만 표시
        row = f"<img src='{icon_url}' alt='{lang}' title='{lang}' style='width: 30px; height: 30px;' />"
        rows.append(row)
    # 아이콘들을 가로로 나열합니다.
    return " ".join(rows)

def generate_readme_content(root_dir):
    content = ["<div align='center'>\n\n## 사용한 프로그래밍 언어\n\n"]
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    # 사용한 언어 아이콘 생성
    content.append(generate_language_icons_table(icons_base_url))
    content.append("\n\n## 백준\n\n")

    # "백준" 문제 섹션 처리
    platform_dir = root_dir / "백준"
    if platform_dir.exists():
        levels = ["Bronze", "Silver", "Gold", "Platinum"]
        for level_name in levels:
            level_dir = platform_dir / level_name
            if level_dir.exists():
                content.append(f"### {level_name}\n")
                content.append("| 문제 번호 | 풀이 |\n|---|---|\n")
                problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.name))
                for problem_dir in problem_dirs:
                    if problem_dir.is_dir():
                        problem_name = problem_dir.name.split(" ")[0]  # 문제 번호 추출
                        problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_dir.name}"
                        readme_url = f"{problem_url}/README.md"
                        # 풀이 링크를 언어 아이콘으로 표시
                        solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                        solution_links = ' '.join([f"<a href='{problem_url}/{f.name}' title='{f.suffix[1:]}'><img src='{icons_base_url}/{f.suffix[1:]}.svg' alt='{f.suffix[1:]}' style='width: 20px; height: 20px;'/></a>" for f in solution_files])
                        content.append(f"| [{problem_name}]({readme_url}) | {solution_links} |\n")

    content.append("\n</div>\n")
    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
