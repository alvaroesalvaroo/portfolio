import os
from PIL import Image, ImageOps

def compress_images(root_dir):
    total_original_size = 0
    total_new_size = 0
    img_count = 0

    # Extensiones a buscar
    target_ext = '.png'
    max_size = (1920, 1080)

    print(f"{'Archivo':<50} | {'Reducción':<10}")
    print("-" * 65)

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(target_ext):
                path_old = os.path.join(root, file)
                path_new = os.path.splitext(path_old)[0] + ".webp"

                try:
                    with Image.open(path_old) as img:
                        # 1. Calcular tamaño original
                        orig_size = os.path.getsize(path_old)

                        # 2. Redimensionar respetando el aspect ratio
                        # ImageOps.contain ajusta la imagen al hueco sin recortar
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)

                        # 3. Guardar como WebP (calidad 80 suele ser el sweet spot)
                        img.save(path_new, "WEBP", quality=80)

                        # 4. Calcular estadísticas
                        new_size = os.path.getsize(path_new)
                        total_original_size += orig_size
                        total_new_size += new_size
                        img_count += 1

                        percentage = (new_size / orig_size) * 100
                        print(f"{file[:47]:<50} | {percentage:>8.2f}%")

                except Exception as e:
                    print(f"Error procesando {file}: {e}")

    if img_count > 0:
        total_percentage = (total_new_size / total_original_size) * 100
        print("-" * 65)
        print(f"PROCESO TERMINADO")
        print(f"Imágenes procesadas: {img_count}")
        print(f"Espacio total final respecto al original: {total_percentage:.2f}%")
    else:
        print("No se encontraron imágenes PNG.")

# Ejecutar en el directorio actual
if __name__ == "__main__":
    compress_images('.')