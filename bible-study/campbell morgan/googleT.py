# from googletrans import Translator

# def translate_text(text, target_language):
#     translator = Translator()
#     translation = translator.translate(text, dest=target_language)
#     return translation.text

# # Example usage
# english_text = "Hello, how are you?"
# translated_text = translate_text(english_text, 'zh-cn')
# print(f"English: {english_text}")
# print(f"Translation (Chinese): {translated_text}")
# from googletrans import Translator
# import markdown

# def translate_text(text, target_language):
#     translator = Translator()
#     translation = translator.translate(text, dest=target_language)
#     return translation.text

# # Read input Markdown file
# with open("paraE.md", "r", encoding="utf-8") as file:
#     markdown_text = file.read()

# # Process the Markdown text (translation or other modifications)
# translated_text = translate_text(markdown_text, "zh-cn")

# # Write the translated Markdown to output file
# with open("paraC.md", "w", encoding="utf-8") as file:
#     file.write(translated_text)
# worked for input  ***** 888
from googletrans import Translator

def translate_text(text, target_language):
    translator = Translator()
    translation = translator.translate(text, dest=target_language)
    return translation.text

# Read input text file
with open("input.txt", "r", encoding="utf-8") as file:
    text = file.read()

# Process the text (translation or other modifications)
translated_text = translate_text(text, "zh-cn")

# Write the translated text to output file
with open("parableC.txt", "w", encoding="utf-8") as file:
    file.write(translated_text)

# from googletrans import Translator

# def translate_text(text, target_language):
#     translator = Translator()
#     translation = translator.translate(text, dest=target_language)
#     return translation.text

# # Open input and output files
# with open("input.txt", "r", encoding="utf-8") as input_file, open("output.txt", "w", encoding="utf-8") as output_file:
#     translator = Translator()
#     for line in input_file:
#         translated_line = translate_text(line.strip(), "zh-cn")
#         output_file.write(translated_line + "\n")
