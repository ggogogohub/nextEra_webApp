import subprocess
import sys
import os

def main():
    """
    Setup script to install dependencies and prepare the environment
    """
    print("Setting up NextEra Workforce backend...")
    
    # Check if virtual environment exists
    if not os.path.exists("venv"):
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
    
    # Determine the pip path based on the platform
    pip_path = os.path.join("venv", "Scripts", "pip") if sys.platform == "win32" else os.path.join("venv", "bin", "pip")
    
    # Upgrade pip
    print("Upgrading pip...")
    subprocess.run([pip_path, "install", "--upgrade", "pip"], check=True)
    
    # Install dependencies
    print("Installing dependencies...")
    subprocess.run([pip_path, "install", "-r", "requirements.txt"], check=True)
    
    print("Setup complete! You can now run the application with:")
    if sys.platform == "win32":
        print("venv\\Scripts\\activate && python main.py")
    else:
        print("source venv/bin/activate && python main.py")

if __name__ == "__main__":
    main()
