import tkinter as tk
from tkinter import messagebox
from datetime import datetime
from hashlib import sha256
import json
import requests

class VotingApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Voting System")
        
        self.create_ui()
        
    def create_ui(self):
        self.label = tk.Label(self.root, text="Voting System")
        self.label.pack()
        
        self.vote_button = tk.Button(self.root, text="Vote", command=self.vote)
        self.vote_button.pack()
        
        self.view_button = tk.Button(self.root, text="View Blockchain", command=self.view_blockchain)
        self.view_button.pack()
        
        self.api_url = "http://localhost:8000"  # URL of voting-core API
        
    def vote(self):
        # (Simulated voting logic)
        candidate = "Candidato A"
        sender = "Nombre"
        recipient = candidate
        amount = 1

        # Create a new transaction
        transaction = {
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        }
        
        # Send the transaction to the blockchain core API
        response = requests.post(f"{self.api_url}/vote", json=transaction)
        
        if response.status_code == 200:
            messagebox.showinfo("Success", "Vote recorded and block mined!")
        else:
            messagebox.showerror("Error", "Failed to record vote.")
    
    def view_blockchain(self):
        # Fetch and display the blockchain data from the blockchain core API
        response = requests.get(f"{self.api_url}/chain")
        
        if response.status_code == 200:
            blockchain_data = response.json()
            blockchain_text = json.dumps(blockchain_data, indent=4)
            messagebox.showinfo("Blockchain", blockchain_text)
        else:
            messagebox.showerror("Error", "Failed to fetch blockchain data.")

if __name__ == "__main__":
    root = tk.Tk()
    app = VotingApp(root)
    root.mainloop()
