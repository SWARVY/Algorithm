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
        # "JavaScript": "javascript.svg", 파일 이름이나 경로에 문제가 없는지 확인하세요.
        "JavaScript": "javascript.svg",  # 예시 경로, 실제 경로로 변경해야 할 수 있습니다.
    }
    table_content = ["<table align='center'><tr>"]
    for lang, icon_filename in languages.items():
        icon_url = f"{icons_base_url}/{icon_filename}"
        table_content.append(f"<td align='center'><img src='{icon_url}' alt='{lang}' title='{lang}' style='width: 30px; height: 30px;'/></td>")
    table_content.append("</tr></table>")
    return "".join(table_content)

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    # 사용한 언어 아이콘 생성
    content.append("<div align='center'>\n\n## 사용한 프로그래밍 언어\n\n")
    content.append(generate_language_icons_table(icons_base_url))
    content.append("\n</div>\n")

    # "백준" 문제 섹션 처리
    content.append("<div align='center'>\n\n## 백준\n")
    platform_dir = root_dir / "백준"
    if platform_dir.exists():
        levels = ["Bronze", "Silver", "Gold", "Platinum"]
        for level_name in levels:
            level_dir = platform_dir / level_name
            if level_dir.exists():
                # 등급 이미지 추가
                tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
                content.append(f"\n### <img src='{tier_image_url}' alt='{level_name}' style='vertical-align: middle; width: 50px; height: auto;'/> {level_name}\n")
                content.append("<table align='center'><tr><th>문제 번호</th><th>풀이</th></tr>")
                problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.stem))
                for problem_dir in problem_dirs:
                    if problem_dir.is_dir():
                        problem_name = problem_dir.stem
                        problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_dir.name}"
                        solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                        solution_links = ' '.join([f"<a href='{problem_url}/{f.name}' title='{f.suffix[1:]}'><img src='{icons_base_url}/{f.suffix[1:]}.svg' alt='{f.suffix[1:]}' style='width: 20px; height: 20px;'/></a>" for f in solution_files])
                        content.append(f"<tr><td align='center'>{problem_name}</td><td align='center'>{solution_links}</td></tr>")
                content.append("</table>\n")
    content.append("\n</div>\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
