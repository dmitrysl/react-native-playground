# Build .manifest file

 find . -type f | sed "s#^\./##" | grep -vi "ds_store" | awk '{print "app/"$1}' >> ../cache.manifest