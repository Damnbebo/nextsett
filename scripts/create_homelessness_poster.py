#!/usr/bin/env python3
"""Generate a modern PDF poster summarizing homelessness research."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import inch
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.shapes import Drawing, String

POSTER_WIDTH = 11 * inch
POSTER_HEIGHT = 17 * inch
OUTPUT_PATH = Path("/workspace/homelessness_final_poster.pdf")

NAVY = colors.HexColor("#0f172a")
TEAL = colors.HexColor("#0ea5e9")
CORAL = colors.HexColor("#f97316")
SLATE = colors.HexColor("#1e293b")
LIGHT_BG = colors.HexColor("#f8fafc")
PANEL_BG = colors.HexColor("#f1f5f9")
PANEL_BORDER = colors.HexColor("#cbd5f5")


def register_fonts() -> None:
    """Ensure Helvetica Neue-like fallback is available."""
    # ReportLab already bundles Helvetica, but we register Geist if present.
    geist_path = Path("/workspace/nextsett/nextsett/src/app/fonts/GeistVF.woff")
    if geist_path.exists():
        try:
            pdfmetrics.registerFont(TTFont("Geist", str(geist_path)))
        except Exception:
            pass


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="HeroTitle",
            fontName="Helvetica-Bold",
            fontSize=32,
            textColor=colors.white,
            leading=34,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroSubtitle",
            fontName="Helvetica",
            fontSize=14,
            textColor=colors.white,
            leading=18,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutMetric",
            fontName="Helvetica-Bold",
            fontSize=22,
            textColor=NAVY,
            leading=24,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutLabel",
            fontName="Helvetica",
            fontSize=10.5,
            textColor=SLATE,
            leading=14,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PanelHeading",
            fontName="Helvetica-Bold",
            fontSize=14,
            textColor=NAVY,
            leading=16,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PanelBody",
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            textColor=SLATE,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Quote",
            fontName="Helvetica-Oblique",
            fontSize=12,
            leading=16,
            textColor=SLATE,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Caption",
            fontName="Helvetica",
            fontSize=9.5,
            leading=11,
            textColor=SLATE,
            alignment=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Footer",
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=SLATE,
        )
    )
    return styles


def hero_block(styles, available_width):
    title = Paragraph("HOUSING FIRST, HUMAN DIGNITY", styles["HeroTitle"])
    subtitle = Paragraph(
        "Synthesizing multi-part research on homelessness drivers, systems, and solutions.",
        styles["HeroSubtitle"],
    )
    table = Table(
        [[title], [subtitle]],
        colWidths=[available_width],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 18),
                ("RIGHTPADDING", (0, 0), (-1, -1), 18),
                ("TOPPADDING", (0, 0), (-1, 0), 20),
                ("BOTTOMPADDING", (0, 1), (-1, -1), 18),
            ]
        ),
    )
    return table


def callout_block(styles, available_width):
    callouts = [
        (
            "650k+",
            "people experienced homelessness on a single January 2023 night — a 12% jump (HUD AHAR).",
        ),
        (
            "$28.58/hr",
            "wage needed for a modest 2-bedroom home; nearly double the federal minimum (NLIHC).",
        ),
        (
            "37% vs 13%",
            "Black Americans' share of homelessness vs share of U.S. population (NAEH).",
        ),
    ]
    cells = []
    for metric, label in callouts:
        callout_html = (
            f"<font name='Helvetica-Bold' size='22'>{metric}</font><br/>"
            f"<font size='10.5'>{label}</font>"
        )
        cells.append(Paragraph(callout_html, styles["CalloutLabel"]))
    table = Table(
        [cells],
        colWidths=[available_width / 3.0 for _ in cells],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#e2e8f0")),
                ("BOX", (0, 0), (-1, -1), 0.25, colors.HexColor("#e2e8f0")),
            ]
        ),
    )
    return table


def quote_block(styles, available_width):
    quote = Paragraph(
        "\"Homelessness is not a personal failure; it signals where housing, health, and wage systems are fraying.\"",
        styles["Quote"],
    )
    attribution = Paragraph("— Synthesized from HUD, NLIHC, and lived community observations", styles["CalloutLabel"])
    table = Table(
        [[quote], [attribution]],
        colWidths=[available_width],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#e0f2fe")),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        ),
    )
    return table


def disparity_chart(styles):
    drawing = Drawing(320, 220)

    chart = VerticalBarChart()
    chart.x = 40
    chart.y = 40
    chart.height = 140
    chart.width = 220
    chart.data = [[13, 37]]
    chart.categoryAxis.categoryNames = ["Share of U.S. population", "Share of homeless population"]
    chart.barWidth = 25
    chart.barSpacing = 30
    chart.valueAxis.valueMin = 0
    chart.valueAxis.valueMax = 40
    chart.valueAxis.valueStep = 10
    chart.bars[0].fillColor = TEAL
    chart.bars[0].strokeColor = TEAL
    chart.barLabels.nudge = 7
    chart.barLabels.fontName = "Helvetica-Bold"
    chart.barLabels.fontSize = 10
    chart.barLabels.fillColor = NAVY
    chart.barLabelFormat = "%d%%"
    drawing.add(chart)

    drawing.add(
        String(
            0,
            200,
            "Racial disparities make homelessness an equity crisis",
            fontName="Helvetica-Bold",
            fontSize=12,
            fillColor=NAVY,
        )
    )
    return drawing


def panel(title, bullets, styles, panel_width, accent_color):
    bullet_prefix = "• "
    rows = [[Paragraph(title.upper(), styles["PanelHeading"])]]
    rows.append([Spacer(1, 2)])
    for text in bullets:
        rows.append([Paragraph(f"{bullet_prefix}{text}", styles["PanelBody"])])
        rows.append([Spacer(1, 2)])
    tbl = Table(
        rows,
        colWidths=[panel_width],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PANEL_BG),
                ("BOX", (0, 0), (-1, -1), 1, accent_color),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        ),
    )
    return tbl


def build_story():
    register_fonts()
    styles = build_styles()

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=(POSTER_WIDTH, POSTER_HEIGHT),
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.9 * inch,
        bottomMargin=0.9 * inch,
    )

    available_width = POSTER_WIDTH - doc.leftMargin - doc.rightMargin
    story = []

    story.append(hero_block(styles, available_width))
    story.append(Spacer(1, 0.25 * inch))
    story.append(callout_block(styles, available_width))
    story.append(Spacer(1, 0.2 * inch))
    story.append(quote_block(styles, available_width))
    story.append(Spacer(1, 0.3 * inch))

    # Chart + caption
    chart = disparity_chart(styles)
    chart_table = Table(
        [[chart, Paragraph(
            "Black residents are 13% of the U.S. population yet 37% of the unhoused — evidence that structural racism shapes housing outcomes.",
            styles["PanelBody"],
        )]],
        colWidths=[3.8 * inch, available_width - 3.8 * inch],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ]
        ),
    )
    story.append(chart_table)
    story.append(Spacer(1, 0.35 * inch))

    sections = [
        (
            "Problem Definition & Evidence",
            [
                "Homelessness rose 12% year-over-year, topping 650,000 people nationwide, with rents outrunning wages and vouchers stuck on multi-year waitlists.",
                "New Jersey's Point-in-Time count logged 12,000+ people unhoused on a single night, underscoring the regional urgency.",
                "Housing costs now require $28.58/hour for a modest 2-bedroom, far beyond most renter incomes.",
            ],
            TEAL,
        ),
        (
            "Community Impact",
            [
                "Unsheltered neighbors rely on emergency rooms, policing, and crisis systems, inflating public costs while leaving trauma unaddressed.",
                "Children experiencing homelessness face disrupted schooling and long-term earnings losses, perpetuating intergenerational poverty.",
                "Racial inequities are stark: Black residents are almost three times more likely to be unhoused than their share of the population.",
            ],
            CORAL,
        ),
        (
            "Key Actors & Roles",
            [
                "HUD + USICH fund Continuum of Care networks and Housing First pilots, while advocacy groups like NAEH and NLIHC reframe homelessness as a systems issue.",
                "NJ's Office of Homelessness Prevention aligns HPRP, SRAP, and shelter grants; new laws embed mental health providers inside shelters.",
                "Local governments, nonprofits, and health systems deliver day-to-day outreach, yet face funding volatility, staffing shortages, and coordination gaps.",
            ],
            TEAL,
        ),
        (
            "Policy Context & Constraints",
            [
                "McKinney-Vento and the HEARTH Act established coordinated entry and Housing First, but appropriations lag behind need.",
                "Section 8, LIHTC, and NJ's SRAP are lifelines but are over-subscribed; anti-camping ordinances criminalize survival instead of solving housing gaps.",
                "Paperwork, Medicaid billing rules, and uneven municipal priorities slow down service delivery and data sharing.",
            ],
            CORAL,
        ),
        (
            "Challenges on the Ground",
            [
                "Homelessness is a \"wicked problem\" tied to labor markets, healthcare capacity, criminal justice reentry, and housing production bottlenecks.",
                "Shelters can feel unsafe or overly rigid, pushing people back outside; deinstitutionalization without investments left many without care.",
                "Short-term aid cycles clients through recurring crises, while NIMBYism resists siting new supportive or deeply affordable housing.",
            ],
            TEAL,
        ),
        (
            "Proposed Solutions & Next Steps",
            [
                "Scale Housing First with permanent supportive housing plus wraparound behavioral health and employment navigation.",
                "Expand affordable housing supply through local trust funds, rent-capped units, voucher portability, and public housing reinvestment.",
                "Invest upstream: eviction defense (CEDD), flexible cash aid, hospital/jail discharge planning, and decriminalized outreach responses.",
            ],
            CORAL,
        ),
    ]

    panel_width = (available_width - 0.3 * inch) / 2
    panel_rows = []
    row = []
    for idx, (title, bullets, accent) in enumerate(sections):
        row.append(panel(title, bullets, styles, panel_width, accent))
        if len(row) == 2:
            panel_rows.append(row)
            row = []
    if row:
        row.append(Spacer(1, 0))
        panel_rows.append(row)

    section_table = Table(
        panel_rows,
        colWidths=[panel_width, panel_width],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        ),
    )
    story.append(section_table)
    story.append(Spacer(1, 0.3 * inch))

    footer = Paragraph(
        "Sources: HUD (2023 AHAR), National Low Income Housing Coalition (Out of Reach 2023), National Alliance to End Homelessness (State of Homelessness 2024), NJ Office of Homelessness Prevention, legislative briefs (A4755, A3360), course assignments Part I–IV.",
        styles["Footer"],
    )
    story.append(footer)

    doc.build(story)


if __name__ == "__main__":
    build_story()
    print(f"Poster created at {OUTPUT_PATH}")
