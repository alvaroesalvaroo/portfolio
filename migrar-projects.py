import re
import json

with open('assets/js/projects.js.backup', 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer el array entre el primer '[' y su cierre correspondiente
start = content.index('[')
depth = 0
end = start
for i, ch in enumerate(content[start:], start):
    if ch == '[': depth += 1
    if ch == ']': depth -= 1
    if depth == 0:
        end = i
        break

array_str = content[start:end+1]

# DEBUG 1: Ver el inicio del array extraído
print("=== ARRAY EXTRAÍDO (primeros 300 chars) ===")
print(array_str[:300])
print("...")

# Limpiar paso a paso

# 1. Eliminar comentarios de línea (// ...)
array_str = re.sub(r'//[^\n]*', '', array_str)

# 2. Eliminar comentarios de bloque (/* ... */)
array_str = re.sub(r'/\*.*?\*/', '', array_str, flags=re.DOTALL)

# 3. Template literals con backticks -> string JSON
def flatten_template_literal(m):
    inner = m.group(1)
    inner = inner.strip()
    inner = inner.replace('\n', ' ')
    inner = re.sub(r'\s+', ' ', inner)
    return json.dumps(inner)

array_str = re.sub(r'`([^`]*)`', flatten_template_literal, array_str)

# DEBUG 2: Ver tras limpiar template literals
print("\n=== TRAS LIMPIAR TEMPLATE LITERALS (primeros 300 chars) ===")
print(array_str[:300])

# 4. Claves JS sin comillas -> claves JSON con comillas dobles
#    Busca:  palabra: valor  y lo convierte a "palabra": valor
array_str = re.sub(r'(\b[a-zA-Z_][a-zA-Z0-9_]*\b)\s*:', r'"\1":', array_str)

# DEBUG 3: Ver tras añadir comillas a las claves
print("\n=== TRAS AÑADIR COMILLAS A CLAVES (primeros 300 chars) ===")
print(array_str[:300])

# 5. Comillas simples -> comillas dobles (valores string)
#    Ojo: no tocar las que están dentro de strings ya con comillas dobles
array_str = re.sub(r"'([^']*)'", r'"\1"', array_str)

# 6. Trailing commas antes de ] o }
array_str = re.sub(r',\s*([}\]])', r'\1', array_str)

# DEBUG 4: Ver el resultado final antes de parsear
print("\n=== JSON FINAL (primeros 500 chars) ===")
print(array_str[:500])

# Guardar el JSON intermedio para inspección manual si falla
with open('debug_projects.json', 'w', encoding='utf-8') as f:
    f.write(array_str)
print("\n(JSON intermedio guardado en debug_projects.json para inspección)")

try:
    projects = json.loads(array_str)
except json.JSONDecodeError as e:
    print(f"\n❌ Error JSON en posición {e.pos}: {e.msg}")
    # Mostrar contexto alrededor del error
    start_ctx = max(0, e.pos - 100)
    end_ctx   = min(len(array_str), e.pos + 100)
    print(f"...{array_str[start_ctx:e.pos]}  <-- AQUÍ -->  {array_str[e.pos:end_ctx]}...")
    exit(1)

print(f"\n✅ Parseados {len(projects)} proyectos correctamente")

# Generar PHP
lines = ["<?php\n", "$allProjects = [\n"]
for p in projects:
    lines.append("    [\n")
    for k, v in p.items():
        if isinstance(v, str):
            escaped = v.replace("\\", "\\\\").replace("'", "\\'")
            lines.append(f"        '{k}' => '{escaped}',\n")
        elif isinstance(v, list):
            items = ', '.join(f"'{i}'" for i in v)
            lines.append(f"        '{k}' => [{items}],\n")
        elif isinstance(v, bool):
            lines.append(f"        '{k}' => {'true' if v else 'false'},\n")
        elif isinstance(v, (int, float)):
            lines.append(f"        '{k}' => {v},\n")
        else:
            lines.append(f"        '{k}' => null,\n")
    lines.append("    ],\n")
lines.append("];\n")

with open('assets/php/projects.php', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✅ Generado assets/php/projects.php")