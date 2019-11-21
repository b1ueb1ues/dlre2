from PIL import Image

#size = (512,512)
size = (1024,1024)
base_file_name = "mainstory_009004_base"
(z,z,z,y) = Image.open(base_file_name + "_Y.png").convert('RGBA').split()
u = Image.open(base_file_name + "_Cb.png").convert('L').resize(size, Image.LANCZOS)
v = Image.open(base_file_name + "_Cr.png").convert('L').resize(size, Image.LANCZOS)

merged = Image.merge("YCbCr", (y,u,v)).convert('RGB')
merged.save("rgb.png")


alpha_file_name = base_file_name + "_alpha.png"

(r,g,b,z) = Image.open('rgb.png').convert('RGBA').split()
(z,z,z,a) = Image.open(alpha_file_name).resize(size, Image.LANCZOS).split()

merged = Image.merge("RGBA", (r,g,b,a))
merged.save("rgba.png")
