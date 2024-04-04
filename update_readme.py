import os
from pathlib import Path

def generate_language_table(icons_base_url):
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
    }
    table_content = ["| 사용한 언어 | 아이콘 |\n", "|:-----------:|:-----:|\n"]
    for lang, icon in languages.items():
        icon_url = f"{icons_base_url}/{icon}"
        table_content.append(f"| {lang} | ![{lang}]({icon_url}) |\n")
    return "\n".join(table_content)

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"  # 아이콘 이미지 파일들이 위치한 기본 URL

    # 시작 부분에 사용한 프로그래밍 언어와 아이콘을 표시하는 테이블
    content.append("<div align='center'>\n\n")  # 전체 내용을 감싸는 div 태그로 중앙 정렬 시작
    content.append(generate_language_table(icons_base_url))
    content.append("\n</div>\n")  # 사용한 언어 테이블에 대한 중앙 정렬 끝

    # 여기에 추가적인 섹션 (예: "백준" 섹션)을 구현할 수 있습니다.
    # 예시로 "백준" 섹션을 시작하는 코드를 추가합니다.
    content.append("<div align='center'>\n\n")  # "백준" 섹션도 중앙 정렬 시작
    content.append("## 백준\n\n")
    # 백준 섹션 내용 추가 (예제 코드에서는 구체적인 내용을 생략합니다)
    content.append("\n</div>\n")  # "백준" 섹션에 대한 중앙 정렬 끝

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
