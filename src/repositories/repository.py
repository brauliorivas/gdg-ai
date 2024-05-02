import pandas as pd
from abc import ABC, abstractmethod
from src.models.client import Client, GeminiClient
from src.models.vector_adapter import VectorAdapter

class Uploader(ABC):
    @abstractmethod
    def upload(self, path: str) -> None: ...

class QdrantUploader(Uploader):
    def __init__(self) -> None:
        self.data = None
        self.client : Client = None
        self.gemini : GeminiClient = None
    
    def upload(self, path: str) -> None:
        data = self.load_data(path)
        embedded_data = self.gemini.embedd_data(data)
        points = VectorAdapter.generate_points(embedded_data)
        self.client.upload_data(points)
    
    def set_client(self, new_client: Client) -> None:
        self.client = new_client
    
    def set_gemini_client(self, gemini_key: str) -> None:
        self.gemini = GeminiClient(gemini_key)
        
    def load_data(self, path: str) -> None:
        dt = pd.read_csv(path)
        dt = dt.dropna(axis=1, how='all')
        dt = dt.drop(['Product Dimensions', 'Variants', 'Product Url', 'Is Amazon Seller', 'Upc Ean Code', 'Model Number', 'Uniq Id'], axis=1)
        dt = dt.dropna(subset=['Category', 'Selling Price', 'About Product', 'Product Specification', 'Technical Details', 'Shipping Weight'])
        
        dt['Image'] = dt['Image'].map(lambda x: x.split('|')[0])
        
        pattern = r'^\$?\d+(\.\d{2})?$'
        
        valid_rows = dt['Selling Price'].str.match(pattern, na=False)
        
        dt = dt[valid_rows]
        
        dt['Selling Price'] = dt['Selling Price'].str.replace('$', '')
        dt.dropna(subset=['Selling Price'], inplace=True)
        dt['Selling Price'] = dt['Selling Price'].map(lambda x: float(x))
        
        dt['Category'] = dt['Category'].map(lambda x: x.split('|')[0])
            
        return dt.iloc[:10]

class VectorRepository(Uploader):
    def __init__(self, uploader: QdrantUploader) -> None:
        self.uploader = uploader
    
    def upload(self, path: str) -> None:
        self.uploader.upload(path)