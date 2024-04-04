import os
import re
from pathlib import Path

def extract_number(text):
    """문제 디렉토리 이름에서 숫자만 추출합니다."""
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    # 사용한 언어 아이콘만 포함하는 테이블
    content.append("<div align='center'>\n\n## 사용한 언어\n\n")
    languages = ["C", "JavaScript"]  # 사용한 언어 리스트
    icons = ["c.svg", "javascript.svg"]  # 해당 언어의 아이콘 파일 이름

    # 언어 아이콘 표시
    for icon in icons:
        icon_url = f"{icons_base_url}/{icon}"
        content.append(f"<img src='{icon_url}' alt='icon' style='width: 30px; height: 30px; margin-right: 10px;' />\n")
    
    content.append("\n</div>\n")

    # "백준" 섹션과 그 아래 내용
    content.append("<div align='center'>\n\n## 백준\n")
    platform_dir = root_dir / "백준"  # 백준 디렉토리 경로
    levels = ["Bronze", "Silver", "Gold", "Platinum"]
    for level_name in levels:
        level_dir = platform_dir / level_name
        if level_dir.exists():
            tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
            content.append(f"\n### {level_name}\n<img src='{tier_image_url}' alt='{level_name}' style='width: 50px; height: auto;'/>\n")
            content.append("| 문제 번호 | 풀이 |\n|:---------:|:----:|\n")
            problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.name))
            for problem_dir in problem_dirs:
                if problem_dir.is_dir():
                    problem_name = problem_dir.name
                    problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_name}"
                    solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                    solution_links = ' '.join([f"<a href='{problem_url}/{f.name}' target='_blank'><img src='{icons_base_url}/{f.suffix[1:]}.svg' alt='{f.suffix[1:]}' style='width: 20px; height: 20px;'/></a>" for f in solution_files])
                    content.append(f"| {problem_name} | {solution_links} |\n")
    content.append("\n</div>\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
