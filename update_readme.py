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
                            solution_files = [f.name for f in problem_dir.iterdir() if f.is_file()]
                            solution_links = [f"[{solution_file}]({problem_url}/{solution_file})" for solution_file in solution_files]
                            
                            # README.md 파일에서 문제 설명 추출
                            readme_path = problem_dir / "README.md"
                            if readme_path.exists():
                                problem_description = readme_path.read_text().split("\n")[0]
                            else:
                                problem_description = ""
                            
                            content.append(f"| [{problem_name}]({problem_url}) | {problem_description} | {', '.join(solution_links)} |\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)