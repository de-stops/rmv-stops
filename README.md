# rmv-stops

This is a simple script to download all RMV stops as CSV.

The script uses the following endpoint:

```
https://www.rmv.de/auskunft/bin/jp/query.exe/3deuny?performLocating=2&tpl=stop2json&look_stopclass=2147483647&look_minx=5000000&look_miny=47000000&look_maxx=15000000&look_maxy=56000000
```

It starts from bounding box `(5000000, 47000000, 15000000, 56000000)` and works down to smaller quadrants until the query produces less than 500 stops.

The script produces CSV output in the following format:

```
"extId","planId","puic","prodclass","name","urlname","x","y"
3004301,1484932330,80,140,"Friedrichsdorf-Seulberg Bahnhof","Friedrichsdorf-Seulberg%20Bahnhof",8.646346,50.241592
```

# Usage

```
npm install
node index.js
```

# Disclaimer

Usage of this script may or may not be legal, use on your own risk.  
This repository provides only source code, no data.

# License

Source code is licensed under [BSD 2-clause license](LICENSE). No license and no guarantees implied on the produced data, produce and use on your own risk.