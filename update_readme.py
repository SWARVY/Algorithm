import os
from pathlib import Path

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"  # 아이콘 이미지 파일들이 위치한 기본 URL

    # 시작 부분에 테이블을 추가하여 사용한 프로그래밍 언어와 아이콘을 나타냅니다.
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
    }

    # 사용한 언어 테이블
    content.append("<div align='center'>\n\n| 사용한 언어 | 아이콘 |\n|:-----------:|:-----:|\n")
    for lang, icon in languages.items():
        icon_url = f"{icons_base_url}/{icon}"
        content.append(f"| {lang} | <img src='{icon_url}' alt='{lang}' style='width: 30px; height: 30px;'/> |\n")
    content.append("\n</div>\n")  # 테이블 종료

    # "백준" 섹션 및 내용 중앙 정렬
    content.append("<div align='center'>\n\n## 백준\n")
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            platform_name = platform.name
            levels = ["Bronze", "Silver", "Gold", "Platinum"]
            for level_name in levels:
                level_dir = platform / level_name
                if level_dir.is_dir():
                    tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
                    content.append(f"\n### <img src='{tier_image_url}' alt='{level_name}' style='width: 25px; height: 25px;'/> {level_name}\n")
                    content.append("| 문제 | 문제 설명 | 풀이 |\n|:---:|:---:|:---:|\n")
                    for problem_dir in sorted(level_dir.iterdir(), key=lambda x: x.name):
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/{platform_name}/{level_name}/{problem_name}"
                            readme_path = problem_dir / "README.md"
                            problem_description_link = f"[문제 설명]({problem_url}/README.md)" if readme_path.exists() else "설명 없음"
                            # 여기서 각 문제에 대한 풀이 파일 링크를 생성합니다.
                            solution_files = [f for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                            solution_links = ', '.join([f"[{f.name.split('.')[0]}]({problem_url}/{f.name})" for f in solution_files])
                            content.append(f"| [{problem_name}]({problem_url}) | {problem_description_link} | {solution_links} |\n")

    content.append("\n</div>\n")  # 백준 섹션 종료

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
