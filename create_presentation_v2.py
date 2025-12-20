from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from pptx.oxml import parse_xml
import os

# Create presentation with widescreen dimensions
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Define colors - More vibrant patriotic theme
NAVY_BLUE = RGBColor(0x0a, 0x2a, 0x4a)
ROYAL_BLUE = RGBColor(0x1e, 0x3a, 0x5f)
DEEP_RED = RGBColor(0xb2, 0x22, 0x34)
GOLD = RGBColor(0xd4, 0xa5, 0x37)
CREAM = RGBColor(0xfa, 0xf8, 0xf5)
WHITE = RGBColor(0xff, 0xff, 0xff)
DARK_TEXT = RGBColor(0x2c, 0x2c, 0x2c)
LIGHT_BLUE = RGBColor(0xe8, 0xf1, 0xf8)

IMAGE_DIR = "/workspace/images"

def add_gradient_shape(slide, left, top, width, height, color1, color2):
    """Add a shape that simulates gradient"""
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color1
    shape.line.fill.background()
    return shape

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
    
    # Decorative stars (using rounded rectangles as accent)
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
    """Create an attractive content slide with images"""
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
    
    # Content area with bullets
    content_box = slide.shapes.add_textbox(Inches(0.4), Inches(1.6), Inches(7.8), Inches(5.6))
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
        run.font.size = Pt(14)
        run.font.color.rgb = DEEP_RED
        run.font.bold = True
        
        # Add bullet text
        run2 = p.add_run()
        run2.text = bullet
        run2.font.size = Pt(15)
        run2.font.color.rgb = DARK_TEXT
        
        p.space_after = Pt(12)
        p.space_before = Pt(4)
    
    # Images section - 2x2 grid on right side
    image_positions = [
        (Inches(8.4), Inches(1.55), Inches(2.3), Inches(2.6)),
        (Inches(10.85), Inches(1.55), Inches(2.3), Inches(2.6)),
        (Inches(8.4), Inches(4.35), Inches(2.3), Inches(2.6)),
        (Inches(10.85), Inches(4.35), Inches(2.3), Inches(2.6))
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
                    
                    pic = slide.shapes.add_picture(img_path, x, y, w, h - Inches(0.3))
                except Exception as e:
                    print(f"Could not add image {img_path}: {e}")
                    # Fallback placeholder
                    placeholder = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h - Inches(0.3))
                    placeholder.fill.solid()
                    placeholder.fill.fore_color.rgb = LIGHT_BLUE
                    placeholder.line.color.rgb = NAVY_BLUE
    
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

def create_sources_slide(prs, sources):
    """Create an elegant closing sources slide"""
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
    
    # Decorative line under header
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
        p.font.size = Pt(16)
        p.font.color.rgb = WHITE
        p.space_after = Pt(16)
        p.space_before = Pt(8)
    
    # Bottom decorative stripe
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

print("Creating presentation...")

# Title Slide
create_title_slide(prs)

# Topic 1: Colonial America
create_topic_slide(prs, 1, "Colonial America: Life in the Colonies",
    [
        "The 13 colonies were split into three groups: New England, Middle, and Southern colonies. Each region had its own economy and way of living based on geography and climate.",
        "New England colonies made money through fishing, shipbuilding, and trading goods. Southern colonies grew cash crops like tobacco and rice using enslaved African workers.",
        "Religion was super important in colonial life. The Puritans came to Massachusetts looking for religious freedom and built strict communities based on their Christian beliefs.",
        "Colonial society had a clear class system: wealthy landowners were at the top, farmers and merchants in the middle, and indentured servants and enslaved people at the bottom.",
        "The Great Awakening (1730s-1740s) was a big religious movement that brought colonists together and made them question authority - this helped set the stage for revolution."
    ],
    ["colonial_map.jpg", "colonial_town.jpg", "puritan.jpg", "plantation.jpg"]
)

# Topic 2: The American Revolution
create_topic_slide(prs, 2, "The American Revolution (1775-1783)",
    [
        "The Revolution happened because colonists were fed up with \"taxation without representation\" - Britain kept taxing them but wouldn't let them have a say in Parliament.",
        "Big events that led to war: the Boston Massacre (1770) where British soldiers killed colonists, the Boston Tea Party (1773), and the harsh Intolerable Acts.",
        "Thomas Jefferson wrote the Declaration of Independence in 1776, saying all men are created equal and have rights to life, liberty, and pursuing happiness.",
        "George Washington led the Continental Army through eight hard years of fighting, including the freezing winter at Valley Forge where many soldiers died.",
        "France joining our side in 1778 was a game-changer! They gave us soldiers, money, and ships that helped us win the final battle at Yorktown in 1781."
    ],
    ["boston_tea.jpg", "declaration.jpg", "washington_crossing.jpg", "yorktown.jpg"]
)

# Topic 3: The Civil War
create_topic_slide(prs, 3, "The Civil War (1861-1865)",
    [
        "The Civil War started when Southern states left the Union because they wanted to keep slavery. They feared President Lincoln would end it, threatening their way of life.",
        "The North (Union) had way more people, factories, and railroads. The South (Confederacy) had experienced military leaders and were fighting to protect their homeland.",
        "Lincoln's Emancipation Proclamation (1863) freed enslaved people in rebel states and let Black men join the Union Army - about 180,000 African Americans served.",
        "The Battle of Gettysburg in July 1863 was a turning point. The Union won this brutal three-day fight in Pennsylvania and stopped the South from invading the North.",
        "The war ended when Confederate General Robert E. Lee surrendered to Union General Ulysses S. Grant at Appomattox Court House in April 1865. Sadly, Lincoln was killed days later."
    ],
    ["lincoln.jpg", "gettysburg.jpg", "emancipation.jpg", "appomattox.jpg"]
)

# Topic 4: Reconstruction
create_topic_slide(prs, 4, "Reconstruction Era (1865-1877)",
    [
        "Reconstruction was the time after the Civil War when the government tried to rebuild the South and help nearly 4 million freed Black Americans become part of society.",
        "Three important amendments were added: 13th (ended slavery), 14th (made Black people citizens with equal rights), and 15th (gave Black men the right to vote).",
        "The Freedmen's Bureau helped former slaves by giving them food, building schools, and helping them find jobs. But it didn't get enough money and ended too soon.",
        "Black Americans made real progress - they voted, got elected to political offices, started businesses, and built schools, including the first Black colleges in America.",
        "Reconstruction ended in 1877 after a political deal. Southern states quickly passed Jim Crow laws that took away Black rights and forced segregation for almost 100 years."
    ],
    ["freedmen_school.jpg", "black_congress.jpg", "amendment.jpg", "jimcrow.jpg"]
)

# Topic 5: Industrialization
create_topic_slide(prs, 5, "Industrialization in America (1870s-1900s)",
    [
        "After the Civil War, America changed from a farming country into an industrial giant. Factories popped up everywhere, especially in the Northeast and Midwest.",
        "Amazing inventions changed American life: Alexander Graham Bell's telephone, Thomas Edison's light bulb, and Andrew Carnegie's steel production made the country modern.",
        "Railroads connected the whole country - the Transcontinental Railroad finished in 1869 made it possible to travel coast to coast in just a few days instead of months.",
        "Factory workers had it rough: long 12-16 hour days, low pay, and dangerous machines that hurt or killed people. Even young kids had to work in these conditions.",
        "Workers started forming labor unions to fight for better treatment. They went on strikes demanding higher pay, shorter workdays, and safer factories."
    ],
    ["factory.jpg", "railroad.jpg", "edison.jpg", "childlabor.jpg"]
)

# Sources Slide (MLA Format)
create_sources_slide(prs, [
    '1. Foner, Eric. Give Me Liberty!: An American History. 6th ed., W.W. Norton & Company, 2020.',
    '2. History.com Editors. "American Revolution History." History, A&E Television Networks, 29 Oct. 2009, www.history.com/topics/american-revolution.',
    '3. National Archives. "The Emancipation Proclamation." National Archives, U.S. National Archives and Records Administration, www.archives.gov/exhibits/featured-documents/emancipation-proclamation.'
])

# Save the presentation
output_path = '/workspace/US_History_Final_Project_v2.pptx'
prs.save(output_path)
print(f"\n✅ Presentation saved successfully!")
print(f"📁 File: {output_path}")
print(f"\n📋 Contents:")
print("   • Slide 1: Title Slide")
print("   • Slide 2: Colonial America (with 4 images)")
print("   • Slide 3: American Revolution (with 4 images)")
print("   • Slide 4: The Civil War (with 4 images)")
print("   • Slide 5: Reconstruction (with 4 images)")
print("   • Slide 6: Industrialization (with 4 images)")
print("   • Slide 7: Works Cited (MLA Format)")
