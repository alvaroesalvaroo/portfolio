import os

def update_references_and_cleanup(root_dir):
    extensions_to_patch = {'.js', '.json', '.html', '.css'}
    png_files_to_remove = []

    print("--- Iniciando Fase de Actualización y Limpieza ---")

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(root, file)
            name, ext = os.path.splitext(file)

            # 1. Buscar archivos que puedan contener referencias a las imágenes
            if ext.lower() in extensions_to_patch:
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    if '.png' in content.lower():
                        # Reemplazamos las menciones de .png por .webp
                        new_content = content.replace('.png', '.webp').replace('.PNG', '.webp')
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"[Actualizado] Referencias en: {file}")
                except Exception as e:
                    print(f"Error leyendo {file}: {e}")

            # 2. Identificar PNGs para borrar (solo si el WebP existe y es válido)
            if ext.lower() == '.png':
                webp_path = os.path.splitext(file_path)[0] + ".webp"
                if os.path.exists(webp_path) and os.path.getsize(webp_path) > 0:
                    png_files_to_remove.append(file_path)

    # 3. Borrado físico con confirmación
    if png_files_to_remove:
        confirm = input(f"\nSe han encontrado {len(png_files_to_remove)} archivos PNG listos para borrar. ¿Proceder? (s/n): ")
        if confirm.lower() == 's':
            for p in png_files_to_remove:
                os.remove(p)
                print(f"[Eliminado] {os.path.basename(p)}")
            print("\nLimpieza completada con éxito.")
        else:
            print("\nBorrado cancelado. Los archivos PNG siguen en su sitio.")
    else:
        print("\nNo se encontraron PNGs con su pareja WebP correspondiente.")

if __name__ == "__main__":
    update_references_and_cleanup('.')