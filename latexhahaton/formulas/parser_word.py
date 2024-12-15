import subprocess
import re
import os


def convert_docx_to_tex(docx_path, tex_path):
    try:
        subprocess.run(['convert/pandoc.exe', '-s', docx_path, '-o', tex_path], check=True)
        print(f"Файл {docx_path} успешно конвертирован в {tex_path}.")
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при конвертации файла: {e}")


def unicode_to_latex(text):
    replacements = {
        'Σ': r'\sum', 'ψ': r'\psi', 'α': r'\alpha', 'β': r'\beta', 'γ': r'\gamma',
        'δ': r'\delta', 'ε': r'\epsilon', 'φ': r'\phi', 'ϕ': r'\varphi',
    }
    for unicode_symbol, latex_command in replacements.items():
        text = text.replace(unicode_symbol, latex_command)
    return text


def convert_text_to_latex(text):
    replacements = {
        '\{': '{', '\}': '}'
    }
    for old, new in replacements.items():
        text = re.sub(re.escape(old), new, text)
    return text


def extract_math_from_tex(tex_path):
    """Извлекает математические выражения из файла LaTeX и преобразует их в LaTeX формат."""
    with open(tex_path, 'r', encoding='utf-8') as file:
        tex_content = file.read()

    math_expressions = []

    # Ищем выражения в стандартных математических блоках LaTeX
    math_expressions += re.findall(r'\\begin\{(equation|align|multline)\}.*?\\end\{\1\}', tex_content, re.DOTALL)

    # Ищем inline-выражения LaTeX
    math_expressions += re.findall(r'\$.*?\$', tex_content, re.DOTALL)

    # Ищем выражения в display-style
    math_expressions += re.findall(r'\\\[.*?\\\]', tex_content, re.DOTALL)

    # Фильтрация для чистки выражений от нежелательных разрывов строк
    processed_expressions = [expr.replace('\n', '') for expr in math_expressions if
                             any(char in expr for char in '\\${}')]

    return processed_expressions

# if __name__ == "__main__":
#     docx_path = 'test.docx'
#     tex_path = 'temp.tex'
#     txt_path = 'output.txt'
#
#     convert_docx_to_tex(docx_path, tex_path)
#     math_expressions = extract_math_from_tex(tex_path)
#     if math_expressions:
#         with open(txt_path, 'w', encoding='utf-8') as file:
#             for expr in math_expressions:
#                 file.write(expr + '\n\n')
#         print(f"Математические выражения были успешно записаны в {txt_path}")
#     else:
#         print("Математические выражения не найдены.")
