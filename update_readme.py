import os
from pathlib import Path

def generate_readme_content(root_dir):
    content = []
    for platform in root_dir.iterdir():
        if platform.is_dir() and platform.name == "백준":
            platform_name = platform.name
            content.append(f"## {platform_name}\n")
            for level in platform.iterdir():
                if level.is_dir():
                    level_name = level.name
                    content.append(f"### {level_name}\n")
                    for problem_dir in level.iterdir():
                        if problem_dir.is_dir():
                            problem_name = problem_dir.name
                            problem_url = f"https://github.com/SWARVY/Algorithm/tree/main/{platform_name}/{level_name}/{problem_name}"
                            solution_files = [f.name for f in problem_dir.iterdir() if f.is_file()]
                            content.append(f"- [{problem_name}]({problem_url})\n")
                            content.append("  - Solutions:\n")
                            for solution_file in solution_files:
                                content.append(f"    - {solution_file}\n")

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
