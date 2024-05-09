from pypdf import PdfReader 

def parse_pdf(pdf):
    reader = PdfReader(pdf.file)
    text = [page.extract_text() for page in reader.pages]
    text = "".join(text)
    
    return text