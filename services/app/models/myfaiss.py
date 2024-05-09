import glob
import numpy as np
import re
import os
import json
import faiss
from collections import defaultdict

DATABASE_PATH = '../../fashion-dataset'
JSON_PATH = './features/image_id.json'