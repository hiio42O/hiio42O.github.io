import subprocess
import os
print(f'cd {os.path.abspath(os.path.dirname(__file__))}')
d = subprocess.check_output(f'cd {os.path.abspath(os.path.dirname(__file__))} && git checkout test && git add * && git commit -m "Update" && git push origin test && git checkout main',shell=True)
print(d)
