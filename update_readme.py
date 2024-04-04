import os
from pathlib import Path

def generate_language_table(icons_base_url):
    # 사용한 언어와 해당 아이콘을 나타내는 테이블 생성
    languages = {
        "C": "c.svg",
        "JavaScript": "javascript.svg",
    }
    table_content = ["<div align='center'>\n", "| 사용한 언어 | 아이콘 |\n", "|:-----------:|:-----:|\n"]
    for lang, icon in languages.items():
        icon_url = f"{icons_base_url}/{icon}"
        table_content.append(f"| {lang} | <img src='{icon_url}' alt='{lang}' style='max-width:30px; height:auto;'/> |\n")
    table_content.append("</div>\n")
    return "\n".join(table_content)

def generate_readme_content(root_dir):
    content = []
    icons_base_url = "https://github.com/SWARVY/Algorithm/raw/main/icons"  # 아이콘 이미지 파일들이 위치한 기본 URL

    # 사용한 프로그래밍 언어와 아이콘을 표시하는 테이블 추가
    content.append(generate_language_table(icons_base_url))

    # "백준" 섹션 및 그 아래의 내용을 중앙 정렬로 추가
    content.append("<div align='center'>\n\n## 백준\n")
    levels = ["Bronze", "Silver", "Gold", "Platinum"]
    for level_name in levels:
        # 난이도별 티어 이미지 추가 및 크기 조정, 수직 중앙 정렬을 위한 HTML 사용
        tier_image_url = f"{icons_base_url}/tier_{level_name.lower()}.png"
        content.append(f'<img src="{tier_image_url}" alt="{level_name}" style="vertical-align: middle; width:50px; height:auto;"/> <span style="vertical-align: middle;">{level_name}</span>\n')
        # 각 난이도에 해당하는 세부 내용 추가 (여기서는 예시로 간단히 처리)
        content.append("| 문제 | 설명 |\n| --- | --- |\n")
        # 실제로는 각 난이도 및 문제에 대한 구체적인 내용을 여기에 추가해야 합니다.
    
    content.append("</div>\n")  # "백준" 섹션의 중앙 정렬 끝

    return "".join(content)

def update_readme(root_dir):
    readme_path = root_dir / "README.md"
    new_content = generate_readme_content(root_dir)
    readme_path.write_text(new_content)

if __name__ == "__main__":
    root_dir = Path(__file__).parent
    update_readme(root_dir)
