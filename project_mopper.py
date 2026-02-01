import os

def list_files(startpath):
    # Bu klasörleri görmezden geleceğiz, yoksa çıktı çöplüğe döner
    ignored_dirs = {
        'node_modules', '.git', '.next', '.vscode', '.idea', 
        '__pycache__', 'venv', 'env', 'build', 'dist', '.DS_Store'
    }
    
    with open("project_structure.txt", "w", encoding="utf-8") as f:
        f.write(f"Project Structure for: {os.path.basename(os.getcwd())}\n")
        f.write("="*40 + "\n")
        
        for root, dirs, files in os.walk(startpath):
            # Gereksiz klasörleri yerinde filtrele (traverse etme)
            dirs[:] = [d for d in dirs if d not in ignored_dirs]
            
            level = root.replace(startpath, '').count(os.sep)
            indent = ' ' * 4 * (level)
            f.write(f'{indent}|-- {os.path.basename(root)}/\n')
            
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                # Gereksiz dosyaları filtrele
                if file in ignored_dirs or file.endswith('.lock') or file.endswith('.log'):
                    continue
                f.write(f'{subindent}|-- {file}\n')

    print("✅ İşlem tamam. 'project_structure.txt' dosyası oluşturuldu.")

if __name__ == "__main__":
    list_files(os.getcwd())