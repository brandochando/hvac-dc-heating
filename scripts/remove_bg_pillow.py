import sys
import os

# Add local libs to path
sys.path.append(os.path.join(os.getcwd(), 'libs'))

from PIL import Image

def remove_white_background(img_path, output_path, threshold=245):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Check for white pixels (using a threshold like >245 for nearly-white)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Set to fully transparent (retaining white color info but alpha 0)
            new_data.append((255, 255, 255, 0)) 
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully processed {img_path} -> {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 remove_bg_pillow.py <input> <output> [threshold]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 245
    
    remove_white_background(input_file, output_file, threshold)
