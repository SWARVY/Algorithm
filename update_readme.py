import os
import re
from pathlib import Path

def extract_number(text):
    match = re.search(r'\d+', text)
    return int(match.group()) if match else 0

def language_icon_link(filename, base_url):
    extension_to_icon = {
        "c": "c.svg",
        "js": "javascript.svg",
        # 필요에 따라 추가 언어와 아이콘 매핑
    }
    extension = filename.split('.')[-1]
    icon_filename = extension_to_icon.get(extension)
    if icon_filename:
        return f"<img src='{base_url}/{icon_filename}' alt='{extension}' style='width: 20px; height: 20px;'/>"
    return None

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"

    content.append("<div align='center'>\n\n| 사용한 언어 | 아이콘 |\n|:-----------:|:-----:|\n")
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
    }
    for lang, icon in languages.items():
        icon_url = f"{icons_base_url}/{icon}"
        content.append(f"| {lang} | <img src='{icon_url}' alt='{lang}' style='width: 30px; height: 30px;'/> |\n")
    content.append("\n</div>\n")

    content.append("<div align='center'>\n\n## 백준\n")
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            platform_name = platform.name
            levels = ["Bronze", "Silver", "Gold", "Platinum"]
            for level_name in levels:
                level_dir = platform / level_name
                if level_dir.is_dir():
                    content.append(f"\n### {level_name}\n| 문제 번호 | 풀이 |\n|:---:|:---:|\n")
                    problem_dirs = sorted(level_dir.iterdir(), key=lambda x: extract_number(x.name))
                    for problem_dir in problem_dirs:
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/{platform_name}/{level_name}/{problem_name}"
                            solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                            solution_links = ' '.join([f"<a href='{problem_url}/{f.name}' target='_blank'>{language_icon_link(f.name, icons_base_url)}</a>" for f in solution_files if language_icon_link(f.name, icons_base_url)])
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
