import os
from pathlib import Path

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"  # 아이콘 이미지 파일들이 위치한 기본 URL

    # 사용한 프로그래밍 언어와 해당 아이콘을 나타내는 테이블 추가
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
        "Python": "python.svg",
    }

    content.append("| 사용한 언어 | 아이콘 |\n")
    content.append("|:-----------:|:-----:|\n")  # 모든 요소 중앙 정렬
    for lang, icon in languages.items():
        icon_url = f"{icons_base_url}/{icon}"
        content.append(f"| {lang} | <img src='{icon_url}' alt='{lang}' style='display: block; margin: auto; width: 30px; height: 30px;'/> |\n")

    # "백준" 섹션 시작 전에 테이블 추가
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            platform_name = platform.name
            content.append(f"\n## {platform_name}\n")
            levels = ["Bronze", "Silver", "Gold", "Platinum"]
            for level_name in levels:
                level_dir = platform / level_name
                if level_dir.is_dir():
                    tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
                    content.append(f'### <img src="{tier_image_url}" alt="{level_name}" style="vertical-align: middle; width:25px; height:25px;"/> <span style="vertical-align: middle;">{level_name}</span>\n')
                    content.append("| 문제 | 문제 설명 | 풀이 |\n| --- | --- | --- |\n")
                    for problem_dir in sorted(level_dir.iterdir(), key=lambda x: x.name):
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/{platform_name}/{level_name}/{problem_name}"
                            solution_files = [f.name for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                            solution_links = language_icon_links(solution_files, icons_base_url)
                            
                            readme_path = problem_dir / "README.md"
                            readme_url = f"{problem_url}/README.md"
                            problem_description_link = f"[문제 설명]({readme_url})" if readme_path.exists() else "설명 없음"
                            
                            content.append(f"| [{problem_name}]({problem_url}) | {problem_description_link} | {solution_links} |\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
