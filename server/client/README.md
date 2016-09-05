# Client side based on Angular2/Material design


# Setup
 $ npm install --global typescript gulp typings
 $ npm install
 $ gulp buildClient


# Build .manifest file

 find . -type f | sed "s#^\./##" | grep -vi "ds_store" | awk '{print "app/"$1}' >> ../cache.manifest