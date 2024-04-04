import os
from pathlib import Path
import re

def extract_number(text):
    """문제 디렉토리 이름에서 숫자를 추출합니다."""
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def generate_language_icons_table(icons_base_url):
    """사용한 프로그래밍 언어의 아이콘만 포함된 테이블을 생성합니다."""
    languages = {
        "C": "c.svg",
        "JavaScript": "js.svg",  # js.svg가 올바른 파일명임을 가정
    }
    table_content = ["<table align='center'><tr>"]
    for lang, icon_filename in languages.items():
        icon_url = f"{icons_base_url}/{icon_filename}"
        table_content.append(f"<td align='center'><img src='{icon_url}' alt='{lang}' title='{lang}' style='width: 30px; height: 30px;'/></td>")
    table_content.append("</tr></table>")
    return "".join(table_content)

def generate_problems_table(platform_dir, levels, icons_base_url):
    """문제 섹션과 해당하는 문제들을 테이블로 생성합니다."""
    content = ["<table align='center'><tr>"]
    # 등급별로 열 추가
    for level_name in levels:
        level_dir = platform_dir / level_name
        if level_dir.exists():
            tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
            content.append(f"<th><img src='{tier_image_url}' alt='{level_name}' style='vertical-align: middle; width: 40px; height: auto;'/> {level_name}</th>")
        else:
            content.append("<th>-</th>")  # 디렉토리가 없는 경우
    content.append("</tr><tr>")
    for level_name in levels:
        level_dir = platform_dir / level_name
        if level_dir.exists():
            problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.stem))
            problem_links = ' '.join([f"<a href='https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_dir.name}/README.md'>{problem_dir.name}</a>" for problem_dir in problem_dirs])
            content.append(f"<td>{problem_links if problem_links else '-'}</td>")
        else:
            content.append("<td>-</td>")  # 디렉토리가 없는 경우
    content.append("</tr></table>")
    return "".join(content)

def generate_readme_content(root_dir):
    content = ["<div align='center'>\n\n## 사용한 프로그래밍 언어\n\n"]
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    # 사용한 언어 아이콘 생성
    content.append(generate_language_icons_table(icons_base_url))
    content.append("\n\n")

    # "백준" 문제 섹션 처리
    content.append("## 백준\n\n")
    platform_dir = root_dir / "백준"
    if platform_dir.exists():
        # Bronze, Silver, Gold 한 테이블로 묶기
        content.append(generate_problems_table(platform_dir, ["Bronze", "Silver", "Gold"], icons_base_url))
        content.append("\n\n")
        # Platinum, Diamond, Ruby 한 테이블로 묶기
        content.append(generate_problems_table(platform_dir, ["Platinum", "Diamond", "Ruby"], icons_base_url))
    content.append("\n</div>\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
