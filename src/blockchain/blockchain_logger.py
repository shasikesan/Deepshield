import hashlib
import json
import os
import datetime

# Always save ledger relative to the project root (two levels up from this file)
_PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LEDGER_FILE = os.path.join(_PROJECT_ROOT, 'ledger.json')

def get_ledger():
    if not os.path.exists(LEDGER_FILE):
        return []
    with open(LEDGER_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_ledger(ledger):
    with open(LEDGER_FILE, 'w') as f:
        json.dump(ledger, f, indent=4)

def log_to_ledger(filename, result_label, confidence_score):
    ledger = get_ledger()
    
    # Get previous hash
    prev_hash = "0" * 64
    if len(ledger) > 0:
        prev_hash = ledger[-1].get("hash", prev_hash)
        
    block_data = {
        "timestamp": datetime.datetime.now().isoformat(),
        "filename": filename,
        "result": result_label,
        "confidence": confidence_score,
        "previous_hash": prev_hash
    }
    
    # Hash this block's data
    block_string = json.dumps(block_data, sort_keys=True).encode()
    block_hash = hashlib.sha256(block_string).hexdigest()
    
    block_data["hash"] = block_hash
    
    ledger.append(block_data)
    save_ledger(ledger)
    
    return block_hash

