shp2pgsql -I -d -s 31467:4326 "data/vg-shape-files/VG250_KRS.shp" public.VG250_KRS | psql -q --username=postgres --dbname=VG
shp2pgsql -I -d -s 31467:4326  "data/vg-shape-files/VG250_GEM.shp" public.VG250_GEM | psql -q --username=postgres --dbname=VG