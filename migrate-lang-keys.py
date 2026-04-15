import re
import sys
import os

def migrate_lang_keys(html: str) -> str:
    """
    Busca etiquetas con data-lang-key y sustituye su contenido por t('key').
    Usa re.DOTALL para manejar contenido multilínea.
    """
    # El patrón captura:
    # 1. El inicio del tag y otros atributos previos.
    # 2. El valor de la key.
    # 3. El cierre del tag de apertura y otros atributos posteriores.
    # 4. El tag de cierre.
    pattern = r'(<\w+[^>]*?)\s+data-lang-key=["\']([^"\']+)["\']([^>]*?>).*?(<\/\w+>)'
    
    # Reemplazo por el formato PHP. Usamos comillas dobles para la key de traducción.
    replacement = r'\1\3<?= t("\2") ?>\4'
    
    return re.sub(pattern, replacement, html, flags=re.DOTALL)

def main():
    # 1. Validación de argumentos
    if len(sys.argv) < 2:
        print("Uso: python migrate.py <ruta_del_archivo_html>")
        sys.exit(1)

    file_path = sys.argv[1]

    if not os.path.isfile(file_path):
        print(f"Error: El archivo '{file_path}' no existe.")
        sys.exit(1)

    try:
        # 2. Leer el contenido
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 3. Procesar
        new_content = migrate_lang_keys(content)

        # 4. Guardar cambios (sobrescribe el original)
        # Consejo: Siempre es bueno tener un backup de Git antes de ejecutar esto.
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ Migración completada con éxito en: {file_path}")

    except Exception as e:
        print(f"❌ Ocurrió un error inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()