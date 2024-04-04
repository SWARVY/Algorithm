import os
from pathlib import Path

def generate_readme_content(root_dir):
    content = []
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            platform_name = platform.name
            content.append(f"## {platform_name}\n")
            levels = ["Bronze", "Silver", "Gold", "Platinum"]
            for level_name in levels:
                level_dir = platform / level_name
                if level_dir.is_dir():
                    content.append(f"### {level_name}\n")
                    content.append("| 문제 | 문제 설명 | 풀이 |\n| --- | --- | --- |\n")
                    for problem_dir in sorted(level_dir.iterdir(), key=lambda x: x.name):
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/{platform_name}/{level_name}/{problem_name}"
                            # README.md 파일을 제외한 풀이 파일 목록 생성
                            solution_files = [f.name for f in problem_dir.iterdir() if f.is_file() and f.name != "README.md"]
                            solution_links = [f"[{solution_file}]({problem_url}/{solution_file})" for solution_file in solution_files]
                            
                            # 문제 설명 대신 README.md 파일로의 링크를 제공
                            readme_path = problem_dir / "README.md"
                            readme_url = f"{problem_url}/README.md"
                            problem_description_link = f"[문제 설명]({readme_url})" if readme_path.exists() else "설명 없음"
                            
                            content.append(f"| [{problem_name}]({problem_url}) | {problem_description_link} | {', '.join(solution_links)} |\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
