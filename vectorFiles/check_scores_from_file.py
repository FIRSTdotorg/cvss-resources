# Simple script to query the API with a set of vectors from a file on disk and save the output to another file

import json
import urllib.request

# set the source and destination files
source_file = "macro-vectors"
destination_file = "macro-scores"

# edit your link to your instance of the API

host = "http://localhost:22177/cvss?q="

with open(source_file, 'r') as source, open(destination_file, 'w') as destination:
  # Loop through each line in the source file
  for line in source:
    # Read the line and remove any trailing newline character
    link = host + line
    link = link.rstrip('\n')
    #print(link)
    try:
      with urllib.request.urlopen(link) as url:
        data = json.load(url)
        myScore = str(data)
      destination.write(myScore + "\n")
    except:
      destination.write("Invalid vector string" + "\n")
      pass
