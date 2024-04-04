import os
import re
from pathlib import Path

def extract_number(text):
    """문제 디렉토리 이름에서 숫자만 추출합니다."""
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def language_icon_link(filename, base_url):
    """파일 확장자에 따라 해당 언어의 아이콘 링크를 생성합니다."""
    extension_to_icon = {
        "c": "c.svg",
        "js": "javascript.svg",
        # 필요한 경우 여기에 더 많은 언어와 해당 아이콘을 추가합니다.
    }
    extension = filename.split('.')[-1]
    icon_filename = extension_to_icon.get(extension)
    if icon_filename:
        # 해당 언어의 아이콘 이미지 태그 반환
        return f"<a href='{base_url}/{filename}' target='_blank'><img src='{base_url}/{icon_filename}' alt='{extension}' style='width: 20px; height: 20px;'/></a>"
    return None

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    # 사용한 언어 목록과 아이콘
    content.append("<div align='center'>\n\n## 사용한 언어\n\n| 언어 | 아이콘 |\n|:----:|:----:|\n")
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
    }
    for lang, icon in languages.items():
        icon_url = f"{icons_base_url}/{icon}"
        content.append(f"| {lang} | <img src='{icon_url}' alt='{lang}' style='width: 30px; height: 30px;'/> |\n")
    content.append("\n</div>\n")

    # "백준" 섹션과 그 아래 내용
    content.append("<div align='center'>\n\n## 백준\n")
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            levels = ["Bronze", "Silver", "Gold", "Platinum"]
            for level_name in levels:
                level_dir = platform / level_name
                if level_dir.is_dir():
                    # 등급 이미지 추가
                    tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
                    content.append(f"\n### {level_name} <img src='{tier_image_url}' alt='{level_name}' style='width: 25px; height: 25px;'/>\n")
                    content.append("| 문제 번호 | 문제 설명 | 풀이 |\n|:---------:|:---------:|:----:|\n")
                    problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.name))
                    for problem_dir in problem_dirs:
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/백준/{level_name}/{problem_name}"
                            readme_url = f"{problem_url}/README.md"
                            solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                            # 언어 아이콘 링크를 생성합니다.
                            solution_links = ' '.join([language_icon_link(f.name, problem_url) for f in solution_files if language_icon_link(f.name, icons_base_url)])
                            content.append(f"| {problem_name} | [문제 설명]({readme_url}) | {solution_links} |\n")
    content.append("\n</div>\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
