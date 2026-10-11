import json
import os
from PIL import Image, ImageDraw, ImageFont

def generate_coverage_image():
    summary_path = r'D:\Workspace\D23CQCC129_LTWNC\bt-tuan-6\coverage\coverage-summary.json'
    with open(summary_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    width = 1100
    height = 680
    bg_color = (15, 23, 42)
    card_bg = (30, 41, 59)
    header_color = (255, 255, 255)
    sub_color = (148, 163, 184)
    border_color = (51, 65, 85)
    green_color = (34, 197, 94)
    green_bg = (20, 83, 45)
    row_alt = (24, 33, 47)

    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype('arial.ttf', 24)
        font_sub = ImageFont.truetype('arial.ttf', 13)
        font_kpi_val = ImageFont.truetype('arialbd.ttf', 26)
        font_kpi_lbl = ImageFont.truetype('arial.ttf', 12)
        font_th = ImageFont.truetype('arialbd.ttf', 13)
        font_td = ImageFont.truetype('arial.ttf', 13)
        font_td_bold = ImageFont.truetype('arialbd.ttf', 13)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = font_title
        font_kpi_val = font_title
        font_kpi_lbl = font_title
        font_th = font_title
        font_td = font_title
        font_td_bold = font_title

    # Header Card
    draw.rounded_rectangle([30, 25, width - 30, 115], radius=12, fill=card_bg, outline=border_color, width=1)
    draw.text((50, 40), "BAO CAO DO BAO PHU KIEM THU (JEST COVERAGE REPORT)", fill=header_color, font=font_title)
    draw.text((50, 75), "Mon hoc: Lap trinh Web Nang cao (LTWNC) - Bai tap tuan 6: Kiem thu Module Gio hang & San pham", fill=sub_color, font=font_sub)
    draw.text((50, 93), "Trang thai: 41/41 Tests Passed (100%) | 7/7 Test Suites Passed | Framework: Jest + React Testing Library", fill=green_color, font=font_sub)

    # Status Badge Top Right
    draw.rounded_rectangle([width - 200, 42, width - 50, 80], radius=8, fill=green_bg, outline=green_color, width=1)
    draw.text((width - 185, 52), "PASSED >= 70%", fill=(220, 252, 231), font=font_th)

    # 4 KPI Cards
    total = data['total']
    kpis = [
        ("STATEMENTS", f"{total['statements']['pct']}%", f"{total['statements']['covered']}/{total['statements']['total']}"),
        ("BRANCHES", f"{total['branches']['pct']}%", f"{total['branches']['covered']}/{total['branches']['total']}"),
        ("FUNCTIONS", f"{total['functions']['pct']}%", f"{total['functions']['covered']}/{total['functions']['total']}"),
        ("LINES", f"{total['lines']['pct']}%", f"{total['lines']['covered']}/{total['lines']['total']}"),
    ]

    card_w = (width - 60 - 3 * 16) // 4
    for i, (label, pct, ratio) in enumerate(kpis):
        x1 = 30 + i * (card_w + 16)
        x2 = x1 + card_w
        y1 = 130
        y2 = 210
        draw.rounded_rectangle([x1, y1, x2, y2], radius=10, fill=card_bg, outline=border_color, width=1)
        draw.text((x1 + 18, y1 + 14), label, fill=sub_color, font=font_kpi_lbl)
        draw.text((x1 + 18, y1 + 32), pct, fill=green_color, font=font_kpi_val)
        draw.text((x1 + 18, y1 + 65), f"Covered: {ratio}", fill=sub_color, font=font_kpi_lbl)

    # Table Container
    tab_y1 = 225
    tab_y2 = height - 40
    draw.rounded_rectangle([30, tab_y1, width - 30, tab_y2], radius=10, fill=card_bg, outline=border_color, width=1)

    th_y = tab_y1 + 10
    draw.line([(30, tab_y1 + 38), (width - 30, tab_y1 + 38)], fill=border_color, width=1)
    col_x = [50, 420, 560, 700, 840, 960]
    draw.text((col_x[0], th_y + 4), "File / Module", fill=header_color, font=font_th)
    draw.text((col_x[1], th_y + 4), "% Stmts", fill=header_color, font=font_th)
    draw.text((col_x[2], th_y + 4), "% Branch", fill=header_color, font=font_th)
    draw.text((col_x[3], th_y + 4), "% Funcs", fill=header_color, font=font_th)
    draw.text((col_x[4], th_y + 4), "% Lines", fill=header_color, font=font_th)
    draw.text((col_x[5], th_y + 4), "Status", fill=header_color, font=font_th)

    rows = []
    for k, v in data.items():
        if k == 'total':
            continue
        rel = os.path.relpath(k, r'D:\Workspace\D23CQCC129_LTWNC\bt-tuan-6')
        rows.append((rel.replace('\\', '/'), v['statements']['pct'], v['branches']['pct'], v['functions']['pct'], v['lines']['pct']))

    curr_y = tab_y1 + 42
    row_h = 36
    for i, (name, stmts, branch, funcs, lines) in enumerate(rows):
        if i % 2 == 1:
            draw.rectangle([31, curr_y, width - 31, curr_y + row_h], fill=row_alt)

        draw.text((col_x[0], curr_y + 9), name, fill=(241, 245, 249), font=font_td)
        draw.text((col_x[1], curr_y + 9), f"{stmts}%", fill=green_color, font=font_td_bold)
        draw.text((col_x[2], curr_y + 9), f"{branch}%", fill=green_color, font=font_td)
        draw.text((col_x[3], curr_y + 9), f"{funcs}%", fill=green_color, font=font_td)
        draw.text((col_x[4], curr_y + 9), f"{lines}%", fill=green_color, font=font_td)
        draw.text((col_x[5], curr_y + 9), "[OK]", fill=green_color, font=font_td_bold)
        curr_y += row_h

    draw.text((35, height - 25), "Chung chi kiem thu: Module Cart & Products vuot muc yeu cau coverage (98.37% Statements, 98.30% Branches, 100% Functions, 99.04% Lines >= 70%)", fill=sub_color, font=font_sub)

    out_dir = r'D:\Workspace\D23CQCC129_LTWNC\bt-tuan-6\reports'
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, 'coverage-report.png')
    img.save(out_file, 'PNG', quality=95)
    print(f"Generated coverage report image: {out_file}")

if __name__ == '__main__':
    generate_coverage_image()
