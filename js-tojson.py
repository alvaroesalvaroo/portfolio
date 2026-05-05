import re
import json
import os

def parse_projects_js():
    file_path = 'assets/js/projects.js'
    
    if not os.path.exists(file_path):
        print(f"Error: No se encuentra el archivo {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Localizar el bloque entre 'const allProjects = [' y el '];' final
    # Usamos re.DOTALL para que el '.' capture saltos de línea

    # LA REGEX NO VA. AÑADIMOS "ÑÑÑ" al final del array
    match = re.search(r'const allProjects\s*=\s*\[(.*?)\s*END-PROJECTS?', content, re.DOTALL)
    
    if not match:
        print("No se encontró la variable allProjects o el formato no es el esperado.")
        return

    projects_body = match.group(1)

    # 2. Separar cada objeto individual { ... }
    # Buscamos patrones que empiecen por { y terminen por } seguidos de coma o final de bloque
    raw_objects = re.findall(r'\{(.*?)\}', projects_body, re.DOTALL)
    
    parsed_projects = []

    for obj_str in raw_objects:
        project_data = {}
        
        # 3. Extraer campos simples (key, title, relevance, etc.) y campos con backticks (descripciones)
        # Este patrón busca: nombre_campo: "valor" o nombre_campo: `valor` o nombre_campo: [lista]
        
        # NO PODEMOS LIMPIAR // PORQUE HAY LINKS
        # clean_obj = re.sub(r'//.*', '', obj_str) # Esto fastidia urls (https://)

        # Extraer pares clave-valor
        # Captura la clave y el valor (ya sea entre "", '', `` o [])

        pairs = re.findall(
        # r'    raw string
        # \w+   any spaces or tabs
        # \s*   dos puntos con espacios a los lados
        # "(.*?)"   comillas rodenado a cualquier texto
        # \'(.*?)\'   comillas simples rodenado a cualquier texto
        r'(\w+)\s*:\s*("(.*?)"|\'(.*?)\'|`(.*?)`|\[(.*?)\]|(-?\d+)|(true|false))',
                obj_str,
                re.DOTALL # Deja escribir comentarios en varias líneas
            )

        for p in pairs:
            print(p)
            key = p[0]
            # El valor puede estar en diferentes grupos de captura según el delimitador
            if   p[2] != '': value = p[2]   # "doble comilla"
            elif p[3] != '': value = p[3]   # 'simple'
            elif p[4] != '': value = p[4]   # `backtick`
            elif p[5] != '': value = p[5]   # [lista]
            elif p[6] != '': value = p[6]   # número (incluye negativos)
            elif p[7] != '': value = p[7]   # true / false
            else:            value = ''
            
            # Limpieza especial según el tipo de dato
            if key == 'relevance' or (p[6] != '' and key != 'tags'):
                try:
                    value = int(value)
                except ValueError:
                    pass
            elif p[7] != '':  # era true/false
                value = (value == 'true')
            elif key == 'tags':
                value = [t.strip().strip('"').strip("'") for t in value.split(',') if t.strip()]
            else:
                value = ' '.join(value.split())  # colapsar whitespace multilínea

            project_data[key] = value
        
        if project_data:
            parsed_projects.append(project_data)

    # 4. Guardar el resultado en projects.json
    with open('assets/projects.json', 'w', encoding='utf-8') as json_file:
        json.dump(parsed_projects, json_file, indent=4, ensure_ascii=False)
    
    print(f"¡Éxito! Se han procesado {len(parsed_projects)} proyectos y guardado en projects.json")

if __name__ == "__main__":
    parse_projects_js()