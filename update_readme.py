import os
from pathlib import Path

def language_icon_links(filenames, base_url):
    """파일명 목록에 따라 프로그래밍 언어 아이콘의 링크 목록을 반환합니다."""
    extension_to_icon = {
        ".c": "c.svg",
        ".js": "javascript.svg",
        ".py": "python.svg",
        # 필요에 따라 더 많은 확장자와 아이콘 파일을 추가할 수 있습니다.
    }
    links = []
    for filename in filenames:
        _, extension = os.path.splitext(filename)
        icon_filename = extension_to_icon.get(extension)
        if icon_filename:
            # GitHub 저장소의 이미지 파일 URL을 생성합니다.
            icon_url = f"{base_url}/{icon_filename}"
            links.append(f"![{extension}]({icon_url})")
    return ' '.join(links) if links else 'N/A'  # 아이콘 링크 목록 반환, 없으면 N/A

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"  # 아이콘 이미지 파일들이 위치한 기본 URL
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            platform_name = platform.name
            content.append(f"## {platform_name}\n")
            levels = ["Bronze", "Silver", "Gold", "Platinum"]
            for level_name in levels:
                level_dir = platform / level_name
                if level_dir.is_dir():
                    # 난이도별 티어 이미지 추가 및 크기 조정
                    tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
                    content.append(f"### <img src='{tier_image_url}' width='25' height='25'> {level_name}\n")
                    content.append("| 문제 | 문제 설명 | 풀이 |\n| --- | --- | --- |\n")
                    for problem_dir in sorted(level_dir.iterdir(), key=lambda x: x.name):
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/{platform_name}/{level_name}/{problem_name}"
                            solution_files = [f.name for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                            solution_links = f"[{language_icon_links(solution_files, icons_base_url)}]({problem_url})"
                            
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
