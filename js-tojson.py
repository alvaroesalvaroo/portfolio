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
    match = re.search(r'const allProjects\s*=\s*\[(.*?)\s*ÑÑÑ?', content, re.DOTALL)
    
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
        
        # Limpiamos comentarios si los hubiera
        # clean_obj = re.sub(r'//.*', '', obj_str) # Esto fastidia urls (https://)

        # Extraer pares clave-valor
        # Captura la clave y el valor (ya sea entre "", '', `` o [])
        pairs = re.findall(r'(\w+)\s*:\s*("(.*?)"|\'(.*?)\'|`(.*?)`|\[(.*?)\]|(\d+))', obj_str, re.DOTALL)

        for p in pairs:
            print(p)
            key = p[0]
            # El valor puede estar en diferentes grupos de captura según el delimitador
            value = p[2] or p[3] or p[4] or p[5] or p[6]
            
            # Limpieza especial según el tipo de dato
            if key == "relevance":
                value = int(value)
            elif key == "tags":
                # Convertir el string de la lista ["A", "B"] en una lista real de Python
                value = [t.strip().strip('"').strip("'") for t in value.split(',')]
            else:
                # Limpiar espacios en blanco sobrantes de los strings multilínea
                value = value.strip()

            project_data[key] = value
        
        if project_data:
            parsed_projects.append(project_data)

    # 4. Guardar el resultado en projects.json
    with open('projects.json', 'w', encoding='utf-8') as json_file:
        json.dump(parsed_projects, json_file, indent=4, ensure_ascii=False)
    
    print(f"¡Éxito! Se han procesado {len(parsed_projects)} proyectos y guardado en projects.json")

if __name__ == "__main__":
    parse_projects_js()