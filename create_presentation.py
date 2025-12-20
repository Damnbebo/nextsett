from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import nsmap
from pptx.oxml import parse_xml

# Create presentation with widescreen dimensions
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Define colors
NAVY_BLUE = RGBColor(0x1a, 0x36, 0x5d)
DARK_RED = RGBColor(0x8b, 0x00, 0x00)
GOLD = RGBColor(0xc9, 0xa2, 0x27)
WHITE = RGBColor(0xff, 0xff, 0xff)
LIGHT_GRAY = RGBColor(0xf5, 0xf5, 0xf5)
DARK_GRAY = RGBColor(0x33, 0x33, 0x33)

def add_background(slide, color):
    """Add a solid background color to slide"""
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def create_title_slide(prs):
    """Create the opening title slide"""
    slide_layout = prs.slide_layouts[6]  # Blank layout
    slide = prs.slides.add_slide(slide_layout)
    add_background(slide, NAVY_BLUE)
    
    # Add decorative top bar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.5))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = DARK_RED
    top_bar.line.fill.background()
    
    # Add decorative bottom bar
    bottom_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(7), Inches(13.333), Inches(0.5))
    bottom_bar.fill.solid()
    bottom_bar.fill.fore_color.rgb = DARK_RED
    bottom_bar.line.fill.background()
    
    # Main title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.8), Inches(12.333), Inches(1.5))
    tf = title_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "United States History I"
    p.font.size = Pt(60)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Subtitle
    subtitle_box = slide.shapes.add_textbox(Inches(0.5), Inches(3.3), Inches(12.333), Inches(1))
    tf = subtitle_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Final Project: Five Key Topics in American History"
    p.font.size = Pt(32)
    p.font.color.rgb = GOLD
    p.alignment = PP_ALIGN.CENTER
    
    # Decorative line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(4), Inches(4.5), Inches(5.333), Inches(0.05))
    line.fill.solid()
    line.fill.fore_color.rgb = GOLD
    line.line.fill.background()
    
    # Student name
    name_box = slide.shapes.add_textbox(Inches(0.5), Inches(5), Inches(12.333), Inches(0.8))
    tf = name_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Cristopher Saravia Medina"
    p.font.size = Pt(28)
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Course info
    course_box = slide.shapes.add_textbox(Inches(0.5), Inches(5.8), Inches(12.333), Inches(0.6))
    tf = course_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "US History I • Fall 2024"
    p.font.size = Pt(20)
    p.font.color.rgb = LIGHT_GRAY
    p.alignment = PP_ALIGN.CENTER

def create_topic_slide(prs, topic_number, title, bullets, image_descriptions):
    """Create a content slide for a topic"""
    slide_layout = prs.slide_layouts[6]  # Blank layout
    slide = prs.slides.add_slide(slide_layout)
    add_background(slide, WHITE)
    
    # Header bar
    header = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.2))
    header.fill.solid()
    header.fill.fore_color.rgb = NAVY_BLUE
    header.line.fill.background()
    
    # Topic number badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.3), Inches(0.25), Inches(1.2), Inches(0.7))
    badge.fill.solid()
    badge.fill.fore_color.rgb = DARK_RED
    badge.line.fill.background()
    
    badge_text = slide.shapes.add_textbox(Inches(0.3), Inches(0.3), Inches(1.2), Inches(0.6))
    tf = badge_text.text_frame
    p = tf.paragraphs[0]
    p.text = f"Topic {topic_number}"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Title
    title_box = slide.shapes.add_textbox(Inches(1.7), Inches(0.3), Inches(11), Inches(0.8))
    tf = title_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.LEFT
    
    # Content area - bullets on left
    content_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.5), Inches(7.5), Inches(5.5))
    tf = content_box.text_frame
    tf.word_wrap = True
    
    for i, bullet in enumerate(bullets):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = "• " + bullet
        p.font.size = Pt(18)
        p.font.color.rgb = DARK_GRAY
        p.space_after = Pt(14)
        p.level = 0
    
    # Image placeholders on right (2x2 grid)
    image_positions = [
        (Inches(8.3), Inches(1.5)),
        (Inches(10.8), Inches(1.5)),
        (Inches(8.3), Inches(4.3)),
        (Inches(10.8), Inches(4.3))
    ]
    
    for idx, (x, y) in enumerate(image_positions):
        # Image placeholder box
        img_box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, Inches(2.2), Inches(2.5))
        img_box.fill.solid()
        img_box.fill.fore_color.rgb = LIGHT_GRAY
        img_box.line.color.rgb = NAVY_BLUE
        img_box.line.width = Pt(2)
        
        # Image description text
        desc_box = slide.shapes.add_textbox(x, y + Inches(0.8), Inches(2.2), Inches(1))
        tf = desc_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        if idx < len(image_descriptions):
            p.text = f"[Image {idx+1}]\n{image_descriptions[idx]}"
        else:
            p.text = f"[Image {idx+1}]"
        p.font.size = Pt(10)
        p.font.color.rgb = DARK_GRAY
        p.alignment = PP_ALIGN.CENTER

def create_sources_slide(prs, sources):
    """Create the closing sources slide"""
    slide_layout = prs.slide_layouts[6]  # Blank layout
    slide = prs.slides.add_slide(slide_layout)
    add_background(slide, NAVY_BLUE)
    
    # Header
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.5), Inches(12.333), Inches(1))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Works Cited"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.alignment = PP_ALIGN.CENTER
    
    # Decorative line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(3), Inches(1.5), Inches(7.333), Inches(0.05))
    line.fill.solid()
    line.fill.fore_color.rgb = GOLD
    line.line.fill.background()
    
    # Sources content box
    content_box = slide.shapes.add_textbox(Inches(1), Inches(2), Inches(11.333), Inches(5))
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
        p.space_after = Pt(20)
    
    # Footer
    footer_box = slide.shapes.add_textbox(Inches(0.5), Inches(6.8), Inches(12.333), Inches(0.5))
    tf = footer_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Cristopher Saravia Medina • US History I • Final Project"
    p.font.size = Pt(14)
    p.font.color.rgb = LIGHT_GRAY
    p.alignment = PP_ALIGN.CENTER

# ============================================
# CREATE THE PRESENTATION
# ============================================

# Title Slide
create_title_slide(prs)

# Topic 1: Colonial America
create_topic_slide(prs, 1, "Colonial America: Life in the Colonies",
    [
        "The 13 colonies were divided into three regions: New England, Middle, and Southern colonies, each with different economies and ways of life.",
        "New England colonies focused on fishing, shipbuilding, and trade, while Southern colonies relied heavily on cash crops like tobacco and rice grown by enslaved workers.",
        "Religion played a huge role in colonial life - Puritans came to Massachusetts seeking religious freedom and created strict communities based on their beliefs.",
        "Colonial society had a clear social structure with wealthy landowners at the top, middle-class farmers and merchants in the middle, and indentured servants and enslaved people at the bottom.",
        "The Great Awakening (1730s-1740s) was a religious revival that united colonists across regions and challenged traditional authority, helping plant seeds for future independence."
    ],
    ["Map of 13 Colonies", "Colonial Town Scene", "Puritan Meeting House", "Tobacco Plantation"]
)

# Topic 2: The American Revolution
create_topic_slide(prs, 2, "The American Revolution (1775-1783)",
    [
        "The Revolution started because colonists were angry about 'taxation without representation' - Britain kept taxing them without giving them a voice in Parliament.",
        "Key events leading to war included the Boston Massacre (1770), the Boston Tea Party (1773), and the Intolerable Acts that punished Massachusetts for rebelling.",
        "The Declaration of Independence, written mainly by Thomas Jefferson in 1776, announced that all men are created equal and have rights to life, liberty, and the pursuit of happiness.",
        "The Continental Army, led by George Washington, faced many hardships including the brutal winter at Valley Forge, but kept fighting for eight long years.",
        "France's alliance with America in 1778 was a game-changer, providing troops, money, and naval support that helped win the final Battle of Yorktown in 1781."
    ],
    ["Boston Tea Party", "Signing Declaration", "Washington Crossing Delaware", "Battle of Yorktown"]
)

# Topic 3: The Civil War
create_topic_slide(prs, 3, "The Civil War (1861-1865)",
    [
        "The Civil War broke out after Southern states seceded (left the Union) because they wanted to keep slavery and feared President Lincoln would end it.",
        "The North (Union) had more people, factories, and railroads, while the South (Confederacy) had skilled military leaders and were fighting to defend their homeland.",
        "The Emancipation Proclamation (1863) freed enslaved people in Confederate states and allowed Black soldiers to join the Union Army - about 180,000 served.",
        "Major battles like Gettysburg (1863) were turning points - the Union won this bloody three-day battle in Pennsylvania, stopping the South's invasion of the North.",
        "The war ended when General Robert E. Lee surrendered to Ulysses S. Grant at Appomattox Court House in April 1865, but President Lincoln was assassinated just days later."
    ],
    ["Lincoln Portrait", "Battle of Gettysburg", "Emancipation Proclamation", "Surrender at Appomattox"]
)

# Topic 4: Reconstruction
create_topic_slide(prs, 4, "Reconstruction Era (1865-1877)",
    [
        "Reconstruction was the period after the Civil War when the government tried to rebuild the South and integrate nearly 4 million freed Black Americans into society.",
        "The 13th, 14th, and 15th Amendments were passed - these ended slavery, made Black people citizens with equal protection, and gave Black men the right to vote.",
        "The Freedmen's Bureau was created to help formerly enslaved people by providing food, schools, and help finding jobs, but it was underfunded and ended too soon.",
        "Black Americans made real progress during this time - they voted, held political office, and started businesses and schools, including the first Black colleges.",
        "Reconstruction ended in 1877 due to a political deal, and Southern states quickly passed Jim Crow laws that took away Black rights and enforced segregation for decades."
    ],
    ["Freedmen's Bureau School", "Black Congressmen 1870s", "13th Amendment Document", "Jim Crow Sign"]
)

# Topic 5: Industrialization
create_topic_slide(prs, 5, "Industrialization in America (1870s-1900s)",
    [
        "After the Civil War, America transformed from a farming nation into an industrial powerhouse, with factories popping up across the Northeast and Midwest.",
        "Inventions like the telephone (Alexander Graham Bell), light bulb (Thomas Edison), and steel production process (Andrew Carnegie) changed how Americans lived and worked.",
        "Railroads connected the entire country - the Transcontinental Railroad (completed 1869) made it possible to travel coast to coast in days instead of months.",
        "Factory workers, including many children, faced terrible conditions: long hours (12-16 hour days), low pay, and dangerous machines that caused injuries and deaths.",
        "Labor unions formed to fight for workers' rights - they organized strikes demanding better wages, shorter hours, and safer workplaces, though progress was slow."
    ],
    ["Factory Workers 1900s", "Transcontinental Railroad", "Thomas Edison with Light Bulb", "Child Labor Photo"]
)

# Sources Slide (MLA Format)
create_sources_slide(prs, [
    'Foner, Eric. Give Me Liberty!: An American History. 6th ed., W.W. Norton & Company, 2020.',
    '',
    'History.com Editors. "American Revolution." History, A&E Television Networks, 29 Oct. 2009,',
    '        www.history.com/topics/american-revolution/american-revolution-history.',
    '',
    'National Archives. "The Emancipation Proclamation." National Archives, U.S. National Archives',
    '        and Records Administration, www.archives.gov/exhibits/featured-documents/emancipation-proclamation.'
])

# Save the presentation
prs.save('/workspace/US_History_Final_Project.pptx')
print("Presentation saved successfully as 'US_History_Final_Project.pptx'")
print("\nTo import to Google Slides:")
print("1. Go to Google Drive (drive.google.com)")
print("2. Click 'New' → 'File upload'")
print("3. Select the downloaded .pptx file")
print("4. Once uploaded, right-click → 'Open with' → 'Google Slides'")
print("5. Add your images to replace the placeholders")
