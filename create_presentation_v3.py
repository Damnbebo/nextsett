from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

# Create presentation with widescreen dimensions
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Define colors - Patriotic theme
NAVY_BLUE = RGBColor(0x0a, 0x2a, 0x4a)
ROYAL_BLUE = RGBColor(0x1e, 0x3a, 0x5f)
DEEP_RED = RGBColor(0xb2, 0x22, 0x34)
GOLD = RGBColor(0xd4, 0xa5, 0x37)
CREAM = RGBColor(0xfa, 0xf8, 0xf5)
WHITE = RGBColor(0xff, 0xff, 0xff)
DARK_TEXT = RGBColor(0x2c, 0x2c, 0x2c)
LIGHT_BLUE = RGBColor(0xe8, 0xf1, 0xf8)
DARK_GREEN = RGBColor(0x1a, 0x4d, 0x2e)

IMAGE_DIR = "/workspace/images"

def create_title_slide(prs):
    """Create an impressive opening title slide"""
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # Main background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = NAVY_BLUE
    bg.line.fill.background()
    
    # Decorative stripe at top
    top_stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.4))
    top_stripe.fill.solid()
    top_stripe.fill.fore_color.rgb = DEEP_RED
    top_stripe.line.fill.background()
    
    # Gold accent line
    gold_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(0.4), Inches(13.333), Inches(0.08))
    gold_line.fill.solid()
    gold_line.fill.fore_color.rgb = GOLD
    gold_line.line.fill.background()
    
    # Decorative left bar
    left_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(1.5), Inches(0.15), Inches(4.5))
    left_bar.fill.solid()
    left_bar.fill.fore_color.rgb = GOLD
    left_bar.line.fill.background()
    
    # Decorative stars
    for i in range(5):
        star = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.4 + i*0.4), Inches(0.08), Inches(0.2), Inches(0.2))
        star.fill.solid()
        star.fill.fore_color.rgb = WHITE
        star.line.fill.background()
    
    # Main title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.8), Inches(12.333), Inches(1.2))
    tf = title_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "UNITED STATES HISTORY I"
    p.font.size = Pt(56)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Subtitle line
    sub_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(3.5), Inches(3.1), Inches(6.333), Inches(0.04))
    sub_line.fill.solid()
    sub_line.fill.fore_color.rgb = GOLD
    sub_line.line.fill.background()
    
    # Subtitle
    subtitle_box = slide.shapes.add_textbox(Inches(0.5), Inches(3.3), Inches(12.333), Inches(0.9))
    tf = subtitle_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Final Project: Five Key Topics in American History"
    p.font.size = Pt(28)
    p.font.color.rgb = GOLD
    p.alignment = PP_ALIGN.CENTER
    
    # Bottom decorative stripe
    bottom_stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.1), Inches(13.333), Inches(0.4))
    bottom_stripe.fill.solid()
    bottom_stripe.fill.fore_color.rgb = DEEP_RED
    bottom_stripe.line.fill.background()
    
    # Student info box
    info_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4), Inches(4.8), Inches(5.333), Inches(1.8))
    info_box.fill.solid()
    info_box.fill.fore_color.rgb = ROYAL_BLUE
    info_box.line.color.rgb = GOLD
    info_box.line.width = Pt(3)
    
    # Student name
    name_box = slide.shapes.add_textbox(Inches(4), Inches(5), Inches(5.333), Inches(0.7))
    tf = name_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Cristopher Saravia Medina"
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Course info
    course_box = slide.shapes.add_textbox(Inches(4), Inches(5.7), Inches(5.333), Inches(0.6))
    tf = course_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "US History I  •  Fall 2024"
    p.font.size = Pt(18)
    p.font.color.rgb = CREAM
    p.alignment = PP_ALIGN.CENTER

def create_topic_slide(prs, topic_number, title, bullets, images):
    """Create content slide with key facts"""
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = CREAM
    bg.line.fill.background()
    
    # Header bar
    header = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(1.3))
    header.fill.solid()
    header.fill.fore_color.rgb = NAVY_BLUE
    header.line.fill.background()
    
    # Red accent under header
    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(1.3), Inches(13.333), Inches(0.08))
    accent.fill.solid()
    accent.fill.fore_color.rgb = DEEP_RED
    accent.line.fill.background()
    
    # Topic badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.3), Inches(0.3), Inches(1.4), Inches(0.7))
    badge.fill.solid()
    badge.fill.fore_color.rgb = DEEP_RED
    badge.line.fill.background()
    
    badge_text = slide.shapes.add_textbox(Inches(0.3), Inches(0.38), Inches(1.4), Inches(0.6))
    tf = badge_text.text_frame
    p = tf.paragraphs[0]
    p.text = f"TOPIC {topic_number}"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Title
    title_box = slide.shapes.add_textbox(Inches(1.9), Inches(0.35), Inches(11), Inches(0.8))
    tf = title_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.LEFT
    
    # Left sidebar accent
    sidebar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(1.38), Inches(0.12), Inches(6.12))
    sidebar.fill.solid()
    sidebar.fill.fore_color.rgb = GOLD
    sidebar.line.fill.background()
    
    # "Key Facts" label
    facts_label = slide.shapes.add_textbox(Inches(0.3), Inches(1.5), Inches(2), Inches(0.4))
    tf = facts_label.text_frame
    p = tf.paragraphs[0]
    p.text = "KEY FACTS"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = DEEP_RED
    
    # Content area with bullets
    content_box = slide.shapes.add_textbox(Inches(0.3), Inches(1.9), Inches(7.8), Inches(5.3))
    tf = content_box.text_frame
    tf.word_wrap = True
    
    for i, bullet in enumerate(bullets):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        
        # Add bullet symbol with color
        run = p.add_run()
        run.text = "★ "
        run.font.size = Pt(12)
        run.font.color.rgb = DEEP_RED
        run.font.bold = True
        
        # Add bullet text
        run2 = p.add_run()
        run2.text = bullet
        run2.font.size = Pt(13)
        run2.font.color.rgb = DARK_TEXT
        
        p.space_after = Pt(8)
        p.space_before = Pt(2)
    
    # Images section - 2x2 grid on right side
    image_positions = [
        (Inches(8.3), Inches(1.5), Inches(2.35), Inches(2.65)),
        (Inches(10.8), Inches(1.5), Inches(2.35), Inches(2.65)),
        (Inches(8.3), Inches(4.3), Inches(2.35), Inches(2.65)),
        (Inches(10.8), Inches(4.3), Inches(2.35), Inches(2.65))
    ]
    
    for idx, (x, y, w, h) in enumerate(image_positions):
        if idx < len(images):
            img_path = os.path.join(IMAGE_DIR, images[idx])
            if os.path.exists(img_path) and os.path.getsize(img_path) > 1000:
                try:
                    # Add image with border effect
                    border = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 
                        x - Inches(0.05), y - Inches(0.05), 
                        w + Inches(0.1), h + Inches(0.1))
                    border.fill.solid()
                    border.fill.fore_color.rgb = NAVY_BLUE
                    border.line.fill.background()
                    
                    pic = slide.shapes.add_picture(img_path, x, y, w, h - Inches(0.25))
                except Exception as e:
                    print(f"Could not add image {img_path}: {e}")
    
    # Footer
    footer = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.2), Inches(13.333), Inches(0.3))
    footer.fill.solid()
    footer.fill.fore_color.rgb = NAVY_BLUE
    footer.line.fill.background()
    
    footer_text = slide.shapes.add_textbox(Inches(0.3), Inches(7.22), Inches(12.7), Inches(0.25))
    tf = footer_text.text_frame
    p = tf.paragraphs[0]
    p.text = f"US History I  •  Cristopher Saravia Medina  •  Topic {topic_number} of 5"
    p.font.size = Pt(10)
    p.font.color.rgb = CREAM
    p.alignment = PP_ALIGN.RIGHT

def create_learning_slide(prs, topic_number, title, learned_intro, learned_bullets, research_bullets):
    """Create 'What I Learned' slide for each topic"""
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = LIGHT_BLUE
    bg.line.fill.background()
    
    # Header bar
    header = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(1.2))
    header.fill.solid()
    header.fill.fore_color.rgb = DARK_GREEN
    header.line.fill.background()
    
    # Gold accent under header
    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(1.2), Inches(13.333), Inches(0.06))
    accent.fill.solid()
    accent.fill.fore_color.rgb = GOLD
    accent.line.fill.background()
    
    # Topic badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.3), Inches(0.25), Inches(1.4), Inches(0.7))
    badge.fill.solid()
    badge.fill.fore_color.rgb = GOLD
    badge.line.fill.background()
    
    badge_text = slide.shapes.add_textbox(Inches(0.3), Inches(0.33), Inches(1.4), Inches(0.6))
    tf = badge_text.text_frame
    p = tf.paragraphs[0]
    p.text = f"TOPIC {topic_number}"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = NAVY_BLUE
    p.alignment = PP_ALIGN.CENTER
    
    # Title
    title_box = slide.shapes.add_textbox(Inches(1.9), Inches(0.3), Inches(11), Inches(0.8))
    tf = title_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = f"What I Learned: {title}"
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.LEFT
    
    # Left column - What I Learned
    left_box_bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.3), Inches(1.45), Inches(6.2), Inches(5.5))
    left_box_bg.fill.solid()
    left_box_bg.fill.fore_color.rgb = WHITE
    left_box_bg.line.color.rgb = DARK_GREEN
    left_box_bg.line.width = Pt(2)
    
    # Left header
    left_header = slide.shapes.add_textbox(Inches(0.5), Inches(1.6), Inches(5.8), Inches(0.5))
    tf = left_header.text_frame
    p = tf.paragraphs[0]
    p.text = "📚 What I Learned"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = DARK_GREEN
    
    # Intro text
    intro_box = slide.shapes.add_textbox(Inches(0.5), Inches(2.1), Inches(5.8), Inches(0.8))
    tf = intro_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = learned_intro
    p.font.size = Pt(12)
    p.font.italic = True
    p.font.color.rgb = DARK_TEXT
    
    # Learned bullets
    learned_content = slide.shapes.add_textbox(Inches(0.5), Inches(2.8), Inches(5.8), Inches(4))
    tf = learned_content.text_frame
    tf.word_wrap = True
    
    for i, bullet in enumerate(learned_bullets):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        
        run = p.add_run()
        run.text = "• "
        run.font.size = Pt(12)
        run.font.color.rgb = DARK_GREEN
        run.font.bold = True
        
        run2 = p.add_run()
        run2.text = bullet
        run2.font.size = Pt(12)
        run2.font.color.rgb = DARK_TEXT
        
        p.space_after = Pt(8)
    
    # Right column - Additional Research
    right_box_bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.45), Inches(6.2), Inches(5.5))
    right_box_bg.fill.solid()
    right_box_bg.fill.fore_color.rgb = WHITE
    right_box_bg.line.color.rgb = DEEP_RED
    right_box_bg.line.width = Pt(2)
    
    # Right header
    right_header = slide.shapes.add_textbox(Inches(7), Inches(1.6), Inches(5.8), Inches(0.5))
    tf = right_header.text_frame
    p = tf.paragraphs[0]
    p.text = "🔍 Additional Research"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = DEEP_RED
    
    # Research bullets
    research_content = slide.shapes.add_textbox(Inches(7), Inches(2.2), Inches(5.8), Inches(4.5))
    tf = research_content.text_frame
    tf.word_wrap = True
    
    for i, bullet in enumerate(research_bullets):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        
        run = p.add_run()
        run.text = "→ "
        run.font.size = Pt(12)
        run.font.color.rgb = DEEP_RED
        run.font.bold = True
        
        run2 = p.add_run()
        run2.text = bullet
        run2.font.size = Pt(12)
        run2.font.color.rgb = DARK_TEXT
        
        p.space_after = Pt(10)
    
    # Footer
    footer = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.15), Inches(13.333), Inches(0.35))
    footer.fill.solid()
    footer.fill.fore_color.rgb = DARK_GREEN
    footer.line.fill.background()
    
    footer_text = slide.shapes.add_textbox(Inches(0.3), Inches(7.18), Inches(12.7), Inches(0.3))
    tf = footer_text.text_frame
    p = tf.paragraphs[0]
    p.text = f"Reflection & Research  •  Topic {topic_number}  •  Cristopher Saravia Medina"
    p.font.size = Pt(10)
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.RIGHT

def create_sources_slide(prs, sources):
    """Create sources slide"""
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = NAVY_BLUE
    bg.line.fill.background()
    
    # Top accent stripe
    top_stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.15))
    top_stripe.fill.solid()
    top_stripe.fill.fore_color.rgb = DEEP_RED
    top_stripe.line.fill.background()
    
    # Decorative element
    deco = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.3), Inches(0.5), Inches(0.08), Inches(1.2))
    deco.fill.solid()
    deco.fill.fore_color.rgb = GOLD
    deco.line.fill.background()
    
    # Header
    title_box = slide.shapes.add_textbox(Inches(0.6), Inches(0.5), Inches(12), Inches(1))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Works Cited"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.LEFT
    
    # Subtitle
    subtitle_box = slide.shapes.add_textbox(Inches(0.6), Inches(1.3), Inches(12), Inches(0.5))
    tf = subtitle_box.text_frame
    p = tf.paragraphs[0]
    p.text = "MLA Format Citations"
    p.font.size = Pt(18)
    p.font.color.rgb = GOLD
    p.alignment = PP_ALIGN.LEFT
    
    # Decorative line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(1.85), Inches(12.1), Inches(0.04))
    line.fill.solid()
    line.fill.fore_color.rgb = GOLD
    line.line.fill.background()
    
    # Sources content box
    content_bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.4), Inches(2.1), Inches(12.5), Inches(4.5))
    content_bg.fill.solid()
    content_bg.fill.fore_color.rgb = ROYAL_BLUE
    content_bg.line.fill.background()
    
    # Sources text
    content_box = slide.shapes.add_textbox(Inches(0.7), Inches(2.3), Inches(12), Inches(4.2))
    tf = content_box.text_frame
    tf.word_wrap = True
    
    for i, source in enumerate(sources):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = source
        p.font.size = Pt(15)
        p.font.color.rgb = WHITE
        p.space_after = Pt(18)
        p.space_before = Pt(8)
    
    # Bottom stripe
    bottom_stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.1), Inches(13.333), Inches(0.4))
    bottom_stripe.fill.solid()
    bottom_stripe.fill.fore_color.rgb = DEEP_RED
    bottom_stripe.line.fill.background()
    
    # Footer text
    footer_text = slide.shapes.add_textbox(Inches(0.3), Inches(6.75), Inches(12.7), Inches(0.3))
    tf = footer_text.text_frame
    p = tf.paragraphs[0]
    p.text = "Cristopher Saravia Medina  •  US History I  •  Final Project"
    p.font.size = Pt(12)
    p.font.color.rgb = CREAM
    p.alignment = PP_ALIGN.CENTER

# ============================================
# CREATE THE PRESENTATION
# ============================================

print("Creating presentation with 'What I Learned' sections...")

# Title Slide
create_title_slide(prs)

# ========== TOPIC 1: COLONIAL AMERICA ==========
create_topic_slide(prs, 1, "Colonial America: Life in the Colonies",
    [
        "The 13 colonies were split into three groups: New England, Middle, and Southern colonies. Each region had its own economy and lifestyle.",
        "New England made money through fishing and shipbuilding. Southern colonies grew cash crops like tobacco using enslaved African workers.",
        "Religion was super important - Puritans came to Massachusetts for religious freedom and built strict communities based on their beliefs.",
        "Colonial society had a clear class system: wealthy landowners at the top, farmers in the middle, enslaved people at the bottom.",
        "The Great Awakening (1730s-1740s) was a religious movement that brought colonists together and made them question authority."
    ],
    ["colonial_map.jpg", "colonial_town.jpg", "puritan.jpg", "plantation.jpg"]
)

create_learning_slide(prs, 1, "Colonial America",
    "Learning about colonial America helped me understand how the United States began and why different regions developed so differently.",
    [
        "I learned that geography really shaped how people lived - the rocky soil in New England meant they couldn't farm much, so they turned to the ocean instead.",
        "It was eye-opening to see how slavery was built into the Southern economy from the very start, not something that came later.",
        "The Puritans were way stricter than I thought - they could punish you just for missing church!",
        "I now understand why the colonists felt so independent - they were basically running their own communities for over 100 years."
    ],
    [
        "Indentured servants made up about 50% of all European immigrants to the colonies - they worked 4-7 years for free passage to America.",
        "The average colonial family had 7-10 children because so many died young from disease.",
        "Colonial women had almost no legal rights - married women couldn't own property or sign contracts.",
        "The slave population grew from about 7,000 in 1680 to over 300,000 by 1750, mostly in the South."
    ]
)

# ========== TOPIC 2: AMERICAN REVOLUTION ==========
create_topic_slide(prs, 2, "The American Revolution (1775-1783)",
    [
        "The Revolution happened because colonists were fed up with \"taxation without representation\" - Britain taxed them without giving them a voice.",
        "Key events: Boston Massacre (1770), Boston Tea Party (1773), and the harsh Intolerable Acts that punished Massachusetts.",
        "Thomas Jefferson wrote the Declaration of Independence in 1776, proclaiming all men are created equal with rights to life and liberty.",
        "George Washington led the Continental Army through eight hard years, including the freezing winter at Valley Forge.",
        "France joining our side in 1778 was a game-changer - they gave us soldiers, money, and ships that helped win at Yorktown."
    ],
    ["boston_tea.jpg", "declaration.jpg", "washington_crossing.jpg", "yorktown.jpg"]
)

create_learning_slide(prs, 2, "American Revolution",
    "Studying the Revolution showed me that freedom isn't free - regular people made huge sacrifices to create our country.",
    [
        "I didn't realize how close we came to losing the war. Washington's army was broke, starving, and outnumbered most of the time.",
        "The Declaration's words about equality were revolutionary for that time, even if they didn't apply to everyone yet.",
        "It's crazy that a bunch of farmers and merchants actually beat the world's most powerful military.",
        "I learned that not everyone supported independence - about 1/3 of colonists were Loyalists who wanted to stay British."
    ],
    [
        "Only about 3% of colonists actually fought in the Continental Army at any given time.",
        "More soldiers died from disease and cold than from actual combat during the war.",
        "Women like Deborah Sampson disguised themselves as men to fight, and others like Molly Pitcher helped on battlefields.",
        "The war cost Britain so much money that it contributed to their own economic problems for decades.",
        "About 5,000 Black soldiers fought for the Continental Army, with some earning their freedom for serving."
    ]
)

# ========== TOPIC 3: CIVIL WAR ==========
create_topic_slide(prs, 3, "The Civil War (1861-1865)",
    [
        "The war started when Southern states left the Union to keep slavery. They feared Lincoln would end their way of life.",
        "The North had more people, factories, and railroads. The South had experienced military leaders defending their homeland.",
        "Lincoln's Emancipation Proclamation (1863) freed enslaved people in rebel states and let Black men join the Union Army.",
        "The Battle of Gettysburg (July 1863) was a turning point - the Union won and stopped the South from invading the North.",
        "The war ended when General Lee surrendered to General Grant at Appomattox in April 1865. Lincoln was killed days later."
    ],
    ["lincoln.jpg", "gettysburg.jpg", "emancipation.jpg", "appomattox.jpg"]
)

create_learning_slide(prs, 3, "The Civil War",
    "The Civil War taught me that our country almost tore itself apart over slavery, and the effects of that division lasted for generations.",
    [
        "I was shocked to learn that about 620,000 soldiers died - more Americans than in all other U.S. wars combined until Vietnam.",
        "The Emancipation Proclamation was as much a military strategy as a moral decision - it prevented Europe from helping the South.",
        "I understand now why this is called the first 'modern war' - new weapons made it incredibly deadly.",
        "Learning about the draft riots showed me that not everyone in the North supported the war or ending slavery."
    ],
    [
        "The Civil War was the first war to be extensively photographed, changing how people saw the horrors of combat.",
        "About 180,000 Black soldiers served in the Union Army, making up roughly 10% of Union forces by war's end.",
        "Clara Barton, who later founded the Red Cross, worked as a nurse and brought supplies directly to battlefields.",
        "The South's economy was devastated - Confederate money became worthless and many plantations were destroyed.",
        "Lincoln's assassination made him a martyr and complicated the process of bringing the nation back together."
    ]
)

# ========== TOPIC 4: RECONSTRUCTION ==========
create_topic_slide(prs, 4, "Reconstruction Era (1865-1877)",
    [
        "Reconstruction was the time after the Civil War when the government tried to rebuild the South and help 4 million freed Black Americans.",
        "Three amendments were added: 13th (ended slavery), 14th (citizenship & equal rights), 15th (voting rights for Black men).",
        "The Freedmen's Bureau helped former slaves with food, schools, and jobs, but it didn't get enough funding.",
        "Black Americans made real progress - they voted, held political office, started businesses, and built schools.",
        "Reconstruction ended in 1877 after a political deal. Southern states quickly passed Jim Crow segregation laws."
    ],
    ["freedmen_school.jpg", "black_congress.jpg", "amendment.jpg", "jimcrow.jpg"]
)

create_learning_slide(prs, 4, "Reconstruction",
    "Reconstruction showed me a time of real hope and progress for Black Americans that was sadly crushed by racism and politics.",
    [
        "I was amazed to learn that over 2,000 Black men held public office during Reconstruction, including U.S. Senators.",
        "The Freedmen's Bureau schools were incredibly important - they taught reading to people who had been forbidden to learn.",
        "It's frustrating that so much progress was undone so quickly once federal troops left the South.",
        "I now see how the failures of Reconstruction led directly to 100 years of segregation and civil rights struggles."
    ],
    [
        "Hiram Revels of Mississippi became the first Black U.S. Senator in 1870, taking Jefferson Davis's old seat.",
        "The Ku Klux Klan formed in 1866 and used violence and terror to stop Black people from voting or holding office.",
        "Sharecropping trapped many freed people in cycles of debt that kept them working on the same plantations.",
        "The Compromise of 1877 gave Republican Rutherford B. Hayes the presidency in exchange for ending Reconstruction.",
        "Black literacy rates rose from about 5% in 1870 to over 30% by 1880 thanks to schools built during Reconstruction."
    ]
)

# ========== TOPIC 5: INDUSTRIALIZATION ==========
create_topic_slide(prs, 5, "Industrialization in America (1870s-1900s)",
    [
        "After the Civil War, America changed from a farming country into an industrial giant with factories everywhere.",
        "Amazing inventions changed life: Bell's telephone, Edison's light bulb, and Carnegie's steel production.",
        "The Transcontinental Railroad (finished 1869) made coast-to-coast travel possible in days instead of months.",
        "Factory workers had it rough: 12-16 hour days, low pay, and dangerous machines. Even young kids had to work.",
        "Workers started forming labor unions and went on strikes demanding better pay, shorter hours, and safer conditions."
    ],
    ["factory.jpg", "railroad.jpg", "edison.jpg", "childlabor.jpg"]
)

create_learning_slide(prs, 5, "Industrialization",
    "Industrialization showed me how progress came at a huge cost to workers, especially immigrants and children who had no protections.",
    [
        "I was disturbed by how young the child workers were - some factory kids were only 5 or 6 years old.",
        "The 'robber barons' like Carnegie and Rockefeller got incredibly rich while their workers barely survived.",
        "I understand now why labor unions were so important - without them, workers had no power to demand better treatment.",
        "It's interesting how this period created both amazing inventions and terrible inequality at the same time."
    ],
    [
        "By 1900, about 2 million children under 16 worked in factories, mines, and mills across America.",
        "Andrew Carnegie's steel company made him the richest man in America - worth about $380 billion in today's money.",
        "The Haymarket Riot of 1886 in Chicago turned violent and set back the labor movement for years.",
        "Chinese immigrants built much of the Transcontinental Railroad but faced severe discrimination and the Chinese Exclusion Act.",
        "The average factory worker made about $400-$500 per year while working 60+ hours per week with no vacation."
    ]
)

# Sources Slide
create_sources_slide(prs, [
    '1. Foner, Eric. Give Me Liberty!: An American History. 6th ed., W.W. Norton & Company, 2020.',
    '2. History.com Editors. "American Revolution History." History, A&E Television Networks, 29 Oct. 2009, www.history.com/topics/american-revolution.',
    '3. National Archives. "The Emancipation Proclamation." National Archives, U.S. National Archives and Records Administration, www.archives.gov/exhibits/featured-documents/emancipation-proclamation.'
])

# Save the presentation
output_path = '/workspace/US_History_Final_Project_Cristopher_Saravia_Medina.pptx'
prs.save(output_path)
print(f"\n✅ Presentation saved successfully!")
print(f"📁 File: {output_path}")
print(f"\n📋 Slide Contents:")
print("   1. Title Slide")
print("   2. Colonial America - Key Facts")
print("   3. Colonial America - What I Learned")
print("   4. American Revolution - Key Facts")
print("   5. American Revolution - What I Learned")
print("   6. Civil War - Key Facts")
print("   7. Civil War - What I Learned")
print("   8. Reconstruction - Key Facts")
print("   9. Reconstruction - What I Learned")
print("   10. Industrialization - Key Facts")
print("   11. Industrialization - What I Learned")
print("   12. Works Cited")
