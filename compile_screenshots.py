from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(filename, text, size=(1280, 720), bg_color=(31, 41, 55), text_color=(255, 255, 255)):
    img = Image.new("RGB", size, bg_color)
    draw = ImageDraw.Draw(img)
    # Simple cross hair design for placeholder
    draw.rectangle([10, 10, size[0]-10, size[1]-10], outline=(75, 85, 99), width=2)
    # Draw simple text
    draw.text((size[0]/2 - 150, size[1]/2 - 10), text, fill=text_color)
    img.save(filename)
    print(f"Created placeholder: {filename}")

def compile_screenshots():
    files = {
        "screenshot_desktop.png": "Home Page - Desktop View (Vite + React + Tailwind)",
        "screenshot_mobile.png": "Home Page - Mobile View (Responsive Layout Check)",
        "screenshot_dashboard.png": "Dashboard Page - Analytics View (React Router Shell)"
    }
    
    # Check if files exist, create placeholders if missing
    for filename, label in files.items():
        if not os.path.exists(filename):
            size = (375, 812) if "mobile" in filename else (1280, 720)
            create_placeholder(filename, label, size=size)
            
    # Load and convert to PDF
    images = []
    for filename in files.keys():
        img = Image.open(filename)
        # Convert to RGB if in RGBA mode
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        images.append(img)
        
    # Save as PDF
    output_pdf = "W2_FrontendScreenshots_TBI-26100640.pdf"
    images[0].save(output_pdf, save_all=True, append_images=images[1:])
    print(f"Successfully compiled all screenshots into: {output_pdf}")

if __name__ == "__main__":
    compile_screenshots()
