import os
from pathlib import Path
import re

def extract_number(text):
    """문제 디렉토리 이름에서 숫자를 추출합니다."""
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def generate_solution_links(solution_files, problem_url, icons_base_url):
    """풀이 파일들에 대한 링크와 언어 아이콘을 생성합니다."""
    extension_to_icon = {
        ".c": "c.svg",
        ".js": "js.svg",  # 파일명 확인 필요
    }
    solution_links = []
    for f in solution_files:
        icon_filename = extension_to_icon.get(f.suffix, None)  # 확장자에 해당하는 아이콘 파일 이름을 가져옵니다.
        if icon_filename:  # 해당하는 아이콘 파일 이름이 있는 경우에만 링크 생성
            icon_url = f"{icons_base_url}/{icon_filename}"
            solution_link = f"<a href='{problem_url}/{f.name}' title='{f.suffix[1:]}'><img src='{icon_url}' alt='{f.suffix[1:]}' style='width: 20px; height: 20px;'/></a>"
            solution_links.append(solution_link)
    return ' '.join(solution_links)

def generate_problems_table(platform_dir, level_name, icons_base_url):
    """각 등급별 문제를 테이블로 생성합니다."""
    level_dir = platform_dir / level_name
    content = ["<table align='center'><tr><th>문제 이름</th><th>풀이 링크</th></tr>"]
    if level_dir.exists():
        problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.stem))
        for problem_dir in problem_dirs:
            if problem_dir.is_dir():
                problem_name = ' '.join(problem_dir.name.split()[1:])  # 문제 이름
                problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_dir.name}"
                solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                solution_links = generate_solution_links(solution_files, problem_url, icons_base_url)
                content.append(f"<tr><td>{problem_name}</td><td>{solution_links}</td></tr>")
    else:
        content.append("<tr><td colspan='2'>-</td></tr>")
    content.append("</table>")
    return "".join(content)

def generate_readme_content(root_dir):
    content = ["<div align='center'>\n\n## 사용한 프로그래밍 언어\n\n"]
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    # "백준" 문제 섹션 처리
    content.append("## 백준\n\n")
    platform_dir = root_dir / "백준"
    if platform_dir.exists():
        for level_name in ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"]:
            content.append(f"### {level_name}\n")
            content.append(generate_problems_table(platform_dir, level_name, icons_base_url))
            content.append("\n")
    content.append("\n</div>\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
