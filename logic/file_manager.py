import os
import config
import json
import logic.errors as err
import re


class FileManager:
    def __init__(self):
        self.data_folder = config.data_folder
        if not os.path.isdir(self.data_folder):
            os.mkdir(self.data_folder)

    def get_list_files(self):
        list_files = []
        for file_name in os.listdir(self.data_folder):            
            if file_name[-5:] != '.json':
                continue

            file_path = os.path.join(self.data_folder, file_name)

            if not os.path.isfile(file_path):
                continue

            list_files.append(file_name)

        return list_files

    def save_file(self, file_name: str, data: dict):
        if re.sub(r'[\w\s\.]+', '', file_name) != "":
            raise err.FileFormatNotValid()
        
        if file_name[-5:] != '.json':
            file_name += '.json'

        file_path = os.path.join(self.data_folder, file_name)
        file_path = os.path.normpath(file_path)

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f)

    def open_file(self, file_name: str):
        if file_name not in self.get_list_files():
            raise err.FileNotFound(file_name)

        file_path = os.path.join(self.data_folder, file_name)
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        return data
