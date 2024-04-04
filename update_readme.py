import os
from pathlib import Path
import re

def extract_number(text):
    """문제 디렉토리 이름에서 숫자를 추출합니다."""
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def generate_problems_section(platform_dir, levels, icons_base_url):
    """문제 섹션을 생성합니다."""
    content = ["<tr>"]
    for level_name in levels:
        level_dir = platform_dir / level_name
        content.append(f"<td align='center' valign='top'><strong>{level_name}</strong><br/>")
        if level_dir.exists():
            problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.stem))
            for problem_dir in problem_dirs:
                if problem_dir.is_dir():
                    problem_name = ' '.join(problem_dir.name.split()[1:])  # 문제 이름
                    problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_dir.name}"
                    content.append(f"<a href='{problem_url}/README.md'>{problem_dir.name}</a><br/>")
        else:
            content.append("-")
        content.append("</td>")
    content.append("</tr>")
    return "".join(content)

def generate_solution_icons(solution_files, problem_url, icons_base_url):
    """풀이 파일들에 대한 언어별 아이콘 링크를 생성합니다."""
    extension_to_icon = {
        ".c": "c.svg",
        ".js": "js.svg",  # 파일명 확인 필요
    }
    solution_icons = []
    for f in solution_files:
        icon_filename = extension_to_icon.get(f.suffix, None)  # 확장자에 해당하는 아이콘 파일 이름을 가져옵니다.
        if icon_filename:  # 해당하는 아이콘 파일 이름이 있는 경우에만 링크 생성
            icon_url = f"{icons_base_url}/{icon_filename}"
            solution_icon = f"<a href='{problem_url}/{f.name}' title='{f.suffix[1:]}'><img src='{icon_url}' alt='{f.suffix[1:]}' style='width: 20px; height: 20px;'/></a>"
            solution_icons.append(solution_icon)
    return ' '.join(solution_icons)

def generate_readme_content(root_dir):
    content = ["<table border='1' align='center'>"]
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"
    platform_dir = root_dir / "백준"

    # 브론즈, 실버, 골드 문제 섹션
    content.append(generate_problems_section(platform_dir, ["Bronze", "Silver", "Gold"], icons_base_url))
    # 플래티넘, 다이아몬드, 루비 문제 섹션
    content.append(generate_problems_section(platform_dir, ["Platinum", "Diamond", "Ruby"], icons_base_url))

    content.append("</table>")
    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
